'use client'

// Total.tsx
// Displays the total amount for all items in the cart
// Uses react-hook-form's useWatch to reactively compute total when inputs change

import { Control, useWatch } from "react-hook-form";
import { FormValues } from "../schema";

type TotalProps = {
  control: Control<FormValues>; // Control object from react-hook-form
};

export function total({ control }: TotalProps) {

  // Watch the "cart" field of the form
  // Automatically updates whenever any item's quantity or price changes
  const cart = useWatch<FormValues, "cart">({ name: "cart", control });

  // Compute total amount: sum of price * quantity for each item
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Render the total
  return total;
}
