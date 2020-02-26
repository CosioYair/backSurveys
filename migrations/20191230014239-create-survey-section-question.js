'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SurveySectionQuestions', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'surveySectionQuestionsIndex'
      },
      surveySectionOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SurveySections',
          key: 'Oid'
        },
        onDelete: 'cascade'
      },
      questionOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'Oid'
        },
      },
      categoryOid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'Oid'
        },  
      },
      domainOid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Domains',
          key: 'Oid'
        },
      },
      dimensionOid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Dimensions',
          key: 'Oid'
        },
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('SurveySectionQuestions');
  }
};