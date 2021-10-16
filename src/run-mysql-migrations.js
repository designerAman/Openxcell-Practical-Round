const Sequelize = require("sequelize");
const Umzug = require("umzug");
const path = require("path");

const config = require("./config/environments");

async function mysqlMigration() {
  const sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.password,
    {
      dialect: "mysql",
      host: config.mysql.host,
    }
  );

  sequelize.authenticate()
    .then(() => {
      const umzug = new Umzug({
        migrations: {
          path: path.join(__dirname, "./mysql-migrations"),
          params: [sequelize.getQueryInterface()],
        },
        storage: "sequelize",
        storageOptions: {
          sequelize: sequelize,
        },
      });

      umzug.up()
        .then(() => {
          console.log("All migration run successfully");
          process.exit();
        });
    })
    .catch(err => {
      console.log("Migrations failed");
      console.log({err});
      process.exit();
    })
}

mysqlMigration();