const Sequelize = require("sequelize");

module.exports = {
  up: async (query) => {
    await query.createTable("comments",
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
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: "posts",
            key: "id",
          },
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: false,
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
    await query.dropTable("comments");
  },
};