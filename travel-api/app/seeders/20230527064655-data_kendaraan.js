'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'Kendaraans',
            [
                {
                    id: 'BUS01',
                    jenis: 'BUS',
                    merk: 'MITSUBISHI',
                    harga: 100000,
                    kapasitas: 30,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'BUS02',
                    jenis: 'BUS',
                    merk: 'MERCEDES',
                    harga: 150000,
                    kapasitas: 40,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'BUS03',
                    jenis: 'BUS',
                    merk: 'TOYOTA',
                    harga: 100000,
                    kapasitas: 30,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
