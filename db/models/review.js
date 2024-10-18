"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define("review", {
    id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field: "id",
    },
    user_id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      field: "user_id",
    },
    show_id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      field: "show_id",
    },
    venue_id: {
      type: Sequelize.UUIDV4,
      allowNull: true,
      field: "venue_id",
    },
    event_id: {
      type: Sequelize.UUIDV4,
      allowNull: true,
      field: "event_id",
    },
    type: {
      type: Sequelize.ENUM(
        'AUDIENCE',
        'CRITIC',
      ),
      allowNull: true,
      field: "type",
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "review",
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
    tableName: "review",
    underscored: true,
  });

  return review;
};