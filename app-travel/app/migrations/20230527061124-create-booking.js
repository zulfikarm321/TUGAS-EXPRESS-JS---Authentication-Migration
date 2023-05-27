'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Bookings', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            id_user: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            id_tujuan: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Tujuans',
                    key: 'id'
                }
            },
            id_jadwal: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Jadwals',
                    key: 'id'
                }
            },
            id_kendaraan: {
                type: Sequelize.STRING,
                references: {
                    model: 'Kendaraans',
                    key: 'id'
                }
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
        await queryInterface.dropTable('Bookings');
    }
};
