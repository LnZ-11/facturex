import { NumberToLetter } from "convertir-nombre-lettre";

type InvoicePageProps = {
  total: number;
};

export default function InvoiceFooter({ total }: InvoicePageProps){
    return(
        <div className="flex flex-row justify-between text-black absolute bottom-28">
            <div className="flex flex-col gap-6">
            <h1 className="underline">Arrêtée la présente facture à la somme de : {NumberToLetter(total)} DA</h1>
            <h1><u>Non assujetti à la TVA</u></h1>
            </div>
            <h1 className="ml-28 mt-24">Signature</h1>
        </div>
    )
}