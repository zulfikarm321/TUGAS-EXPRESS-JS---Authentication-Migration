'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.Customer, {
                foreignKey: 'customerId',
                onDelete: 'CASCADE'
            });

            Order.hasOne(models.Payment, {
                foreignKey: 'orderId'
            });
        }
    }
    Order.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            quantity: DataTypes.INTEGER,
            customerId: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM,
                values: ['pending', 'process', 'done'],
                defaultValue: 'pending'
            },
            orderDate: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'Order'
        }
    );

    Order.beforeCreate(async (order, options) => {
        console.log('Audit Log - order Created');
        try {
            await sequelize.models.AuditLogs.create({
                tableName: 'Orders',
                task: 'insert',
                description: `Proses Insert dengan data ${JSON.stringify(
                    order.toJSON()
                )}`
            });
        } catch (error) {
            console.log(error);
        }
    });

    Order.beforeUpdate(async (order, options) => {
        console.log('Audit Log - order Updated');
        try {
            await sequelize.models.AuditLogs.create({
                tableName: 'Orders',
                task: 'update',
                description: `Proses Update dengan data ${JSON.stringify(
                    order.toJSON()
                )}`
            });
        } catch (error) {
            console.log(error);
        }
    });

    return Order;
};
