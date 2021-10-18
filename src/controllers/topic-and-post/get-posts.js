module.exports = function makeGetPostsAction({
  chalk,
  getPosts,
  handleError,
}) {
  return async function getPostsAction(req, res) {
    const topicId = req.params.id;
    const userId = req.userDetails.id;
    const from = req.query.from | 0;
    const to = req.query.to | 10;

    try {
      const posts = await getPosts({ from, to, topicId, userId });

      return res.json({
        status: 'success',
        data: posts,
      });
    } catch (error) {
      console.log(chalk.red(`Error in get posts of topic of id: ${topicId} by user of id: ${userId}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}