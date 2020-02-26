'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CivilStatuses', [{
      name: 'Casado',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Soltero',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Unión libre',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Divorciado',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Viudo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CivilStatuses', null, {});
  }
};
