'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerTitles', [{
      title: 'Siempre',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Casi siempre',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Algunas veces',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Casi nunca',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Nunca',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Si',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'No',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnswerTitles', null, {});
  }
};
