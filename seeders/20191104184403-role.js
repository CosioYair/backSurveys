'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'Super administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Empresa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Empleado',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
