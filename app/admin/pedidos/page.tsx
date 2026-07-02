import { supabase } from "@/lib/supabase";
import PedidoEstado from "./PedidoEstado";
import WhatsappClienteBtn from "./WhatsappClienteBtn";
import PagoEstado from "./PagoEstado";
import MontoPagado from "./MontoPagado";



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
    <main className="max-w-7xl mx-auto p-3">

      <h1 className="text-4xl font-bold text-gray-800 mb-5">
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

      <div className="bg-white rounded-xl shadow overflow-hidden">

  <table className="w-full">

    <thead className="bg-gray-100">
  <tr>
    <th className="text-left p-3 text-gray-700">Pedido</th>
    <th className="text-left p-4 text-gray-700">Cliente</th>
    <th className="text-left p-4 text-gray-700">Teléfono</th>
    <th className="text-left p-4 text-gray-700">Producto / Talle</th>
    <th className="text-center p-4 text-gray-700">Cant.</th>
    <th className="text-right p-4 text-gray-700">Total</th>
    <th className="text-center p-4 text-gray-700">📲 Cliente</th>
    <th className="text-center p-4 text-gray-700">Estado</th>
    <th className="text-center p-4 text-gray-700">Pago</th>
    <th className="text-right p-4 text-gray-700">Pago $</th>
    <th className="text-center p-4 text-gray-700">Fecha</th>
  </tr>
</thead>

    <tbody>

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

        const item = items?.[0];

        return (
          <tr
            key={pedido.id}
            className="border-t hover:bg-gray-50"
          >
            <td className="p-4 font-bold text-gray-800">
              #{pedido.id}
            </td>

            <td className="p-4 text-gray-700">
              {cliente?.nombre}
            </td>

            <td className="p-4 text-gray-700">
              {cliente?.telefono}
            </td>

            <td className="p-4 text-gray-700">
              <div className="font-semibold">
                {item?.productos?.nombre}
              </div>

              <div className="text-sm text-gray-500">
                Talle: {item?.talle}
              </div>
            </td>

            <td className="p-4 text-center text-gray-700">
              {item?.cantidad}
            </td>

            <td className="p-5 text-right font-bold text-orange-500">
  ${item?.precio}
</td>

<td className="p-4 text-center">
  <WhatsappClienteBtn
    telefono={cliente?.telefono || ""}
    nombre={cliente?.nombre || "Cliente"}
    estado={pedido.estado}
  />
</td>

<td className="p-4 text-center">
  <PedidoEstado
    pedidoId={pedido.id}
    estadoInicial={pedido.estado}
  />
</td>

<td className="p-4 text-center">
  <PagoEstado
  pedidoId={pedido.id}
  estadoInicial={
    pedido.estado_pago || "Pendiente"
  }
  total={Number(pedido.total || 0)}
/>
</td>

<td className="p-4 text-center">
  <MontoPagado
    pedidoId={pedido.id}
    montoInicial={
      pedido.monto_pagado || 0
    }
  />
</td>

<td className="p-4 text-center text-gray-500 text-sm">
  {new Date(
    pedido.created_at
  ).toLocaleDateString("es-AR")}
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