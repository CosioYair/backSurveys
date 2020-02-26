'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionGroups', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'QuestionGroupsIndex'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      quantityMinimum: {
        type: Sequelize.INTEGER
      },
      recomendation: {
        type: Sequelize.STRING
      },
      parentOid: {
        type: Sequelize.UUID,
        references: {
          model: 'QuestionGroups',
          key: 'Oid'
        }
      },
      surveyOid: {
        type: Sequelize.UUID,
        references: {
          model: 'SurveyQuests',
          key: 'Oid'
        }
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
    return queryInterface.dropTable('QuestionGroups');
  }
};