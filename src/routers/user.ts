import { Router } from "express";
import {
    login,
    loginWithGoogle,
    refreshToken,
    register,
} from "../controllers/user";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/login-google", loginWithGoogle);
route.get("/refresh-token", refreshToken);

export default route;
