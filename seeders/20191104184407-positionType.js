'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PositionTypes', [{
      name: 'Operativo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Profesional',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Técnico',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Supervisor',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gerente',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PositionTypes', null, {});
  }
};
