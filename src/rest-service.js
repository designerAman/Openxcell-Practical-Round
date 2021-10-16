module.exports = function makeApiRoutes({ app, controllers }) {

  initTestRoutes();
  initRegistrationAndProfileRoutes();

  function initTestRoutes() {
    app
      .route("/test")
      .get(controllers.testMessageAction);
  }

  function initRegistrationAndProfileRoutes() {
    app
      .route("/user/register")
      .post(
        controllers.registrationAndProfile.registerAction,
      );

    app
      .route("/user/login")
      .post(
        controllers.registrationAndProfile.loginAction,
      );
  }
};
