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
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-700 transition-all duration-200" key={index}>
      
      {/* Name input */}
      <div className="flex-grow w-full sm:w-auto space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Produit</label>
        <input
          placeholder="Ex: Consultation..."
          {...register(`cart.${index}.name`)}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-medium"
        />
      </div>

      <div className="flex items-end gap-3 w-full sm:w-auto">
        {/* Quantity input */}
        <div className="w-1/3 sm:w-24 space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Qté</label>
            <input
            type="number"
            {...register(`cart.${index}.quantity`)}
            className="w-full px-3 py-2 text-center bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-semibold no-spin"
            />
        </div>

        {/* Price input */}
        <div className="w-1/3 sm:w-32 space-y-1">
             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Prix (DA)</label>
            <input
            type="number"
            placeholder="0.00"
            {...register(`cart.${index}.price`)}
            className="w-full px-3 py-2 text-right bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-semibold no-spin"
            />
        </div>

        {/* Delete button */}
        <div className="pb-1">
            <button 
                type="button" 
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                onClick={onDelete}
                aria-label="Supprimer la ligne"
                title="Supprimer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        </div>
      </div>
    </div>
  );
}
