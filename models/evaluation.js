'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    companyOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    surveyCatOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    statusEvaluationId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    dueTime: DataTypes.DATE,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    completed: DataTypes.BOOLEAN,
    employeesNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async function (evaluation) {
        const Company = require('../models').Company;
        const company = await Company.findOne({ where: { Oid: evaluation.companyOid } });
        const employees = await company.getEmployees();
        if (employees.length > 0) {
          evaluation.employeesNumber = evaluation.employeesNumber <= employees.length ? evaluation.employeesNumber : employees.length;
        } else {
          throw new Error('No employees');
        }
      },
      afterCreate: async function (evaluation) {
        const surveyCatSections = await evaluation.saveCurrentSurveySections();
        await evaluation.setEvaluationSurveySectionParents(surveyCatSections);
        await evaluation.setRandomEmployees();
      }
    }
  });
  Evaluation.associate = function (models) {
    Evaluation.belongsToMany(models.Employee, { through: models.EmployeeEvaluation, foreignKey: 'evaluationOid', as: 'employees' });
    Evaluation.belongsToMany(models.SurveySection, { through: models.EvaluationSurveySection, foreignKey: 'evaluationOid', as: 'surveySections' });
    Evaluation.belongsTo(models.SurveyCat, { foreignKey: 'surveyCatOid', as: 'surveyCat' });
    Evaluation.belongsTo(models.StatusEvaluation, { foreignKey: 'statusEvaluationId', as: 'status' });
    Evaluation.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };
  Evaluation.prototype.getLayout = async function () {
    const surveySections = await this.getSurveySections();
    return Promise.all(
      surveySections.map(async surveySection => {
        const evaluationSurveySection = await surveySection.EvaluationSurveySection;
        const questions = await evaluationSurveySection.getFormatedQuestions();
        if(evaluationSurveySection.conditionalId) {
          const conditional = await evaluationSurveySection.getConditional();
          evaluationSurveySection.dataValues.conditional = conditional;
        }
        evaluationSurveySection.dataValues.questions = questions;
        evaluationSurveySection.dataValues.answerGroups = questions.answerGroups;
        delete questions.answerGroups;
        return surveySection;
      })
    );
  };
  Evaluation.prototype.saveCurrentSurveySections = async function () {
    const surveyCat = await this.getSurveyCat();
    const surveySections = await surveyCat.getSurveySections();
    return await Promise.all(surveySections.map(async surveySection => {
      const surveyCatSection = surveySection.SurveyCatSection;
      const surveyCatSectionValues = { ...surveyCatSection.dataValues };
      delete surveyCatSectionValues.Oid;
      await this.addSurveySection(surveySection.Oid, {
        through: {
          ...surveyCatSectionValues,
        }
      });
      return surveyCatSection;
    }));
  };
  Evaluation.prototype.setEvaluationSurveySectionParents = async function (newSurveyCatSections) {
    const currentSurveySections = await this.getSurveySections();
    return await Promise.all(
      newSurveyCatSections.map(async newSurveyCatSection => {
        const surveyCatSectionParentOid = newSurveyCatSection.surveyCatSectionParentOid;
        const surveySectionChild = currentSurveySections.find(surveySection => surveySection.Oid == newSurveyCatSection.surveySectionOid);
        if (surveyCatSectionParentOid) {
          const surveyCatSectionParent = newSurveyCatSections.find(surveySection => surveySection.Oid == surveyCatSectionParentOid);
          const surveySectionParent = currentSurveySections.find(surveySection => surveySection.Oid == surveyCatSectionParent.surveySectionOid);
          const evaluationSurveySectionParent = surveySectionParent.EvaluationSurveySection;
          const evaluationSurveySectionChild = surveySectionChild.EvaluationSurveySection;
          await evaluationSurveySectionChild.setEvaluationSurveySectionParent(evaluationSurveySectionParent.Oid);
          evaluationSurveySectionChild.evaluationSurveySectionParentOid = evaluationSurveySectionParent.Oid;
        }
        return surveySectionChild;
      })
    );
  };
  Evaluation.prototype.setRandomEmployees = async function () {
    const company = await this.getCompany();
    const employees = await company.getEmployees();
    const surveySections = await this.getSurveySections();
    let questions = [];
    await Promise.all(
      surveySections.map(async surveySection => {
        const evaluationSurveySection = surveySection.EvaluationSurveySection;
        const surveySectionQuestions = await evaluationSurveySection.getQuestions();
        questions = [...questions, ...surveySectionQuestions];
        return surveySectionQuestions;
      })
    );
    const indexes = await this.getRandomEmployeesSelection(this.employeesNumber, employees.length);
    return await Promise.all(
      indexes.map(async index => {
        return this.addEmployee(employees[index].Oid, {
          through: {
            companyOid: company.Oid,
            questionsNumber: questions.length
          }
        });
      })
    );
  };
  Evaluation.prototype.getRandomEmployeesSelection = async function (employeesNumber, totalEmployeesNumber) {
    const indexes = [];
    while (indexes.length !== employeesNumber) {
      const random = Math.floor(Math.random() * totalEmployeesNumber);
      const repeated = indexes.some(index => index === random);
      if (!repeated) {
        indexes.push(random);
      }
    }
    return indexes;
  };
  Evaluation.prototype.getPercentageFinished = async function () {
    const employees = await this.getEmployees();
    const total = employees.length;
    let finished = 0;
    employees.forEach(employee => {
      const employeeEvaluation = employee.EmployeeEvaluation;
      if (employeeEvaluation.statusEvaluationId === 3) {
        finished++;
      }
    });
    return (finished / total) * 100;
  };

  return Evaluation;
};