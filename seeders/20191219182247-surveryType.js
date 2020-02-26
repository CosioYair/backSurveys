'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SurveyTypes', [{
      model: 'SurveyCat',
      description: 'Cuestionario simple',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      model: 'SurveyQuest',
      description: 'Cuestionario de complejo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SurveyTypes', null, {});
  }
};
