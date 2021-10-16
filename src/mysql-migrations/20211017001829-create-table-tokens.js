const Sequelize = require("sequelize");

module.exports = {
  up: async (query) => {
    await query.createTable("accessTokens",
      {
        accessToken: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
    );
  },
  down: async (query) => {
    await query.dropTable("accessTokens");
  },
};