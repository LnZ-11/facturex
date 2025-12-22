'use client'

// Cart form container
// - UI layer only
// - Delegates logic to useCartForm
// - Renders cart items, total, and actions

import {total} from "./components/total";
import CartItem from "./components/cartItem";
import { FormValues } from "./schema";
import {useCartForm} from "./hook/useCartForm"
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Invoice from "../invoice/Invoice";
import { useWatch } from "react-hook-form";
import { useUpdateScale } from "./hook/useUpdateScale";
import { useRef, useState, useEffect } from "react";
import { format } from "path";
// ... existing imports
type CartItemProps = {
  register: UseFormRegister<FormValues>; // react-hook-form register function
  errors: FieldErrors<FormValues>;     // Validation errors for the form
};

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
  const invoiceNumber = useWatch({
    control,
    name: "invoiceNumber",
  });
  const invoiceDate = useWatch({
    control,
    name: "invoiceDate",
  });
  const client = useWatch({
    control,
    name: "client",
  });
  const totalPrice = total({control});
  const [autoDate, setAutoDate] = useState(true);

  const [displayDate, setDisplayDate] = useState(invoiceDate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoDate) {
      setDisplayDate(new Date().toLocaleDateString("fr-FR"));
    } else {
      setDisplayDate(invoiceDate);
    }
  }, [autoDate, invoiceDate]);

  // Scaling logic for A4 preview
  const containerRef = useRef<HTMLDivElement>(null);  
  const scale = useUpdateScale(containerRef);

  const targetRef = useRef<HTMLDivElement>(null);

  // Update handleSave to use displayDate
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client,
          invoiceNumber,
          invoiceDate: displayDate, // Use the calculated display date
          cart: cart ?? [],
          total: totalPrice
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${client || 'facture'}_${invoiceDate?.replace(/\//g, '-') || 'date'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
      console.error('Error generating PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF');
    } finally {
      setLoading(false);
    }
  };
  const handlePrintSave = ()=>{
    window.print()
    handleSave()
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 print:block">
      {/* Form Section */}
      <div className="xl:col-span-7 flex flex-col gap-6 print:hidden">

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Invoice Metadata Section */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations Facture</h2>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-3">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Nom du client</label>
              <input 
                type="text" 
                {...register("client")} 
                placeholder="Ex: SARL ABC..."
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-medium" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Numéro de facture</label>
                <input 
                  type="text" 
                  {...register("invoiceNumber")} 
                  placeholder="Ex: 2025001"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-medium" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Date de facture</label>
                <input 
                  type="text"
                  placeholder="jj/mm/aaaa"
                  {...register("invoiceDate")} 
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
               <input type="checkbox" id="autoDate" checked={autoDate} onChange={(e) => setAutoDate(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
               <label htmlFor="autoDate" className="text-sm text-gray-700 dark:text-gray-300">Utiliser la date automatique (aujourd'hui)</label>
            </div>
          </div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Articles</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {fields.length}
          </span>
        </div>
          {/* Cart Items Section */}
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
            onClick={() => append({ name: "", quantity: 1, price: 0 })}
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
                    ref={targetRef}
                    style={{ 
                        transform: `scale(${scale})`, 
                        transformOrigin: 'top center',
                        width: '210mm',
                        height: '297mm',
                        marginBottom: `-${(1 - scale) * 297 * 3.78}px` 
                    }}
                    className="shadow-2xl print:!shadow-none print:!transform-none print:!w-full print:!h-auto print:!mb-0 transition-transform duration-300 ease-out bg-white"
                >
                     <Invoice client={client} invoiceDate={displayDate} invoiceNumber={invoiceNumber} cart={ cart ?? []} total={totalPrice} />
                </div>
            </div>
      <div className="w-full flex flex-row justify-around">
      <button 
        type="submit" 
        disabled={loading}
        className="print:hidden w-32 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={handleSave}
      >
        {loading ? (
             <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
        ) : "Enregistrer"}
      </button>
      <button className=" print:hidden w-32 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all font-medium" onClick={handlePrintSave}>Imprimer & Enregistrer</button>
      </div>
        </div>
      </div>
    </div>
  );
}