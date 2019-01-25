import logger from "../utils/logger";

const handleErrors = (err, errorCode) => {
  const error = new Error(err);
  error.handleError = true;
  error.code = errorCode;
    if (errorCode === 500) {
      logger.error(err);
    } else {
      logger.debug(error);
    }
  throw error;
   }
export { handleErrors as default };
