'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerType = sequelize.define('AnswerType', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  AnswerType.associate = function (models) {
    AnswerType.belongsToMany(models.AnswerValue, { through: models.AnswerGroup, foreignKey: 'answerTypeId', as: 'values' });
    AnswerType.belongsToMany(models.AnswerTitle, { through: models.AnswerGroup, foreignKey: 'answerTypeId', as: 'titles' });
    AnswerType.hasMany(models.Question, { foreignKey: 'answerTypeId', as: 'questions' });
  };
  AnswerType.prototype.getFormatedAnswerGroup = async function () {
    const AnswerValue = require('../models').AnswerValue;
    const answerTitles = await this.getTitles();
    if (this.id == 4) {
      return [{
        title: 'Pregunta abierta',
        value: null
      }];
    } else {
      return await Promise.all(
        answerTitles.map(async answerTitle => {
          const answerGroup = answerTitle.AnswerGroup;
          const answerValue = await AnswerValue.findOne({ where: { id: answerGroup.answerValueId } });
          const formatedAnswerGroup = {
            title: answerTitle.title,
            value: answerValue.value
          };
          return formatedAnswerGroup;
        })
      );
    }
  };
  return AnswerType;
};