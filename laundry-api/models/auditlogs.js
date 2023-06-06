'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AuditLogs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    AuditLogs.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tableName: DataTypes.STRING,
            task: DataTypes.STRING,
            description: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'AuditLogs'
        }
    );
    return AuditLogs;
};
