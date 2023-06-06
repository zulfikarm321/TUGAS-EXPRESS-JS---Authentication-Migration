'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Payment.belongsTo(models.Order, {
                foreignKey: 'orderId',
                onDelete: 'CASCADE'
            });
        }
    }
    Payment.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            orderId: DataTypes.UUID,
            total_amount: DataTypes.INTEGER,
            status: {
                type: DataTypes.ENUM,
                values: ['pending', 'paid'],
                defaultValue: 'paid'
            }
        },
        {
            sequelize,
            modelName: 'Payment'
        }
    );

    Payment.beforeCreate(async (payment, options) => {
        console.log('Audit Log - order Created');
        try {
            await sequelize.models.AuditLogs.create({
                tableName: 'Payments',
                task: 'insert',
                description: `Proses Insert dengan data ${JSON.stringify(
                    payment.toJSON()
                )}`
            });
        } catch (error) {
            console.log(error);
        }
    });

    Payment.beforeUpdate(async (payment, options) => {
        console.log('Audit Log - order Updated');
        try {
            await sequelize.models.AuditLogs.create({
                tableName: 'Payments',
                task: 'update',
                description: `Proses Update dengan data ${JSON.stringify(
                    payment.toJSON()
                )}`
            });
        } catch (error) {
            console.log(error);
        }
    });

    return Payment;
};
