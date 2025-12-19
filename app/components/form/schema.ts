// form/schema.ts
// Validation schema for the cart form using Zod
// - Ensures proper types and validation rules for each cart item

import { z } from "zod";
import { date } from "zod/v4";

// Cart schema
// - "cart" is an array of items
// - Each item has name, price, and quantity
export const cartSchema = z.object({
  cart: z.array(
    z.object({
      // Name is required and must be at least 1 character
      name: z.string().min(1, "Name required"),

      // Price is coerced to a number and must be >= 0
      price: z.coerce.number().min(0, "Price must be >= 0"),

      // Quantity is coerced to a number and must be >= 1
      quantity: z.coerce.number().min(1, "Quantity must be >= 1"),
    })
  ),
});

// Type inferred from Zod schema
// - Useful for TypeScript typing throughout the form
export type FormValues = z.infer<typeof cartSchema>;
