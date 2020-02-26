'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerTypes', [{
      title: 'De 0 a 4',
      code: '04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'De 4 a 0',
      code: '40',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Verdaro/Falso',
      code: 'TF',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Abierta',
      code: 'OP',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnswerTypes', null, {});
  }
};
