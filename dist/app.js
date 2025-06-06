"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./app/modules/products/product.routes"); // ✅ Import your route
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/products', product_routes_1.ProductRoutes); // ✅ Connect the product routes here
// Health check route
app.get('/', (_req, res) => {
    res.send('✅ E-commerce API is running');
});
exports.default = app;
