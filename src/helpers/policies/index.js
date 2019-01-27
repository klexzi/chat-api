import handleErrors from "../handle-errors";

const errorMessage = "not authorized to access";
const authorize = req => {
  if (!req.isAuthenticated) {
    handleErrors(errorMessage, 401);
  }
};

const authorizeNotVerified = req => {
  if (!req.isAuthenticated || req.User._doc.isVerified === true) {
    handleErrors(errorMessage, 403);
  }
};

export { authorize, authorizeNotVerified };
