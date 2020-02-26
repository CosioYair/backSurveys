'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StudyLevels', [{
      name: 'Primaria',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Secundaria',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Preparatoria',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Técnico superior',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Licenciatura',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Maestría',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Doctorado',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudyLevels', null, {});
  }
};
