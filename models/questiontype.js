'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionType = sequelize.define('QuestionType', {
    Id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {});
  QuestionType.associate = function (models) {
    QuestionType.hasMany(models.AnswerEmployee, { foreignKey: 'questionTypeId', as: 'answers' });
  };
  return QuestionType;
};