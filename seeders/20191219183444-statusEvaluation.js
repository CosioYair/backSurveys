'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StatusEvaluations', [{
      name: 'Sin comenzar',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Pendiente',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Finalizado',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StatusEvaluations', null, {});
  }
};
