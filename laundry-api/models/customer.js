'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasMany(models.Order, {
                foreignKey: 'customerId'
            });
        }
    }
    Customer.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
            },
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.TEXT
        },
        {
            sequelize,
            modelName: 'Customer'
        }
    );

    Customer.beforeCreate(async (customer, options) => {
        console.log('Audit Log - customer Created');
        try {
            await sequelize.models.AuditLogs.create({
                tableName: 'Customers',
                task: 'insert',
                description: `Proses Insert dengan data ${JSON.stringify(
                    customer.toJSON()
                )}`
            });
        } catch (error) {
            console.log(error);
        }
    });

    Customer.beforeUpdate(async (customer, options) => {
        console.log('Audit Log - customer Updated');
        try {
            await sequelize.models.AuditLogs.create({
                tableName: 'Customers',
                task: 'update',
                description: `Proses Update dengan data ${JSON.stringify(
                    customer.toJSON()
                )}`
            });
        } catch (error) {
            console.log(error);
        }
    });

    return Customer;
};
