import { supabase } from "@/lib/supabase";
import WhatsappClienteBtn from "../../pedidos/WhatsappClienteBtn";

export default async function ClienteDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id)
    .single();

  if (!cliente) {
    return (
      <div className="p-8">
        Cliente no encontrado
      </div>
    );
  }

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*")
    .eq("cliente_id", id)
    .order("created_at", {
      ascending: false,
    });

  const cantidadPedidos = pedidos?.length || 0;

let totalGastado = 0;

for (const pedido of pedidos || []) {

  const { data: items } = await supabase
    .from("pedido_items")
    .select("cantidad, precio")
    .eq("pedido_id", pedido.id);

  const subtotal =
    items?.reduce(
      (acc, item) =>
        acc +
        item.cantidad * Number(item.precio),
      0
    ) || 0;

  totalGastado += subtotal;
}

  return (
    <main className="max-w-6xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {cliente.nombre}
        </h1>

        <p className="text-gray-600">
          📱 {cliente.telefono}
        </p>

        <div className="mt-4">
  <WhatsappClienteBtn
    telefono={cliente.telefono || ""}
    nombre={cliente.nombre}
    estado="Consulta"
  />
</div>

        <p className="text-gray-500 mt-2">
          Cliente desde{" "}
          {new Date(
            cliente.created_at
          ).toLocaleDateString("es-AR")}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

  <div className="bg-orange-50 rounded-xl p-4">
    <p className="text-gray-500">
      Pedidos realizados
    </p>

    <p className="text-3xl font-black text-orange-500">
      {cantidadPedidos}
    </p>
  </div>

  <div className="bg-green-50 rounded-xl p-4">
    <p className="text-gray-500">
      Total comprado
    </p>

    <p className="text-3xl font-black text-green-600">
      ${totalGastado.toLocaleString("es-AR")}
    </p>
  </div>

</div>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Pedidos
        </h2>

        {pedidos?.map((pedido) => (
          <div
            key={pedido.id}
            className="border-b py-4"
          >
            <p className="font-bold text-gray-800">
              Pedido #{pedido.id}
            </p>

            <p className="text-gray-600">
              Estado: {pedido.estado}
            </p>

            <p className="text-gray-500">
              {new Date(
                pedido.created_at
              ).toLocaleString("es-AR")}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}