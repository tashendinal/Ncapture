import mongoose from "mongoose";
import userModel from "../models/user.js";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_CONNECTION_URI;
        console.log(uri);
        await mongoose.connect(uri, {
            autoCreate: true,
            autoIndex: true
        });

        console.log("DB Connected Successfully");

        const count = await userModel.countDocuments();
        if (count === 0) {
            const defaultUser = new userModel({
                firstName: "Administrator",
                lastName: "",
                email: "admin@gmail.com",
                password: "$2b$12$pTTsNsxWUwYcQdO97pBFJuPhIMSA5X0HyXwIfTbZaBqmSjUPVdrRi",
                role: "administrator"
            });
            await defaultUser.save();
            console.log("Default user added successfully");
        }
    } catch (err) {
        console.log("Alas! DB Connection Error", err);
    }
};

export default connectDB;
