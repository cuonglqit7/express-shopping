import SupplierModel from "../models/SupplierModel";

const getSuppliers = async (req: any, res: any) => {
    try {
        res.status(200).json({
            message: "Products",
            data: [],
        });
    } catch (error: any) {
        console.log(error);

        res.status(404).json({
            message: error.message,
        });
    }
};

const addNew = async (req: any, res: any) => {
    const body = req.body;
    try {
        const newSupplier = new SupplierModel(body);
        newSupplier.save();

        res.status(200).json({
            message: "Supplier add successfully.",
            data: newSupplier,
        });
    } catch (error: any) {
        console.log(error);

        res.status(404).json({
            message: error.message,
        });
    }
};

export { getSuppliers, addNew };
