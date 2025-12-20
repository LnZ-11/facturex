import Form from "./components/form/form";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-5rem)] mt-2 print:p-0 print:m-0">
      <div className="max-w-7xl mx-auto space-y-8 print:max-w-none print:space-y-0">
        <header className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800 print:hidden">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-gray-50">
                Facturex
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
                Éditeur de facture simplifié
              </p>
            </div>
            {/* Could add a theme toggle or user menu here later */}
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 md:p-8 print:border-none print:shadow-none print:p-0 print:bg-transparent">
          <Form />
        </section>
      </div>
    </main>
  );
}