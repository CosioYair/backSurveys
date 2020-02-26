'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WorkingDayTypes', [{
      name: 'Diurna',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Nocturna',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mixto',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WorkingDayTypes', null, {});
  }
};
