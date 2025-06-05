import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    photo_url: String,
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    rule: {
        type: Number,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
