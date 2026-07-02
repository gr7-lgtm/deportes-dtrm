import { supabase } from "@/lib/supabase";

export default async function FinanzasMensualPage() {

  const hoy = new Date();

  const primerDiaMes = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    1
  ).toISOString();

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*")
    .gte("created_at", primerDiaMes);

  const cobradoMes =
    pedidos
      ?.filter((p) => p.estado_pago === "Pagado")
      .reduce(
        (acc, p) => acc + Number(p.monto_pagado || 0),
        0
      ) || 0;

  const seniasMes =
    pedidos
      ?.filter((p) => p.estado_pago === "Señado")
      .reduce(
        (acc, p) => acc + Number(p.monto_pagado || 0),
        0
      ) || 0;

  const pedidosMes = pedidos?.length || 0;

  const entregadosMes =
    pedidos?.filter(
      (p) => p.estado === "Entregado"
    ).length || 0;

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-700 mb-8">
        📈 Resumen Mensual
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-green-100 rounded-xl p-6 shadow">
          <p className="text-gray-600 mb-2">
            Cobrado este mes
          </p>

          <p className="text-3xl font-black text-green-600">
            $
            {cobradoMes.toLocaleString("es-AR")}
          </p>
        </div>

        <div className="bg-orange-100 rounded-xl p-6 shadow">
          <p className="text-gray-600 mb-2">
            Señas este mes
          </p>

          <p className="text-3xl font-black text-orange-600">
            $
            {seniasMes.toLocaleString("es-AR")}
          </p>
        </div>

        <div className="bg-blue-100 rounded-xl p-6 shadow">
          <p className="text-gray-600 mb-2">
            Pedidos del mes
          </p>

          <p className="text-3xl font-black text-blue-600">
            {pedidosMes}
          </p>
        </div>

        <div className="bg-purple-100 rounded-xl p-6 shadow">
          <p className="text-gray-600 mb-2">
            Entregados
          </p>

          <p className="text-3xl font-black text-purple-600">
            {entregadosMes}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="text-2xl font-bold text-gray-700">
            Últimos movimientos del mes
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">
                Pedido
              </th>

              <th className="text-center p-4">
                Estado
              </th>

              <th className="text-center p-4">
                Pago
              </th>

              <th className="text-right p-4">
                Monto
              </th>

              <th className="text-center p-4">
                Fecha
              </th>
            </tr>

          </thead>

          <tbody>

            {pedidos?.map((pedido) => (

              <tr
                key={pedido.id}
                className="border-t"
              >

                <td className="p-4 font-bold text-gray-700">
                  #{pedido.id}
                </td>

                <td className="p-4 text-center">
                  {pedido.estado}
                </td>

                <td className="p-4 text-center">
                  {pedido.estado_pago}
                </td>

                <td className="p-4 text-right font-bold text-green-600">
                  $
                  {Number(
                    pedido.monto_pagado || 0
                  ).toLocaleString("es-AR")}
                </td>

                <td className="p-4 text-center text-gray-500">
                  {new Date(
                    pedido.created_at
                  ).toLocaleDateString("es-AR")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}