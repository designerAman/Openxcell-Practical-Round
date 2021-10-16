module.exports = function makeCreateTopic({
  Joi,
  momentTZ,
  topicDb,
  ValidationError,
  AlreadyExistsError,
}) {
  return async function createTopic({ userId, name }) {
    await validateInput({ userId, name });

    const topicDetails = (await topicDb.searchTopicDetails({
      attributes: ['id'],
      filterQuery: {
        name: {
          values: [name]
        },
      },
    }))[0];

    if (topicDetails) {
      throw new AlreadyExistsError('Topic with this same name is already exists');
    }

    await topicDb.addTopic({
      topicDetails: {
        userId,
        name,
        createdAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
      },
    });

    return {
      message: 'Topic Created Successfully'
    }
  }

  async function validateInput({ userId, name }) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      name: Joi.string().required(),
    });

    const { error } = schema.validate({ userId, name });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}