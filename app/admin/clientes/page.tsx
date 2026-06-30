import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ClientesPage() {

  const { data: clientes } = await supabase
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false });

  const totalClientes = clientes?.length || 0;  

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        👥 Clientes
      </h1>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
  <p className="text-gray-500">
    Total de clientes
  </p>

  <p className="text-4xl font-black text-orange-500">
    {totalClientes}
  </p>
</div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

  <table className="w-full">

    <thead className="bg-gray-100">
      <tr>
        <th className="text-left p-4 text-gray-700">
          Cliente
        </th>

        <th className="text-left p-4 text-gray-700">
          Teléfono
        </th>

        <th className="text-center p-4 text-gray-700">
          Pedidos
        </th>

        <th className="text-center p-4 text-gray-700">
          Alta
        </th>

        <th className="text-center p-4 text-gray-700">
          Acción
        </th>
      </tr>
    </thead>

    <tbody>

      {clientes?.map(async (cliente) => {

        const { count } = await supabase
          .from("pedidos")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("cliente_id", cliente.id);

        return (
          <tr
            key={cliente.id}
            className="border-t hover:bg-gray-50"
          >

            <td className="p-4 font-bold text-gray-800">
              {cliente.nombre}
            </td>

            <td className="p-4 text-gray-700">
              {cliente.telefono}
            </td>

            <td className="p-4 text-center font-bold text-orange-500">
              {count || 0}
            </td>

            <td className="p-4 text-center text-gray-500">
              {new Date(
                cliente.created_at
              ).toLocaleDateString("es-AR")}
            </td>

            <td className="p-4 text-center">

              <Link
                href={`/admin/clientes/${cliente.id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Ver Ficha
              </Link>

            </td>

          </tr>
        );
      })}

    </tbody>

  </table>

</div>
       
   </main>
  );
}