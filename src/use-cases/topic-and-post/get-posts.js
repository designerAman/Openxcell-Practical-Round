module.exports = function makeGetPosts({
  Joi,
  topicDb,
  postDb,
  commentDb,
  ValidationError,
  NotFoundError,
}) {
  return async function getPosts({ from, to, topicId, userId }) {
    await validateInput({ from, to, topicId, userId });

    const topic = (await topicDb.searchTopicDetails({
      attributes: ['id', 'userId'],
      filterQuery: {
        id: {
          values: [topicId]
        },
        userId: {
          values: [userId]
        }
      },
      operator: 'AND',
      sortBy: `updatedAt DESC`
    }))[0];

    if (!topic) {
      throw new NotFoundError('Invalid topic Id');
    }

    let posts = await postDb.searchPostDetails({
      attributes: ['id', 'userId', 'topicId', 'body', 'image1', 'image2', 'image3', 'image4', 'createdAt', 'updatedAt'],
      filterQuery: {
        topicId: {
          values: [topicId]
        },
      },
      from,
      to,
    });

    if (posts.length) {
      const postIds = posts.map(post => post.id);

      let comments = await commentDb.searchCommentDetails({
        attributes: ['id', 'userId', 'postId', 'comment', 'createdAt', 'updatedAt'],
        filterQuery: {
          postId: {
            values: postIds,
          },
        },
        sortBy: `updatedAt DESC`
      });

      posts.map(post => {
        if (post.comment) {
          post.comments.push(...comments.filter(comment => +comment.postId === +post.id));
        } else {
          post.comments = [...comments.filter(comment => +comment.postId === +post.id)];
        }
      })
    }

    return posts;
  }

  async function validateInput({ from, to, topicId, userId, }) {
    const schema = Joi.object({
      from: Joi.number().required(),
      to: Joi.number().required(),
      topicId: Joi.number().required(),
      userId: Joi.number().required(),
    });

    const { error } = schema.validate({ from, to, topicId, userId });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}