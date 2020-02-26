'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Evaluations', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'evaluationsIndex'
      },
      companyOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'Oid'
        }
      },
      surveyCatOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SurveyCats',
          key: 'Oid'
        }
      },
      statusEvaluationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StatusEvaluations',
          key: 'id'
        }
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      dueTime: {
        type: Sequelize.DATE
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      employeesNumber: {
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
    return queryInterface.dropTable('Evaluations');
  }
};