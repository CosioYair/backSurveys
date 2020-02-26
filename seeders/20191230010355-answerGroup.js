'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerGroups', [{
      answerTypeId: 1,
      answerTitleId: 1,
      answerValueId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 1,
      answerTitleId: 2,
      answerValueId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 1,
      answerTitleId: 3,
      answerValueId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 1,
      answerTitleId: 4,
      answerValueId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 1,
      answerTitleId: 5,
      answerValueId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 2,
      answerTitleId: 1,
      answerValueId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 2,
      answerTitleId: 2,
      answerValueId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 2,
      answerTitleId: 3,
      answerValueId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 2,
      answerTitleId: 4,
      answerValueId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 2,
      answerTitleId: 5,
      answerValueId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 3,
      answerTitleId: 6,
      answerValueId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      answerTypeId: 3,
      answerTitleId: 7,
      answerValueId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnswerGroups', null, {});
  }
};
