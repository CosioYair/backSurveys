'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeEvaluationAnswers', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'employeeEvaluationAnswersIndex'
      },
      employeeEvaluationOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'EmployeeEvaluations',
          key: 'Oid'
        },
        onDelete: 'cascade'
      },
      evaluationSurveySectionQuestionOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'EvaluationSurveySectionQuestions',
          key: 'Oid'
        },
      },
      value: {
        type: Sequelize.INTEGER
      },
      openQuestion: {
        type: Sequelize.BOOLEAN
      },
      openValue: {
        type: Sequelize.STRING
      },
      notApplicable: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeEvaluationAnswers');
  }
};