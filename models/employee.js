'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userOid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    civilStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studyLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: DataTypes.STRING,
    positionTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contractTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workingDayTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rotation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    positionStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Employee.associate = function (models) {
    Employee.belongsTo(models.User, { foreignKey: 'userOid', onDelete: 'cascade', hooks: true, as: 'user' });
    Employee.belongsTo(models.Gender, { foreignKey: 'genderId', as: 'gender' });
    Employee.belongsTo(models.CivilStatus, { foreignKey: 'civilStatusId', as: 'civilStatus' });
    Employee.belongsTo(models.StudyLevel, { foreignKey: 'studyLevelId', as: 'studyLevel' });
    Employee.belongsTo(models.PositionType, { foreignKey: 'positionTypeId', as: 'positionType' });
    Employee.belongsTo(models.ContractType, { foreignKey: 'contractTypeId', as: 'contractType' });
    Employee.belongsTo(models.StaffType, { foreignKey: 'staffTypeId', as: 'staffType' });
    Employee.belongsTo(models.WorkingDayType, { foreignKey: 'workingDayTypeId', as: 'workingDayType' });
    Employee.belongsToMany(models.Evaluation, { through: models.EmployeeEvaluation, foreignKey: 'employeeOid', as: 'evaluations' });
  };
  Employee.prototype.getEvaluationAnswers = async function (evaluationOid) {
    const evaluation = (await this.getEvaluations({ through: { evaluationOid } }))[0];
    if (!evaluation) {
      throw new Error('Evaluation not found');
    } else {
      const employeeEvaluation = evaluation.EmployeeEvaluation;
      return await employeeEvaluation.getEvaluationSurveySectionQuestions();
    }
  };
  Employee.prototype.updateEvaluationAnswers = async function (evaluationOid, evaluationAnswers) {
    const evaluation = (await this.getEvaluations({ through: { evaluationOid } }))[0];
    if (!evaluation) {
      throw new Error('Evaluation not found');
    } else {
      const employeeEvaluation = evaluation.EmployeeEvaluation;
      await Promise.all(
        evaluationAnswers.map(evaluationAnswer => {
          return employeeEvaluation.addEvaluationSurveySectionQuestions(evaluationAnswer.evaluationSurveySectionQuestionOid,
            {
              through: {
                ...evaluationAnswer
              }
            });
        })
      );
      return await this.getEvaluationAnswers(evaluationOid);
    }
  };
  return Employee;
};