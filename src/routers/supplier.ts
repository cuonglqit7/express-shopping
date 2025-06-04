import { Router } from "express";
import {
    addNew,
    deleteSuplier,
    getSuppliers,
    update,
} from "../controllers/supplier";

const router = Router();

router.get("/", getSuppliers);
router.post("/", addNew);
router.put("/update", update);
router.delete("/remove", deleteSuplier);

export default router;
