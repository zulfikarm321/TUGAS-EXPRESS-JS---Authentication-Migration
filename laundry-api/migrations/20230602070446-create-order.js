'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            customerId: {
                type: Sequelize.STRING,
                references: {
                    model: 'Customers',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT'
            },
            quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            status: {
                type: Sequelize.ENUM,
                values: ['pending', 'process', 'done'],
                defaultValue: 'pending'
            },
            orderDate: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Orders');
    }
};
