import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
    const headers = req.headers.authorization;
    const token = headers ? headers.split(" ")[1] : "";

    try {
        if (!token) {
            throw new Error("Không có quyền truy cập!");
        }
        const verify: any = jwt.verify(token, process.env.SECRET_KEY as string);

        if (!verify) {
            throw new Error("Invalid token.");
        }

        req._id = verify._id;

        next();
    } catch (error: any) {
        res.status(401).json({
            error: error.message,
        });
    }
};
