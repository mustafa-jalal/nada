const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admins', [
      {
        name: 'Mohamed Salah',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('secret123', 10),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  },
};