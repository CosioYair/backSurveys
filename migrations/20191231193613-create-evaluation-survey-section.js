'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EvaluationSurveySections', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'evaluationSurveySectionsIndex'
      },
      evaluationOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Evaluations',
          key: 'Oid'
        },
        onDelete: 'cascade'
      },
      surveySectionOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SurveySections',
          key: 'Oid'
        }
      },
      evaluationSurveySectionParentOid: {
        type: Sequelize.UUID,
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'EvaluationSurveySections',
          key: 'Oid'
        },
        onDelete: 'cascade'
      },
      conditionalId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Conditionals',
          key: 'id'
        }
      },
      conditionalValue: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('EvaluationSurveySections');
  }
};