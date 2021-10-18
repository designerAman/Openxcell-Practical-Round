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

    app
      .route("/topic/:id/post")
      .post(
        middleware.verifyUserAccessToken,
        middleware.uploadImages.fields([
          {
            name: 'postImages',
          }
        ]),
        controllers.topicAndPost.createPostAction,
      );

    app
      .route("/topics")
      .get(
        middleware.verifyUserAccessToken,
        controllers.topicAndPost.getTopicsAction,
      );

    app
      .route("/posts/:id/comment")
      .post(
        middleware.verifyUserAccessToken,
        controllers.topicAndPost.addCommentInPostAction,
      );

    app
      .route("/topics/:id/posts")
      .get(
        middleware.verifyUserAccessToken,
        controllers.topicAndPost.getPostsAction,
      );
  }
};
