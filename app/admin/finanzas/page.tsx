import { supabase } from "@/lib/supabase";

export default async function FinanzasPage() {

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*");

  const cobrado =
  pedidos
    ?.filter((p) => p.estado_pago === "Pagado")
    .reduce(
      (acc, p) => acc + Number(p.monto_pagado || 0),
      0
    ) || 0;

const senias =
  pedidos
    ?.filter((p) => p.estado_pago === "Señado")
    .reduce(
      (acc, p) => acc + Number(p.monto_pagado || 0),
      0
    ) || 0;

const pendientes =
  pedidos?.filter((p) => p.estado_pago === "Pendiente"
  ).length || 0;

const entregadosSinCobrar =
  pedidos?.filter(
    (p) =>
      p.estado === "Entregado" &&
      p.estado_pago !== "Pagado"
  ).length || 0;

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-700 mb-8">
        💰 Finanzas
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

  <div className="bg-green-100 rounded-xl p-6 shadow">
    <p className="text-gray-600 mb-2">
      💰 Cobrado
    </p>

    <p className="text-3xl font-black text-green-600">
      $
      {cobrado.toLocaleString("es-AR")}
    </p>
  </div>

  <div className="bg-orange-100 rounded-xl p-6 shadow">
    <p className="text-gray-600 mb-2">
      🟠 Señas
    </p>

    <p className="text-3xl font-black text-orange-600">
      $
      {senias.toLocaleString("es-AR")}
    </p>
  </div>

  <div className="bg-yellow-100 rounded-xl p-6 shadow">
    <p className="text-gray-600 mb-2">
      🟡 Pendientes
    </p>

    <p className="text-3xl font-black text-yellow-600">
      {pendientes}
    </p>
  </div>

  <div className="bg-red-100 rounded-xl p-6 shadow">
    <p className="text-gray-600 mb-2">
      🚨 Sin Cobrar
    </p>

    <p className="text-3xl font-black text-red-600">
      {entregadosSinCobrar}
    </p>

  </div>
  

</div>
{entregadosSinCobrar > 0 && (

  <div
    className="w-full bg-red-100 border-l-7 border-red-500 text-red-800
      rounded-xl p-1 mb-5 shadow"
  >
    <div className="flex items-center gap-3">

      <span className="text-3xl">
        🚨
      </span>

      <div>

        <h3 className="font-bold text-lg">
          Atención
        </h3>

        <p>
          Hay <strong>{entregadosSinCobrar}</strong> pedidos entregados
          que todavía no figuran como pagados.
        </p>

      </div>

    </div>

  </div>

)}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4 text-gray-700">
                Pedido
              </th>

              <th className="text-center p-4 text-gray-700">
                Estado Pago
              </th>

              <th className="text-right p-4 text-gray-700">
                Monto Pagado
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

                <td className="p-4 text-center text-gray-700">
                  {pedido.estado_pago}
                </td>

                <td className="p-4 text-right font-bold text-green-600">
                  $
                  {Number(
                    pedido.monto_pagado || 0
                  ).toLocaleString("es-AR")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}