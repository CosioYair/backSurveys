'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Privileges', [{
        name: 'Panel de administrador',
        description: 'Acceso a panel de administrador',
        code: 'PA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Panel de empresa',
        description: 'Acceso a panel de empresa',
        code: 'PE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Vizualizar empleados',
        description: 'Acceso a visualizar lista de empleados',
        code: 'SE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Crear empleado',
        description: 'Acceso a creacion de empleado',
        code: 'CE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Modificar empleado',
        description: 'Acceso a modificacion de empleado',
        code: 'UE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Eliminar empleado',
        description: 'Acceso a baja de empleado',
        code: 'DE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Habilitar evaluacion',
        description: 'Habilitar nuevas evaluaciones',
        code: 'HE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Vizualizar suscripcion',
        description: 'Acceso a los datos de suscripcion',
        code: 'SS',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Panel de empleado',
        description: 'Acceso a panel de empleado',
        code: 'PEM',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Privileges', null, {});
  }
};
