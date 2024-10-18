"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define("tag", {
    id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field: "id",
    },
    entity_type: {
      type: Sequelize.ENUM(
        'USER',
        'PRODUCTION_COMPANY',
        'PRODUCTION_COMPANY_USER',
        'VENUE',
        'SHOW',
        'EVENT',
        'REVIEW',
        'WATCHLIST',
      ),
        allowNull: false,
        field: "entity_type",
    },
    entity_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        field: "entity_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "create_time",
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "update_time",
    },
    created_by: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      field: "created_by",
    },
    updated_by: {
      type: Sequelize.UUIDV4,
      allowNull: true,
      field: "updated_by",
    },
    is_deleted: {
      type: Sequelize.CHAR(1),
      allowNull: false,
      field: 'is_deleted'
    },
  }, {
    freezeTableName: true,
    tableName: "tag",
    underscored: true,
  });

  return tag;
};