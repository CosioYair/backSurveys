'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Conditionals', [{
      title: 'Mayor que',
      symbol: '>',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Mayor o igual que',
      symbol: '>=',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Menor que',
      symbol: '<',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Menor o igual que',
      symbol: '<=',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Igual que',
      symbol: '==',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Diferente de',
      symbol: '!=',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conditionals', null, {});
  }
};
