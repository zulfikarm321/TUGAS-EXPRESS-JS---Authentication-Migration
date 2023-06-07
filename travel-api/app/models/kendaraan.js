'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Kendaraan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Kendaraan.hasMany(models.Booking, {
                foreignKey: 'id_kendaraan',
                as: 'bookings'
            });
        }
    }
    Kendaraan.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            jenis: DataTypes.STRING,
            merk: DataTypes.STRING,
            harga: DataTypes.STRING,
            kapasitas: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Kendaraan'
        }
    );
    return Kendaraan;
};
