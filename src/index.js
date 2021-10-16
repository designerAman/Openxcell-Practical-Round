const express = require("express");
const cors = require("cors");

const controllers = require("./controllers");
const middleware = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const makeApiRoutes = require("./rest-service");
makeApiRoutes({
  app,
  controllers,
  middleware,
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});