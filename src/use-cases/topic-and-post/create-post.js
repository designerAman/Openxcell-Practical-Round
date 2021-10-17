module.exports = function makeCreatePost({
  Joi,
  momentTZ,
  postDb,
  topicDb,
  ValidationError,
  NotFoundError,
}) {
  return async function createPost({ userId, topicId, body, postImages }) {
    await validateInput({ userId, topicId, body, postImages });

    const topicDetails = (await topicDb.searchTopicDetails({
      attributes: ['id'],
      filterQuery: {
        id: {
          values: [topicId]
        },
      },
    }))[0];

    if (!topicDetails) {
      throw new NotFoundError('Invalid topic id');
    }

    const postDetails = {
      userId,
      topicId,
      body,
      createdAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
    };

    postImages.forEach((postImage, i) => {
      postDetails[`image${i + 1}`] = postImage.filename;
    });

    await postDb.addPost({ postDetails });

    return {
      message: `Post added successfully`
    }
  }

  async function validateInput({ userId, topicId, body, postImages }) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      topicId: Joi.number().required(),
      body: Joi.string().required(),
      postImages: Joi.array().required(),
    });

    const { error } = schema.validate({ userId, topicId, body, postImages });
    if (error) {
      throw new ValidationError(error.message);
    }

    if (!postImages.length) {
      throw new ValidationError('Please select at least one Image to upload');
    }

    if (postImages.length > 4) {
      throw new ValidationError('You can only upload 4 images at a time');
    }
  }
}