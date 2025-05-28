import sequelize from "../database/config.js";
import { DataTypes } from "sequelize";
import Events from "./Events.js";
import Posts from "./Posts.js";

const Images = sequelize.define(
  "images_model", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    original_filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.ENUM("event", "post"),
      defaultValue: 'event',
    },
    // foreign keys
    events_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Events,
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Posts,
        key: "id",
      },
    },
  },
  {
    tableName: "images",
    timestamps: true,
  }
);

export default Images;
