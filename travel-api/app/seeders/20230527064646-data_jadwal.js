'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'Jadwals',
            [
                {
                    id: 'PAGI07',
                    waktu: '2023-05-18 07:00:00',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'PAGI09',
                    waktu: '2023-05-18 09:00:00',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'SIANG12',
                    waktu: '2023-05-18 12:00:00',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'SIANG14',
                    waktu: '2023-05-18 14:00:00',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'SORE16',
                    waktu: '2023-05-18 16:00:00',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'SORE18',
                    waktu: '2023-05-18 18:00:00',
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
