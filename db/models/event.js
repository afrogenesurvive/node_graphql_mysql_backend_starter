"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define("event", {
    id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "start_date",
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "end_date",
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
    tableName: "event",
    underscored: true,
  });

  return event;
};