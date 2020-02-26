'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeEvaluations', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'employeeEvaluationsIndex'
      },
      companyOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'Oid'
        },
        onDelete: 'cascade'
      },
      employeeOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'Oid'
        },
        onDelete: 'cascade'
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
      active: {
        type: Sequelize.BOOLEAN
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      questionsNumber: {
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
    return queryInterface.dropTable('EmployeeEvaluations');
  }
};