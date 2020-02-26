'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerValues', [{
      value: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: '4',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnswerValues', null, {});
  }
};
