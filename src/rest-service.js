module.exports = function makeApiRoutes({ app, controllers }) {

  initTestRoutes();

  function initTestRoutes() {
    app
      .route("/test")
      .get(controllers.testMessageAction);
  }
};
