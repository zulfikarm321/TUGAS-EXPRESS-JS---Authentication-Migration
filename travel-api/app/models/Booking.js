'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.User, {
                foreignKey: 'id_user',
                as: 'user'
            });

            Booking.belongsTo(models.Tujuan, {
                foreignKey: 'id_tujuan',
                as: 'tujuan'
            });

            Booking.belongsTo(models.Jadwal, {
                foreignKey: 'id_jadwal',
                as: 'jadwal'
            });

            Booking.belongsTo(models.Kendaraan, {
                foreignKey: 'id_kendaraan',
                as: 'kendaraan'
            });
        }
    }
    Booking.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: true
            },
            id_user: DataTypes.STRING,
            id_tujuan: DataTypes.STRING,
            id_jadwal: DataTypes.STRING,
            id_kendaraan: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Booking'
        }
    );
    return Booking;
};
