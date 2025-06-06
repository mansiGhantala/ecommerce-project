"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const createProduct = (req, res) => {
    try {
        console.log(req.body);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        });
    }
};
exports.ProductControllers = {
    createProduct,
};
