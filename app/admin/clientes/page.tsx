import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ClientesPage() {

  const { data: clientes } = await supabase
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        👥 Clientes
      </h1>

      <div className="grid gap-4">

        {clientes?.map(async (cliente) => {

          const { count } = await supabase
            .from("pedidos")
            .select("*", {
              count: "exact",
              head: true,
            })
            .eq("cliente_id", cliente.id);

          return (
            <Link
  href={`/admin/clientes/${cliente.id}`}
  key={cliente.id}
  className="block"
>

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {cliente.nombre}
                  </h2>

                  <p className="text-gray-600">
                    📱 {cliente.telefono}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-orange-500 font-bold">
                    {count || 0} pedidos
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      cliente.created_at
                    ).toLocaleDateString("es-AR")}
                  </p>

                </div>

              </div>

            </Link>
          );
        })}

      </div>

    </main>
  );
}