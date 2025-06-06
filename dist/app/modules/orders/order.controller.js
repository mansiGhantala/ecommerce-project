"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const product_model_1 = require("../products/product.model");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodValidation = order_validation_1.default.safeParse(req.body);
        if (!zodValidation.success) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: zodValidation.error.issues,
            });
            return;
        }
        const product = yield product_model_1.Product.findById(zodValidation.data.productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        if (product.inventory.quantity < zodValidation.data.quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
            return;
        }
        product.inventory.quantity -= zodValidation.data.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        const newOrder = yield order_services_1.OrderServices.createANewOrder(zodValidation.data);
        yield product.save();
        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            data: newOrder,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const handleGetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const orders = yield order_services_1.OrderServices.getAllOrdersFromDB(email);
        if (orders.length === 0) {
            res.status(200).json({
                success: true,
                message: 'No Orders found for this email',
                data: [],
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.OrderController = {
    createOrder,
    handleGetAllOrders,
};
// import { Request, Response } from "express";
// import orderValidationSchema from "./order.validation";
// import { Product } from "../products/product.model";
// import { OrderServices } from "./order.services";
// const createOrder = async (req: Request, res: Response):Promise<void>  => {
//   try {
//     const zodValidation = orderValidationSchema.safeParse(req.body);
//     if (!zodValidation.success) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation error",
//         errors: zodValidation.error.issues,
//       });
//     }
//     const product = await Product.findById(zodValidation.data.productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }
//     if (product.inventory.quantity < zodValidation.data.quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "Insufficient quantity available in inventory",
//       });
//     }
//     product.inventory.quantity -= zodValidation.data.quantity;
//     product.inventory.inStock = product.inventory.quantity > 0;
//     const newOrder = await OrderServices.createANewOrder(zodValidation.data);
//     await product.save();
//     return res.status(200).json({
//       success: true,
//       message: "Order placed successfully",
//       data: newOrder,
//     });
//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Something went wrong",
//       error: err,
//     });
//   }
// };
// const handleGetAllOrders = async (req: Request, res: Response) => {
//  const email = req.query.email;
//  try{
//     const orders = await OrderServices.getAllOrdersFromDB(email as string | undefined);
// if(orders.length === 0){
//     return res.status(200).json({
//         success : true,
//         message: "No Orders found for this email",
//         data: []
//     })
// }
//   return res.status(200).json({
//       success: true,
//       message: "Orders fetched successfully",
//       data: orders,
//     })
//  }catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Something went wrong",
//       error: err,
//     });
//   }
// }
// export const OrderController = {
//   createOrder, // ✅ renamed from makeOrder
//   handleGetAllOrders
// };
