import { z } from "zod";

// Schema for individual variant
export const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string()
});

// Schema for inventory
export const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean()
});

// Main product validation schema
const productValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema
});

export default productValidationSchema;
