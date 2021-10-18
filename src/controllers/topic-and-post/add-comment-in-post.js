module.exports = function makeAddCommentInPostAction({
  chalk,
  addCommentInPost,
  handleError,
}) {
  return async function addCommentInPostAction(req, res) {
    const userId = req.userDetails.id;
    const comment = req.body.comment;
    const postId = req.params.id;

    try {
      const addedCommentInPostData = await addCommentInPost({ userId, postId, comment });

      return res.json({
        status: 'success',
        data: addedCommentInPostData,
      });
    } catch (error) {
      console.log(chalk.red(`Error in add comment in post of id: ${postId} by user of id: ${userId}`, error.message));
      console.log({ error });

      return handleError({ error, res });
    }
  }
}