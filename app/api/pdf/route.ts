import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import puppeteer from 'puppeteer';
import { renderInvoiceToHtml } from '@/app/lib/renderInvoice';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Render the Invoice component to HTML string using helper
    const fullHtml = await renderInvoiceToHtml(data);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set content and wait for network (CDN to load)
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Emulate print media type to trigger 'print:' classes
    await page.emulateMediaType('print');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    await browser.close();

    const filename = `${data.client || 'facture'}_${data.invoiceDate?.replace(/\//g, '-') || 'date'}.pdf`;

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
