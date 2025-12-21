// InvoiceTable.tsx
// Displays invoice items + final total row inside the table

import { FormValues } from "../../form/schema";



type InvoiceTableProps = {
  cart: FormValues["cart"];
  total: number;
};

export default function InvoiceTable({ cart, total }: InvoiceTableProps) {

  return (
    <table className="w-7/8 text-xs border border-gray-300 mt-6 text-black">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-1 text-center border">N°</th>
          <th className="p-1 text-center border w-1/2">Désignation</th>
          <th className="p-1 text-right border w-1/16 text-sm">Qte</th>
          <th className="p-1 text-right border w-1/6 text-sm">Prix unitaire</th>
          <th className="p-1 text-right border w-1/6 text-sm">Montant</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((item, index) => (
          <tr key={index}>
            <td className="p-1 border text-center">{index + 1}</td>
            <td className="p-1 border text-sm">{item.name}</td>
            <td className="p-1 border text-right text-sm">{item.quantity}</td>
            <td className="p-1 border text-right text-sm">{item.price} DA</td>
            <td className="p-1 border text-right text-sm">{item.quantity * item.price} DA</td>
          </tr>
        ))}

        {/* TOTAL ROW */}
        <tr className="font-bold bg-gray-100">
          <td className="p-1 border text-center text-black" colSpan={4}>
            TOTAL
          </td>
          <td className="p-1 border text-right text-sm">{total} DA</td>
        </tr>
      </tbody>
    </table>
  );
}
