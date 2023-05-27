'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Kendaraans', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },

            jenis: {
                type: Sequelize.STRING
            },
            merk: {
                type: Sequelize.STRING
            },
            harga: {
                type: Sequelize.INTEGER
            },
            kapasitas: {
                type: Sequelize.INTEGER
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Kendaraans');
    }
};
