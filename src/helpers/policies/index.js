import handleErrors from "../handle-errors";

const errorMessage = "not authorized to access";
export const authorize = req => {
  if (!req.isAuthenticated) {
    handleErrors(errorMessage, 401);
  }
};

export const authorizeNotVerified = req => {
  if (!req.isAuthenticated || req.User._doc.isVerified === true) {
    handleErrors(errorMessage, 403);
  }
};

export const authorizeVerified = req => {
  if (!req.isAuthenticated || req.User._doc.isVerified !== true) {
    handleErrors(errorMessage, 403);
  }
};

export const authorizeAdmin = req => {
  if (
    !req.isAuthenticated ||
    req.User._doc.isVerified !== true ||
    req.User._doc.isAdmin !== true
  ) {
    handleErrors(errorMessage, 403);
  }
};
