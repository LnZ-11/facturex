'use client'

import InvoiceHeader from "./components/invoiceHeader";
import InvoiceTable from "./components/invoiceTable";
import InvoiceFooter from "./components/invoiceFooter";
import { FormValues } from "../form/schema";

type InvoicePageProps = {
  cart: FormValues["cart"];
  total: number;
};
export default function Invoice({cart, total}: InvoicePageProps) {
    return (
    <div className="bg-white w-[210mm] h-[297mm] p-[20mm] print:!w-full print:!h-auto print:!p-12 print:!m-0 print:!border-none border shadow-none">
    <div className="flex flex-col w-full h-full">
    <InvoiceHeader />
    <main>
        <InvoiceTable cart={cart} total={total}/>
    </main>
    <footer className="mt-16 w-full">
        <InvoiceFooter />
    </footer>
    <button className="print:hidden text-black border w-24 h-10" onClick={() => window.print()}>Imprimer</button>
    </div>
    </div>
    );
}