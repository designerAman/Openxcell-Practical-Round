module.exports = function makeVerifyUserAccessToken({
  chalk,
  accessTokenDb,
  AuthorizationError,
  handleError,
}) {
  return async function verifyUserAccessToken(req, res, next) {
    try {
      const token = req.headers.accesstoken;
      if (!token) {
        throw new AuthorizationError('Please provide a access token');
      }

      const userDetails = (await accessTokenDb.searchAccessTokenDetails({
        attributes: ['id', 'name', 'email', 'accessToken'],
        joins: {
          users: {
            type: 'INNER',
            on: 'accessTokens.userId = users.id',
          }
        },
        filterQuery: {
          accessToken: {
            values: [token],
          },
        },
      }))[0];

      if (!userDetails) {
        throw new AuthorizationError('Invalid access token');
      }

      req.userDetails = userDetails;
      return next();
    } catch (error) {
      console.log(chalk.red(`Error in verify access token of user`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}