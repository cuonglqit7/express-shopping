import { Router } from "express";
import { getProducts } from "../controllers/product";

const route = Router();

route.get("/products", getProducts);

export default route;
