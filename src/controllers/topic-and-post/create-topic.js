module.exports = function makeCreateTopicAction({
  chalk,
  createTopic,
  handleError,
}) {
  return async function createTopicAction(req, res) {
    const userId = req.userDetails.id;
    const name = req.body.name;

    try {
      const createdTopicData = await createTopic({ userId, name });

      return res.json({
        status: 'success',
        data: createdTopicData,
      });
    } catch (error) {
      console.log(chalk.red(`Error in create topic by user of id: ${userId}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}