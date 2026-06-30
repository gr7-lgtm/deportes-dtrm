import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      <aside className="w-64 bg-black text-white  p-6">

        <h1 className="text-2xl font-black text-orange-500 mb-8">
          DTRM
        </h1>

        <nav className="flex flex-col gap-3">

          <Link
            href="/admin/dashboard"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/admin/produccion"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
            >
            🏭 Producción
            </Link>

          <Link
            href="/admin/pedidos"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
          >
            📦 Pedidos
          </Link>

          <Link
            href="/admin/clientes"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
          >
            👥 Clientes
          </Link>

          <Link
            href="/admin/productos"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
          >
            👕 Productos
          </Link>

          <Link
            href="/admin/mayorista"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
          >
            🚚 Pedido Mayorista
          </Link>

          <Link
            href="/admin/proveedores"
            className="bg-gray-900 hover:bg-orange-500 px-4 py-3 rounded-lg transition"
          >
            🚚 Proveedores
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}