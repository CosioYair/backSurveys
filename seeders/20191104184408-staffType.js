'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StaffTypes', [{
      name: 'Sindicalizado',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Confianza',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ninguno',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaffTypes', null, {});
  }
};
