import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProductosPage() {

  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .order("id", { ascending: false });

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Productos
        </h1>

        

        <Link
          href="/admin/productos/nuevo"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {productos?.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <div className="h-55 w-full bg-gray-100 overflow-hidden flex items-center justify-center">

            {producto.imagen ? (
                <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-gray-400 font-bold">
                Sin imagen
                </span>
            )}

            </div>
            <Link
            href={`/admin/productos/${producto.id}`}
            className="block text-center font-bold  mt-1 bg-gray-700 hover:bg-gray-400
                text-white py-1 rounded-xl"
            >
            Editar
            </Link>

            <div className="p-4">

              <h2 className="font-bold text-lg text-gray-500">
                {producto.nombre}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                {producto.descripcion}
              </p>

              <p className="text-2xl font-bold text-orange-500 mt-4">
                ${producto.precio}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}