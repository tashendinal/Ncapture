import EHttpStatusCode from "../enums/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const authMiddleware = (req, res, next) => {
  try {
    // Request processing pipeline
    let token = req.headers.authorization;

    if (!token || token === "undefined") {
      return res
        .status(EHttpStatusCode.UNAUTHORIZED)
        .json({ message: "Not Authorized!" });
    }

    token = token.split(" ")[1];

    let user = jwt.verify(token, process.env.SECRET_KEY, {});
    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    // Handle specific errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(EHttpStatusCode.UNAUTHORIZED)
        .json({ message: "Token expired!" });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(EHttpStatusCode.UNAUTHORIZED)
        .json({ message: "Invalid token!" });
    }

    // Handle other errors
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Internal Server Error!" });
  }
};

export default authMiddleware;