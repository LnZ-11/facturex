import { createElement } from 'react';
import Invoice from '@/app/components/invoice/Invoice';

export async function renderInvoiceToHtml(data: any): Promise<string> {
    const { renderToStaticMarkup } = await import('react-dom/server');
    const invoiceHtml = renderToStaticMarkup(createElement(Invoice, data));
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
             @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
             body { 
               font-family: 'Inter', sans-serif;
               margin: 0;
               padding: 0;
             }
          </style>
        </head>
        <body>
          ${invoiceHtml}
        </body>
      </html>
    `;
}
