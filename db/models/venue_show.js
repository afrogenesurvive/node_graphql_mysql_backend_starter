"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const venue_show = sequelize.define("venue_show", {
    id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field: "id",
    },
    show_id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      field: "show_id",
    },
    venue_id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      field: "venue_id",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "date",
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
      field: "start_time",
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
      field: "end_time",
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "active",
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "create_time",
    },
    is_deleted: {
      type: Sequelize.CHAR(1),
      allowNull: false,
      field: 'is_deleted'
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "update_time",
    },
    created_by: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    updated_by: {
      type: Sequelize.UUIDV4,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: "venue_show",
    underscored: true,
  });

  return venue_show;
};