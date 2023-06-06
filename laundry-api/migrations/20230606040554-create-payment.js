'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Payments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            orderId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Orders',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT'
            },
            total_amount: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM,
                values: ['pending', 'paid'],
                defaultValue: 'paid'
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
        await queryInterface.dropTable('Payments');
    }
};
