'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Properties', 'latitude', {
        type: Sequelize.DECIMAL(8,6),
        allowNull: true,
    });

    await queryInterface.changeColumn('Properties', 'longitude', {
      type: Sequelize.DECIMAL(9,6),
      allowNull: true,
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Properties', 'latitude', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });

    await queryInterface.changeColumn('Properties', 'longitude', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });
  }
};
