module.exports = function makeApiRoutes({ app, controllers, middleware }) {

  initTestRoutes();
  initRegistrationAndProfileRoutes();
  initTopicAndPostRoutes();

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

  function initTopicAndPostRoutes() {
    app
      .route("/topic")
      .post(
        middleware.verifyUserAccessToken,
        controllers.topicAndPost.createTopicAction,
      );
  }
};
