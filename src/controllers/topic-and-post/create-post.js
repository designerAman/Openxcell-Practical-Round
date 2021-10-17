module.exports = function makeCreatePostAction({
  chalk,
  fs,
  createPost,
  handleError,
}) {
  return async function createPostAction(req, res,) {
    const topicId = req.params.id;
    const body = req.body.body;
    const userId = req.userDetails.id;
    const postImages = req.files && req.files.postImages ? req.files.postImages : [];

    try {
      const createdPostData = await createPost({ userId, topicId, body, postImages });

      return res.json({
        status: 'success',
        data: createdPostData,
      });
    } catch (error) {
      console.log(chalk.red(`Error in create post inside topic of id: ${topicId} by user of id: ${userId}`, error.message));
      console.log({ error });

      postImages.forEach(postImage => {
        fs.unlinkSync(`${postImage.path}`);
      });

      return handleError({ error, res });
    }
  }
}