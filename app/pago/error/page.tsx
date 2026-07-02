import Link from "next/link";

export default function PagoErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">

        <h1 className="text-5xl mb-4">❌</h1>

        <h2 className="text-3xl font-bold text-red-600 mb-3">
          Pago rechazado
        </h2>

        <p className="text-gray-600 mb-6">
          No pudimos procesar el pago.
        </p>

        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Volver a la tienda
        </Link>

      </div>
    </main>
  );
}