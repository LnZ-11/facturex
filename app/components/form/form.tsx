'use client'

// Cart form container
// - UI layer only
// - Delegates logic to useCartForm
// - Renders cart items, total, and actions

import {total} from "./components/total";
import CartItem from "./components/cartItem";
import { FormValues } from "./schema";
import {useCartForm} from "./hook/useCartForm"
import Facture from "../facture/facture";
import { useWatch } from "react-hook-form";

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
  return (
    <div className="flex flex-row justify-between">
      <form className="print:hidden flex flex-row" onSubmit={handleSubmit(onSubmit)}>
        <div>
        {fields.map((field, index) => {
          return (
            <CartItem key={field.id} register={register} errors={errors} index={index} onDelete={() => remove(index)} />
          );
        })}
        </div>
        <button type="button" className="bg-black text-white w-24 h-10 border rounded m-24" onClick={() => append({ name: "", quantity: 1, price: 1})}>
            Ajouter
        </button>
      </form>
      <div>
        <Facture cart={ cart ?? []} total={totalPrice} />
      </div>
    </div>
  );
}