// InvoiceTable.tsx
// Displays invoice items + final total row inside the table

import { FormValues } from "../../form/schema";

type InvoiceTableProps = {
  cart: FormValues["cart"];
  total: number;
};

export default function InvoiceTable({ cart, total }: InvoiceTableProps) {

  return (
    <table className="w-full text-sm border border-gray-300 mt-6 text-black">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-center border">N°</th>
          <th className="p-2 text-center border w-1/2">Désignation</th>
          <th className="p-2 text-right border w-1/6">Qte</th>
          <th className="p-2 text-right border w-1/6">Prix unitaire</th>
          <th className="p-2 text-right border w-1/6">Montant</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((item, index) => (
          <tr key={index}>
            <td className="p-2 border text-center">{index + 1}</td>
            <td className="p-2 border">{item.name}</td>
            <td className="p-2 border text-right">{item.quantity}</td>
            <td className="p-2 border text-right">{item.price} DA</td>
            <td className="p-2 border text-right">
              {item.quantity * item.price} DA
            </td>
          </tr>
        ))}

        {/* TOTAL ROW */}
        <tr className="font-bold bg-gray-100">
          <td className="p-2 border text-center text-black" colSpan={4}>
            TOTAL
          </td>
          <td className="p-2 border text-right">
            {total} DA
          </td>
        </tr>
      </tbody>
    </table>
  );
}
