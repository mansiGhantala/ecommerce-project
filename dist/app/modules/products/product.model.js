"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VariantSchema = new mongoose_1.Schema({
    type: String,
    value: String
});
const InventorySchema = new mongoose_1.Schema({
    quantity: Number,
    inStock: Boolean
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    category: String,
    tags: [String],
    variants: [VariantSchema],
    inventory: InventorySchema
});
const Product = (0, mongoose_1.model)("Product", ProductSchema);
