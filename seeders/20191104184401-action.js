'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Actions', [{
      name: 'Confirmacion de correo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Correo nuevo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Contraseña nueva',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Actions', null, {});
  }
};
