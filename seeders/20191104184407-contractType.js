'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ContractTypes', [{
      name: 'Por proyecto',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Indeterminado',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Temporal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Honorarios',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ContractTypes', null, {});
  }
};
