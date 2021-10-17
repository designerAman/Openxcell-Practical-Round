module.exports = function makeGetTopics({
  Joi,
  topicDb,
  ValidationError,
}) {
  return async function getTopics({ from, to, userId }) {
    await validateInput({ from, to, userId });

    const topics = await topicDb.searchTopicDetails({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      filterQuery: {
        userId: {
          values: [userId]
        },
      },
      from,
      to,
    });

    return topics;
  }

  async function validateInput({ from, to }) {
    const schema = Joi.object({
      from: Joi.number().required(),
      to: Joi.number().required(),
    });

    const { error } = schema.validate({ from, to });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}