import mongoose, { Schema } from "mongoose";

const SupplierSchema = new Schema({
    photo_url: String,
    name: {
        type: String,
        require: true,
    },
    slug: String,
    product: {
        type: String,
    },
    categories: [String],
    price: Number,
    contact: String,
    isTasking: {
        type: Number,
        default: 0,
        enum: [0, 1],
    },
    email: String,
    active: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const SupplierModel = mongoose.model("suppliers", SupplierSchema);

export default SupplierModel;
