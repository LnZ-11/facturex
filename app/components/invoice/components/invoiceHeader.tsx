'use client'
import { FormValues } from "../../form/schema";
import { useState } from "react"

type invoiceHeaderProps = {
  invoiceNumber: string;
  invoiceDate: string;
  client: string;
};

export default function InvoiceHeader({invoiceNumber, invoiceDate, client}: invoiceHeaderProps){
    const [auto, setAuto] = useState(true)
    return(
        <header className="flex flex-col text-black">
            <div className="flex flex-row w-full justify-between">
                <h1 className="ml-12 mb-5 text-xl"><b>IDHOURAR INFO</b></h1>
                <button className="print:hidden border rounded w-26" onClick={() => setAuto(!auto)}>{auto? "Date auto" : "Date Manuel"}</button>
                <h1><u>Beni Douala le:</u> {auto ? new Date().toLocaleDateString("fr-FR") : invoiceDate}</h1>
            </div>
            <div className="flex flex-col w-full justify-between text-xs">
            <h2>HESSAS ABDERRAHIM</h2>
            <h2>VENTE, MAINTENANCE DE MATERIEL INFORMATIQUE</h2>
            <h2>ACCESSOIRES, PRODUITS INFORMATIQUES, BUREAUTIQUES D'OCCASION</h2>
            <h2>REPARATION, INSTALLATION, MAINTENANCE D'EQUIPEMENTS</h2>
            <h2>MATERIEL DE BUREAUTIQUE, RAISEAU ET TRAITEMENT DE DONNEES</h2>
            <h2><b>Telephone:</b> 0666 60 41 97</h2>
            <h2><b>N° d'article:</b> 15 320 140 774</h2>
            <h2><b>N.I.F:</b> 188 153 200 020 195 015 00</h2>
            <div className="flex flex-row justify-between">
            <h2><b>N.I.S:</b> 1 988 1532 00020 47</h2>
            <h2><b>Facture N°:</b> {invoiceNumber}</h2>
            </div>
            <h2><b>C.C.P:</b> 40251 75 Clé: 52</h2>
            <h2><b>R.CN°:</b> 15/00-5235070/A/23</h2>
            <h2><b>N° du compte bancaire BEA:</b> 00200034034220135152</h2>
            </div>
            <div className="flex flex-row w-full justify-between text-xs">
            <h2><b>Nom du client :</b> {client}</h2>
            </div>

        </header>
    )
}