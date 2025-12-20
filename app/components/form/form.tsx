'use client'

// Cart form container
// - UI layer only
// - Delegates logic to useCartForm
// - Renders cart items, total, and actions

import {total} from "./components/total";
import CartItem from "./components/cartItem";
import { FormValues } from "./schema";
import {useCartForm} from "./hook/useCartForm"
import Invoice from "../invoice/Invoice";
import { useWatch } from "react-hook-form";

import { useEffect, useRef, useState } from "react";

// ... existing imports

export default function Form() {
  // Centralized form logic (state, validation, dynamic rows)
  const {fields, register, handleSubmit, control, errors, append, remove} = useCartForm()
  // Called with validated data when form is submitted
  const onSubmit = (data: FormValues) => console.log(data)
  // 👀 Live form data (re-render on every keystroke)
  const cart = useWatch({
    control,
    name: "cart",
  });

  const totalPrice = total({control});

  // Scaling logic for A4 preview
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const a4WidthPx = 794; // 210mm @ 96dpi approx
        // Add some padding/margin safety to fit nicely
        const newScale = Math.min(1, (containerWidth - 48) / a4WidthPx); 
        setScale(newScale > 0 ? newScale : 1);
      }
    };

    updateScale();
    // Use ResizeObserver for more robust resizing detection
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
        observer.observe(containerRef.current);
    }
    
    window.addEventListener("resize", updateScale);
    
    return () => {
        window.removeEventListener("resize", updateScale);
        observer.disconnect();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 print:block">
      {/* Form Section */}
      <div className="xl:col-span-7 flex flex-col gap-6 print:hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Articles</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {fields.length}
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {fields.map((field, index) => {
              return (
                <CartItem key={field.id} register={register} errors={errors} index={index} onDelete={() => remove(index)} />
              );
            })}
          </div>
          
          <button 
            type="button" 
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all font-medium" 
            onClick={() => append({ name: "", quantity: 1, price: 0})}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Ajouter un article
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="xl:col-span-5 relative print:w-full print:static" ref={containerRef}>
        <div className="sticky top-8 space-y-4 print:static print:space-y-0">
             <div className="bg-gray-100 dark:bg-slate-950/50 rounded-xl border border-gray-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[600px] print:bg-transparent print:border-none print:p-0 print:block print:min-h-0">
                 <div className="mb-4 text-sm text-gray-400 font-medium print:hidden">Aperçu direct (A4)</div>
                <div 
                    style={{ 
                        transform: `scale(${scale})`, 
                        transformOrigin: 'top center',
                        width: '210mm',
                        height: '297mm',
                        marginBottom: `-${(1 - scale) * 297 * 3.78}px` 
                    }}
                    className="shadow-2xl print:!shadow-none print:!transform-none print:!w-full print:!h-auto print:!mb-0 transition-transform duration-300 ease-out bg-white"
                >
                     <Invoice cart={ cart ?? []} total={totalPrice} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}