module.exports = function makeGetTopicsAction({
  chalk,
  getTopics,
  handleError,
}) {
  return async function getTopicsAction(req, res) {
    const userId = req.userDetails.id;
    const from = req.query.from | 0;
    const to = req.query.to | 10;

    try {
      const topics = await getTopics({ from, to, userId });

      return res.json({
        status: 'success',
        data: topics,
      });
    } catch (error) {
      console.log(chalk.red(`Error in get topics by user of id: ${userId}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}