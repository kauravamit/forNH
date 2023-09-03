'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Url extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    Url.init({
    

       id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        adress: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        adressId:{
            allowNull: true,
            type: DataTypes.STRING,
        },
        shortend: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        userId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        }
}, {
        sequelize,
        timestamps: true,
        createdAt: 'CreatedDate',
        updatedAt: 'UpdatedDate',
        modelName: 'Url',
        tableName: 'Url',
    });
    return Url;
};