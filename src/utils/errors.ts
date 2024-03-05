import { CustomErrorTypes, errorFactory } from "error-handler-module";

const unauthorizedError = errorFactory(CustomErrorTypes.UNAUTHORIZED);
const badRequestError = errorFactory(CustomErrorTypes.BAD_REQUEST);
const notFoundError = errorFactory(CustomErrorTypes.NOT_FOUND);

export {
  unauthorizedError,
  badRequestError,
  notFoundError,
};