import { supabase } from "@/lib/supabase";
import PedidoEstado from "./PedidoEstado";



export default async function PedidosPage() {

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false });

    const pendientes =
  pedidos?.filter(
    (p) => p.estado === "Pendiente"
  ).length || 0;

const proveedor =
  pedidos?.filter(
    (p) => p.estado === "Pedido al proveedor"
  ).length || 0;

const retirar =
  pedidos?.filter(
    (p) => p.estado === "Listo para retirar"
  ).length || 0;

const entregados =
  pedidos?.filter(
    (p) => p.estado === "Entregado"
  ).length || 0;

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        📦 Pedidos Recibidos
      </h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-orange-500 font-bold">
      Pendientes
    </h3>
    <p className="text-3xl text-gray-900 font-black">
  {pendientes}
</p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-blue-500 font-bold">
      Al proveedor
    </h3>
    <p className="text-3xl text-gray-900 font-black">
      {proveedor}
    </p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-yellow-500 font-bold">
      Listos
    </h3>
    <p className="text-3xl text-gray-900 font-black">
      {retirar}
    </p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-green-500 font-bold">
      Entregados
    </h3>
    <p className="text-3xl text-gray-900 font-black">
      {entregados}
    </p>
  </div>

</div>

      <div className="grid gap-5">

        

        {pedidos?.map(async (pedido) => {

            

          const { data: cliente } = await supabase
            .from("clientes")
            .select("*")
            .eq("id", pedido.cliente_id)
            .single();

          const { data: items } = await supabase
            .from("pedido_items")
            .select(`
              *,
              productos (
                nombre
              )
            `)
            .eq("pedido_id", pedido.id);

          return (
            <div
              key={pedido.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >

              <div className="flex justify-between mb-4">

                <h2 className="text-2xl font-bold text-gray-800">
                  Pedido #{pedido.id}
                </h2>

                <PedidoEstado
                pedidoId={pedido.id}
                estadoInicial={pedido.estado}
                />

              </div>

              <div className="mb-4">

                <p className="text-gray-700">
                  <strong>Cliente:</strong> {cliente?.nombre}
                </p>

                <p className="text-gray-700">
                  <strong>WhatsApp:</strong> {cliente?.telefono}
                </p>

              </div>

              <div className="border-t pt-4">

                <h3 className="font-bold text-gray-800 mb-3">
                  Productos
                </h3>

                {items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 rounded-lg p-3 mb-2"
                  >

                    <p className="font-semibold text-gray-800">
                      {item.productos?.nombre}
                    </p>

                    <p className="text-gray-600">
                      Talle: {item.talle}
                    </p>

                    <p className="text-gray-600">
                      Cantidad: {item.cantidad}
                    </p>

                    <p className="text-orange-500 font-bold">
                      $ {item.precio}
                    </p>

                  </div>
                ))}

              </div>

              <p className="text-sm text-gray-500 mt-4">
                {new Date(
                  pedido.created_at
                ).toLocaleString("es-AR")}
              </p>

            </div>
          );
        })}

      </div>

    </main>
  );
}