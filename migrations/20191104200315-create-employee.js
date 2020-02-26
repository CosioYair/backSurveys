'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'employeesIndex'
      },
      userOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'Oid'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Genders',
          key: 'id'
        }
      },
      civilStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CivilStatuses',
          key: 'id'
        }
      },
      studyLevelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StudyLevels',
          key: 'id'
        }
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      positionTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PositionTypes',
          key: 'id'
        }
      },
      contractTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ContractTypes',
          key: 'id'
        }
      },
      staffTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StaffTypes',
          key: 'id'
        }
      },
      workingDayTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'WorkingDayTypes',
          key: 'id'
        }
      },
      rotation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      positionStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      experienceYears: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Employees');
  }
};