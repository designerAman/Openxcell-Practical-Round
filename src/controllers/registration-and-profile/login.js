module.exports = function makeLoginAction({
  chalk,
  login,
  handleError,
}) {
  return async function loginAction(req, res) {
    const { email, password } = req.body;

    try {
      const loginData = await login({ email, password });

      return res.json({
        status: 'success',
        data: loginData,
      });
    } catch (error) {
      console.log(chalk.red(`Error in login user with email: ${email}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  };
};
