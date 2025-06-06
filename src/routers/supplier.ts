import { Router } from "express";
import {
    addNew,
    deleteSuplier,
    getForm,
    getSuppliers,
    update,
} from "../controllers/supplier";

const router = Router();

router.get("/", getSuppliers);
router.post("/", addNew);
router.put("/update", update);
router.delete("/remove", deleteSuplier);
router.get("/get-form", getForm);

export default router;
