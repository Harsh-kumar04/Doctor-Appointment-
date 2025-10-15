"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      { name: "Cardiology", createdAt: new Date(), updatedAt: new Date() },
      { name: "Neurology", createdAt: new Date(), updatedAt: new Date() },
      { name: "Dentist", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pediatrics", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
