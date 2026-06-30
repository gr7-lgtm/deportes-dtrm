import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProveedoresPage() {

  const { data: proveedores } = await supabase
    .from("proveedores")
    .select("*")
    .order("nombre");

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Proveedores
        </h1>

        <Link
          href="/admin/proveedores/nuevo"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Nuevo Proveedor
        </Link>

        

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Proveedor</th>
              <th className="p-4 text-left">Teléfono</th>
            </tr>
          </thead>

          <tbody>

            {proveedores?.map((proveedor) => (
              <tr
                key={proveedor.id}
                className="border-t"
              >
                <td className="p-4 font-semibold text-gray-700">
                  {proveedor.nombre}
                </td>

                <td className="p-4 text-gray-700">
                  {proveedor.telefono}
                </td>
              <td className="p-4">
  <Link
    href={`/admin/proveedores/${proveedor.id}`}
    className="bg-orange-500 text-white px-3 py-2 rounded-lg"
  >
    Editar
  </Link>
</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}