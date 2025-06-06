import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { Product } from '../products/product.model';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const zodValidation = orderValidationSchema.safeParse(req.body);

    if (!zodValidation.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: zodValidation.error.issues,
      });
      return;
    }

    const product = await Product.findById(zodValidation.data.productId);
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

    const newOrder = await OrderServices.createANewOrder(zodValidation.data);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      data: newOrder,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const handleGetAllOrders = async (req: Request, res: Response): Promise<void> => {
  const email = req.query.email as string | undefined;

  try {
    const orders = await OrderServices.getAllOrdersFromDB(email);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderController = {
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
