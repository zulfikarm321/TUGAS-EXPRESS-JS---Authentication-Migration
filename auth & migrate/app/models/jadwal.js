'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Jadwal extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Jadwal.hasMany(models.Booking, {
                foreignKey: 'id_jadwal',
                as: 'bookings'
            });
        }
    }
    Jadwal.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            waktu: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'Jadwal'
        }
    );
    return Jadwal;
};
