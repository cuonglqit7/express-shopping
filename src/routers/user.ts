import { Router } from "express";
import { register } from "../controllers/user";

const route = Router();

route.post("/register", register);

export default route;
