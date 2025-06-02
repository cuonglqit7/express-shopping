import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getAccessToken } from "../utils/getAccessToken";
import { generateRandomTextByLength } from "../utils/generatorRandomText";
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

        const isMatchPassword = await bcrypt.compare(
            password,
            user.password as string
        );

        if (!isMatchPassword) {
            throw new Error(
                "Đăng nhập thất bại. Vui lòng kiểm tra email hoặc passwprd và thử lại!"
            );
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

const loginWithGoogle = async (req: any, res: any) => {
    const body = req.body;

    const { email, name } = body;

    try {
        const user: any = await UserModel.findOne({ email });

        if (user) {
            delete user._doc.password;

            res.status(200).json({
                message: "Login successfully.",
                data: {
                    ...user._doc,
                    token: await getAccessToken({
                        _id: user._id,
                        email: user.email as string,
                        rule: user.rule ?? 1,
                    }),
                },
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(
                generateRandomTextByLength(8),
                salt
            );

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
        }
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export { register, login, loginWithGoogle };
