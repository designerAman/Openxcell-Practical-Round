const Sequelize = require("sequelize");

module.exports = {
  up: async (query) => {
    await query.createTable("sample", {
      message: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    });
  },
  down: async (query) => {
    await query.dropTable("sample");
  },
};
