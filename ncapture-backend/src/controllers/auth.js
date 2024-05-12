import EHttpStatusCode from "../enums/HttpStatusCode.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

const authController = {

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(EHttpStatusCode.NOT_FOUND)
          .json({ message: "User Not Found!" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ message: "Wrong Password, Enter Password Again" });
      }
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;

      const accessToken = jwt.sign(
        userWithoutPassword,
        process.env.SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );

      return res.status(EHttpStatusCode.SUCCESS).json({
        message: "User Successfully Logged In!",
        token: accessToken,
        user: userWithoutPassword,
      });


    } catch (error) {
      console.log(error);
      return res
        .status(EHttpStatusCode.INTERNAL_SERVER)
        .json({ message: "Internal Server Error!" });
    }
  },
};

export default authController;
