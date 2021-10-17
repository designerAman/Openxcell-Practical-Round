const Sequelize = require("sequelize");

module.exports = {
  up: async (query) => {
    await query.createTable("posts",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
        },
        topicId: {
          type: Sequelize.INTEGER,
          references: {
            model: "topics",
            key: "id",
          },
          allowNull: false,
        },
        body: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image2: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        image3: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        image4: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      },
    );
  },
  down: async (query) => {
    await query.dropTable("posts");
  },
};