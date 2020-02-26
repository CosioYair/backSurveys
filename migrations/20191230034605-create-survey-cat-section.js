'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SurveyCatSections', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'surveyCatSectionsIndex'
      },
      surveyCatOid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SurveyCats',
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
      surveyCatSectionParentOid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'SurveyCatSections',
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
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      order: {
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
    return queryInterface.dropTable('SurveyCatSections');
  }
};