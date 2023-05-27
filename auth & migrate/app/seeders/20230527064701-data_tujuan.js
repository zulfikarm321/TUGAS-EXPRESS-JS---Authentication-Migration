'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'Tujuans',
            [
                {
                    id: 'YGY',
                    nama_tujuan: 'Yogyakarata',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'MLG',
                    nama_tujuan: 'Malang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'BDG',
                    nama_tujuan: 'Bandung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'SKB',
                    nama_tujuan: 'Sukabumi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'CRB',
                    nama_tujuan: 'Cirebon',
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
