module.exports = function makeLogin({
  Joi,
  uuid,
  userDb,
  accessTokenDb,
  verifyHashedString,
  ValidationError,
  NotFoundError,
  AuthorizationError,
}) {
  return async function login({ email, password }) {
    await validateInput({ email, password });

    const userDetails = (await userDb.searchUserDetails({
      attributes: ['id','password', 'name', 'email'],
      filterQuery: {
        email: {
          values: [email]
        },
      },
    }))[0];

    if (!userDetails) {
      throw new NotFoundError('Invalid email');
    }

    const isCorrectedPassword = verifyHashedString({
      string: password,
      hash: userDetails.password,
    });

    if (!isCorrectedPassword) {
      throw new AuthorizationError('Incorrect password');
    }

    const accessToken = uuid.v4();

    await accessTokenDb.saveAccessToken({
      accessTokenDetails: {
        accessToken,
        userId: userDetails.id,
      }
    });

    delete userDetails.password;
    userDetails.accessToken = accessToken;

    return {
      message: "Successfully LoggedIn",
      data: userDetails,
    };
  }

  async function validateInput({ email, password }) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ email, password });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
}