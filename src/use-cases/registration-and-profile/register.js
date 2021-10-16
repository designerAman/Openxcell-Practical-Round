module.exports = function makeRegister({
  Joi,
  momentTZ,
  userDb,
  validatePassword,
  createStringHash,
  sendEmail,
  ValidationError,
  AlreadyExistsError,
}) {
  return async function register({ name, email, password }) {
    await validateInput({ name, email, password });

    const userDetails = (await userDb.searchUserDetails({
      attributes: ['id'],
      filterQuery: {
        email: {
          values: [email]
        },
      },
    }))[0];

    if (userDetails) {
      throw new AlreadyExistsError('User with this email is already registered');
    }

    password = await createStringHash({ string: password });

    await userDb.addUser({
      userDetails: {
        name,
        email,
        password,
        createdAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
      },
    });

    sendEmail({
      email,
      subject: 'Account Created',
      html: `<p>Congratulations Your account is successfully created in Test App.</p>`,
    });

    return {
      message: 'Account created successfully'
    };
  }

  async function validateInput({ name, email, password }) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ name, email, password });

    if (error) {
      throw new ValidationError(error.message);
    }

    const checkPassword = validatePassword({ password });

    if (!checkPassword.isValidPassword) {
      throw new ValidationError(checkPassword.message);
    }
  }
}