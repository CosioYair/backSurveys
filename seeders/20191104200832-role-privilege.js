'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RolePrivileges', [{
        roleId: 1,
        privilegeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 2,
        privilegeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 3,
        privilegeId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        roleId: 4,
        privilegeId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RolePrivileges', null, {});
  }
};
