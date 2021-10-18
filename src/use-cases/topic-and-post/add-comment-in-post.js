module.exports = function makeAddCommentInPost({
  Joi,
  momentTZ,
  postDb,
  commentDb,
  ValidationError,
  NotFoundError,
}) {
  return async function addCommentInPost({ userId, postId, comment }) {
    await validateInput({ userId, postId, comment });

    const postDetails = (await postDb.searchPostDetails({
      attributes: ['id'],
      filterQuery: {
        id: {
          values: [postId]
        },
      },
    }))[0];

    if (!postDetails) {
      throw new NotFoundError('Invalid post Id');
    }

    await commentDb.addComment({
      commentDetails: {
        userId,
        postId,
        comment,
        createdAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
      }
    });

    return {
      message: 'Comment added successfully'
    }
  }

  async function validateInput({ userId, postId, comment }) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
      comment: Joi.string().required(),
    });

    const { error } = schema.validate({ userId, postId, comment });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}