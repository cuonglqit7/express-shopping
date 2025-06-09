import { formSupplier } from "../forms/supplierForm";
import SupplierModel from "../models/SupplierModel";

const getSuppliers = async (req: any, res: any) => {
    const { page, pageSize } = req.query;

    try {
        const skip = (page - 1) * pageSize;
        const items = await SupplierModel.find({ isDeleted: false })
            .skip(skip)
            .limit(pageSize);

        const total = await SupplierModel.countDocuments();

        res.status(200).json({
            message: "Suppliers",
            data: {
                items,
                total,
            },
        });
    } catch (error: any) {
        console.log(error);

        res.status(404).json({
            message: error.message,
        });
    }
};

const getExportData = async (req: any, res: any) => {
    const { start, end } = req.query;
    const body = req.body;

    const filter: any = {};

    if (start && end) {
        filter.createdAt = {
            $lte: end,
            $gte: start,
        };
    }
    try {
        const items = await SupplierModel.find(filter);

        const data: any = [];

        if (items.length > 0) {
            items.forEach((item: any) => {
                const values: any = {};

                body.forEach((key: any) => {
                    values[`${key}`] = `${item._doc[`${key}`] ?? ""}`;
                });

                data.push(values);
            });
        }
        res.status(200).json({
            message: "Suppliers",
            data: data,
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

const update = async (req: any, res: any) => {
    const body = req.body;
    const { id } = req.query;
    try {
        await SupplierModel.findByIdAndUpdate(id, body);

        res.status(200).json({
            message: "Supplier updated.",
            data: [],
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

const deleteSuplier = async (req: any, res: any) => {
    const { id } = req.query;
    try {
        await SupplierModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Supplier deleted.",
            data: [],
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

const getForm = async (req: any, res: any) => {
    try {
        const form = {
            title: "Suppliers",
            layout: "horizontal",
            labelCol: 8,
            wrapperCol: 16,
            size: "small",
            fileUpload: true,
            formItems: formSupplier,
        };

        res.status(200).json({
            message: "Get form supplier successfully.",
            data: form,
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export { getSuppliers, addNew, update, deleteSuplier, getForm, getExportData };
