'use client'
import { FormValues, cartSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

export const useCartForm = () => {
    //The resolver that tells react-hook-form to let zod do the validations and gives the default line value
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(cartSchema),
        defaultValues: {
            client: '',
            invoiceNumber: '',
            invoiceDate: '',
            cart: [{ name: "", quantity: 1, price: 23 }]
        },
    });
    //The useFieldArray hook is used to dynamically add and remove lines
    const { fields, append, remove } = useFieldArray({ name: "cart", control });

    return { register, control, handleSubmit, errors, fields, append, remove }
}