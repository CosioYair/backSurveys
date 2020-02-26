'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AnswerEmployees', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'AnswerEmployeeIndex'
      },
      evaluationId: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Evaluations',
          key: 'Oid'
        }
      },
      questionId: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Questions',
          key: 'Oid'
        }
      },
      questionTypeId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'QuestionTypes',
          key: 'Id'
        }
      },
      answerValue: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('AnswerEmployees');
  }
};