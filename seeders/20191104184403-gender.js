'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genders', [{
      name: 'Masculino',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Femenino',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genders', null, {});
  }
};
