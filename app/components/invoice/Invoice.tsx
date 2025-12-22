

import InvoiceHeader from "./components/invoiceHeader";
import InvoiceTable from "./components/invoiceTable";
import InvoiceFooter from "./components/invoiceFooter";
import { FormValues } from "../form/schema";

type InvoicePageProps = {
  cart: FormValues["cart"];
  total: number;
  invoiceNumber: string;
  invoiceDate: string;
  client: string;
};

export default function Invoice({cart, total, invoiceNumber, invoiceDate, client}: InvoicePageProps) {
    return (
      <div 
        className="bg-white w-[210mm] h-[297mm] p-[20mm] print:!w-full print:!h-auto print:!p-12 print:!m-0 print:!border-none border shadow-none"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <div className="flex flex-col w-full h-full">
          <InvoiceHeader client={client} invoiceNumber={invoiceNumber} invoiceDate={invoiceDate}/>
          <main>
            <InvoiceTable cart={cart} total={total}/>
          </main>
          <footer className="mt-16 w-full">
            <InvoiceFooter total={total}/>
          </footer>
        </div>
      </div>
    );
  };

