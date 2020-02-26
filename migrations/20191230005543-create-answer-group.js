'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AnswerGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: 'answerGroupsIndex'
      },
      answerTitleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AnswerTitles',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      answerValueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AnswerValues',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      answerTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AnswerTypes',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AnswerGroups');
  }
};