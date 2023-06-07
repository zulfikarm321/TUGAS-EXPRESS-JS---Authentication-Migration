'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tujuan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tujuan.hasMany(models.Booking, {
                foreignKey: 'id_tujuan',
                as: 'bookings'
            });
        }
    }
    Tujuan.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            nama_tujuan: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Tujuan'
        }
    );
    return Tujuan;
};
