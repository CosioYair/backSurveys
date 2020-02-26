'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerGroup = sequelize.define('AnswerGroup', {
    answerTitleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerValueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  AnswerGroup.associate = function(models) {
    // associations can be defined here
  };
  return AnswerGroup;
};