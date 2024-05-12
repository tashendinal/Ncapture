import EHttpStatusCode from "../enums/HttpStatusCode.js";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";

const userController = {
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, password, role } = req.body;

            const existingUser = await userModel.findOne({email});

            if (existingUser) {
                return res
                    .status(EHttpStatusCode.BAD_REQUEST)
                    .json({ message: "This Email is already Registered" });
            }

            const newUser = await userModel.create({ firstName, lastName, email, phoneNumber, password: bcrypt.hashSync(password, 12), role, });
            return res.status(EHttpStatusCode.CREATED).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error creating user" });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "User not found" });
            }
            return res.status(EHttpStatusCode.SUCCESS).json({ user });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error fetching user" });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const { role } = req.query;
            const query = role ? { role } : {};
        
            const users = await userModel.find(query);
        
            return res.status(EHttpStatusCode.SUCCESS).json({ users });
          } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: 'Error fetching users' });
          }
    },

    updateUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = req.body;
            const user = await userModel.findByIdAndUpdate(userId, updatedUser, { new: true });
            if (!user) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "User not found" });
            }
            return res.status(EHttpStatusCode.SUCCESS).json({ message: "User updated successfully", user });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error updating user" });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findByIdAndDelete(userId);
            if (!user) {
                return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "User not found" });
            }
            return res.status(EHttpStatusCode.SUCCESS).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error deleting user" });
        }
    }
};

export default userController;
