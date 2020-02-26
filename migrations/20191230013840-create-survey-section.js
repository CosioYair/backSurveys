'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SurveySections', {
      Oid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        unique: 'surveySectionsIndex'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      companyOid: {
        type: Sequelize.UUID,
        references: {
          model: 'Companies',
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
    return queryInterface.dropTable('SurveySections');
  }
};