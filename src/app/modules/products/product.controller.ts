import { Request, Response } from "express";
import productValidatonSchema from "./product.validation";
import { ProductServices } from "./product.services";

const createProduct =async (req: Request, res: Response) => {
  try {
    // console.log(req.body); // ← this will log your product in the terminal
    const zodparser = productValidatonSchema.parse(req.body);
    const result = await ProductServices.createAProductIntoDB(zodparser);
    res.status(200).json({ 
        success: true,
        message: 'Product created successfully',
        data: result
     });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err
    });
  }
};

const getAllProducts = async (req:Request, res: Response) => {
    // const result = await ProductServices.getProductFromDB();
    const {searchTerm} = req.query;
    const result = await ProductServices.getProductFromDB(searchTerm as string);

    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result
    })
}

const getSingleProduct =async (req: Request, res: Response) => {
   try{
        const {productId} = req.params;
        const result =  await ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result
    })
   }catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err
    });
  }
}

const updateProduct = async (req: Request, res:Response) => {
    try{ 
        const {productId} = req.params;
        const data = req.body;
        const result = await ProductServices.updateProductIntoDB(productId,data);
        res.status(200).json({
        success: true,
        message: "Products updated successfully",
        data: result
    })
   }catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err
    });
  }
}


const deleteProduct = async  (req: Request, res:Response) => {
     try{ 
        const {productId} = req.params;
       await ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
        success: true,
        message: "Products deleted successfully",
        data: null
    })
   }catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err
    });
  }
}

export const ProductControllers ={
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}