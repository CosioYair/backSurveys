'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveyCat = sequelize.define('SurveyCat', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    companyOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {});
  SurveyCat.associate = function (models) {
    SurveyCat.belongsToMany(models.SurveySection, { through: models.SurveyCatSection, foreignKey: 'surveyCatOid', as: 'surveySections' });
    SurveyCat.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };

  SurveyCat.prototype.updateSurveySections = async function (surveySections) {
    const currentSurveySections = await this.getSurveySections();
    await sequelize.transaction(async transaction => {
      await Promise.all(
        surveySections.map((surveySection, index) => {
          const surveySectionIndexToDelete = currentSurveySections.findIndex(currentSurveySection => currentSurveySection.Oid == surveySection.surveySectionOid);
          if (surveySectionIndexToDelete >= 0) {
            currentSurveySections.splice(surveySectionIndexToDelete, 1);
          }
          return this.addSurveySection(surveySection.surveySectionOid, {
            transaction,
            returning: true,
            through: {
              ...surveySection,
              order: index + 1
            }
          });
        })
      )
      await this.removeSurveySection(currentSurveySections);
    });
    return await this.setSurveyCatSectionParents(surveySections)
  };

  SurveyCat.prototype.setSurveyCatSectionParents = async function (newSurveySections, transaction) {
    const currentSurveySections = await this.getSurveySections();
    return await Promise.all(
      newSurveySections.map(async newSurveySection => {
        const surveySectionParentOid = newSurveySection.surveySectionParentOid;
        const surveySectionChild = currentSurveySections.find(surveySection => surveySection.Oid == newSurveySection.surveySectionOid);
        if (surveySectionParentOid) {
          const surveySectionParent = currentSurveySections.find(surveySection => surveySection.Oid == surveySectionParentOid);
          const surveyCatSectionParent = surveySectionParent.SurveyCatSection;
          const surveyCatSectionChild = surveySectionChild.SurveyCatSection;
          await surveyCatSectionChild.setSurveyCatSectionParent(surveyCatSectionParent.Oid, { transaction });
          surveyCatSectionChild.surveyCatSectionParentOid = surveyCatSectionParent.Oid;
        }
        return surveySectionChild;
      })
    );
  };

  SurveyCat.prototype.removeSurveySections = async function (surveySections) {
    return await Promise.all(
      surveySections.map(surveySection => {
        return this.removeSurveySection(surveySection.Oid);
      })
    );
  };
  return SurveyCat;
};