import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getAccessToken } from "../utils/getAccessToken";
dotenv.config();

const register = async (req: any, res: any) => {
    const body = req.body;

    const { email, password } = body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            throw new Error("Tài khoản đã tồn tại.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        body.password = hashPassword;

        const newUser: any = new UserModel(body);
        await newUser.save();

        delete newUser._doc.password;

        res.status(201).json({
            message: "Register successfully.",
            data: {
                ...newUser._doc,
                token: await getAccessToken({
                    _id: newUser._id,
                    email: newUser.email as string,
                    rule: 1,
                }),
            },
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

const login = async (req: any, res: any) => {
    const body = req.body;

    const { email, password } = body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("Tài khoản không tồn tại.");
        }

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({
            message: "Login successfully.",
            data: {
                ...userObj,
                token: await getAccessToken({
                    _id: user._id,
                    email: user.email as string,
                    rule: user.rule ?? 1,
                }),
            },
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export { register, login };
