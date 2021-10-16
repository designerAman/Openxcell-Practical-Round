const SomethingWentWrongError = require("./somethingWentWrong.error");
const ValidationError = require("./validation.error");
const AlreadyExistsError = require("./alreadyExist.error");
const NotFoundError = require("./not-found.error");
const AuthorizationError = require("./authorization.error");
const ForbiddenError = require("./forbidden.error");

module.exports = Object.freeze({
  SomethingWentWrongError,
  ValidationError,
  AlreadyExistsError,
  NotFoundError,
  AuthorizationError,
  ForbiddenError,
});
