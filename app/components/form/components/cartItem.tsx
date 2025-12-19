// CartItem.tsx
// Represents a single row in the cart form.
// Each row includes Name, Quantity, and Price inputs.
// Handles input registration with react-hook-form, validation errors, and deletion.
'use client'
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "../schema";

// Props for a single CartItem
type CartItemProps = {
  index: number;                       // Index of the item in the cart array
  register: UseFormRegister<FormValues>; // react-hook-form register function
  errors: FieldErrors<FormValues>;     // Validation errors for the form
  onDelete: () => void;                // Function to remove this item from the cart
};

export default function CartItem({ index, register, errors, onDelete }: CartItemProps) {


  return (
    <section className="section flex flex-row gap-5" key={index}>
      
      {/* Name input */}
      {/* Shows an error state if the name is invalid */}
      <input
        placeholder="Name"
        {...register(`cart.${index}.name`)}
        className="w-96 border rounded"
      />

      {/* Quantity input */}
      {/* Number input without the default spinner arrows (Tailwind class no-spin) */}
      <input
        type="number"
        placeholder="Quantity"
        {...register(`cart.${index}.quantity`)}
        className="w-20 text-right no-spin border rounded"
      />

      {/* Price input */}
      {/* Number input without spinner arrows */}
      <input
        type="number"
        placeholder="Price"
        {...register(`cart.${index}.price`)}
        className="w-20 text-right no-spin border rounded"
      />

      {/* Delete button */}
      {/* Calls onDelete to remove this row from the cart */}
      <button type="button" className="border rounded w-6 h-6" onClick={onDelete}>
        X
      </button>
    </section>
  );
}
