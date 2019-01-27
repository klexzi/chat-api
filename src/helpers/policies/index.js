import handleErrors from "../handle-errors";

const authorizeNotVerified = req => {
  if (!req.isAuthenticated || req.User._doc.isVerified === true) {
    handleErrors("not authorized to access", 403);
  }
};

export { authorizeNotVerified };
