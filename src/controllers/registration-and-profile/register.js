module.exports = function makeRegisterAction({
  chalk,
  register,
  handleError,
}) {
  return async function registerAction(req, res) {
    const { name, email, password } = req.body;

    try {
      const registeredData = await register({ name, email, password });

      return res.json({
        status: 'success',
        data: registeredData,
      });
    } catch (error) {
      console.log(chalk.red(`Error in register user with details: ${JSON.stringify(req.body)}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  };
}
