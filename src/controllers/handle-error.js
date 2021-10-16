function handleError({ error, res }) {
  if (error.httpStatusCode) {
    return res.status(error.httpStatusCode).json({
      status: 'failure',
      error: {
        name: error.name,
        message: error.message,
      },
    })
  }

  if (error.response && error.response.status) {
    return res.status(error.response.status).json({
      status: 'failure',
      error: error.response.data.error,
    })
  }
  return res.status(500).json({
    status: "failure",
    error: {
      name: error.name,
      message: error.message,
    },
  });
}

module.exports = handleError;