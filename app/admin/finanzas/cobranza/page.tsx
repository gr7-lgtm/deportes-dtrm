import { supabase } from "@/lib/supabase";

export default async function CobranzaPage() {
  const { data: pedidos } = await supabase
    .from("pedidos")
    .select(`
      *,
      clientes (
        nombre,
        telefono
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  const pendientes =
    pedidos?.filter(
      (p) => p.estado_pago === "Pendiente"
    ) || [];

  const seniados =
    pedidos?.filter(
      (p) => p.estado_pago === "Señado"
    ) || [];

  const pagados =
    pedidos?.filter(
      (p) => p.estado_pago === "Pagado"
    ) || [];

   const saldoACobrar =
  pedidos?.reduce(
    (acc, pedido) =>
      acc +
      (
        Number(pedido.total || 0) -
        Number(pedido.monto_pagado || 0)
      ),
    0
  ) || 0; 

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-700 mb-5">
        💰 Centro de Cobranza
      </h1>

      <div className="bg-red-100 rounded-xl p-3 shadow mb-5">

  <p className="text-gray-600 mb-1">
    💰 Saldo Total a Cobrar
  </p>

  <p className="text-4xl font-black text-red-600">
    $
    {saldoACobrar.toLocaleString("es-AR")}
  </p>

</div>

      <div className="grid md:grid-cols-3 gap-6">

        

        {/* Pendientes */}

        <div className="bg-yellow-50 rounded-xl shadow">

            
          <div className="bg-yellow-500 text-white p-4 rounded-t-xl">
            <h2 className="text-xl font-bold">
              🟡 Pendientes ({pendientes.length})
            </h2>
          </div>

          <div className="p-4 space-y-4">

            {pendientes.map((pedido) => (

              <div
                key={pedido.id}
                className="bg-white rounded-lg p-4 shadow"
              >
                <p className="font-bold text-gray-700">
                  #{pedido.id}
                </p>

                <p className="text-gray-600">
                  {pedido.clientes?.nombre}
                </p>

                <p className="text-sm text-gray-500">
                  {pedido.clientes?.telefono}
                </p>

                <p className="mt-3 text-gray-600">
  Total:
  <span className="font-bold ml-2">
    $
    {Number(
      pedido.total || 0
    ).toLocaleString("es-AR")}
  </span>
</p>

<p className="text-green-600">
  Pagado:
  <span className="font-bold ml-2">
    $
    {Number(
      pedido.monto_pagado || 0
    ).toLocaleString("es-AR")}
  </span>
</p>

<p className="text-red-500 font-bold">
  Debe:
  $
  {(
    Number(pedido.total || 0) -
    Number(pedido.monto_pagado || 0)
  ).toLocaleString("es-AR")}
</p>

                <a
                href={`https://wa.me/${pedido.clientes?.telefono?.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hola ${pedido.clientes?.nombre}, tu pedido #${pedido.id} sigue pendiente de pago.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center bg-green-500 hover:bg-green-600
                    text-white font-bold py-2 rounded-lg transition"
                >
                📲 WhatsApp
                </a>
                <a
  href={`https://wa.me/${pedido.clientes?.telefono?.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola ${pedido.clientes?.nombre}. Te escribimos desde DTRM Deportes por tu pedido #${pedido.id}. Cuando puedas, comunicate con nosotros para coordinar el pago. ¡Gracias!`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-3
    block
    text-center
    bg-yellow-500
    hover:bg-yellow-600
    text-white
    font-bold
    py-2
    rounded-lg
  "
>
  💰 Solicitar Pago
</a>

                <p className="mt-2 font-bold text-red-500">
                  Sin pagos registrados
                </p>
              </div>

            ))}

          </div>

        </div>

        {/* Señados */}

        <div className="bg-orange-50 rounded-xl shadow">

          <div className="bg-orange-500 text-white p-4 rounded-t-xl">
            <h2 className="text-xl font-bold">
              🟠 Señados ({seniados.length})
            </h2>
          </div>

          <div className="p-4 space-y-4">

            {seniados.map((pedido) => (

              <div
                key={pedido.id}
                className="bg-white rounded-lg p-4 shadow"
              >
                <p className="font-bold text-gray-700">
                  #{pedido.id}
                </p>

                <p className="text-gray-600">
                  {pedido.clientes?.nombre}
                </p>

                <p className="text-sm text-gray-500">
                  {pedido.clientes?.telefono}
                </p>

                <p className="mt-3 text-gray-600">
  Total:
  <span className="font-bold ml-2">
    $
    {Number(
      pedido.total || 0
    ).toLocaleString("es-AR")}
  </span>
</p>

<p className="text-green-600">
  Pagado:
  <span className="font-bold ml-2">
    $
    {Number(
      pedido.monto_pagado || 0
    ).toLocaleString("es-AR")}
  </span>
</p>

<p className="text-red-500 font-bold">
  Debe:
  $
  {(
    Number(pedido.total || 0) -
    Number(pedido.monto_pagado || 0)
  ).toLocaleString("es-AR")}
</p>

                <a
                href={`https://wa.me/${pedido.clientes?.telefono?.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hola ${pedido.clientes?.nombre}, registramos la seña de su pedido #${pedido.id}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center bg-green-500 hover:bg-green-600
                    text-white font-bold py-2 rounded-lg transition"
                >
                📲 WhatsApp
                </a>

                <a
  href={`https://wa.me/${pedido.clientes?.telefono?.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola ${pedido.clientes?.nombre}. Tu pedido #${pedido.id} tiene una seña registrada. Te recordamos que queda saldo pendiente para completar el pago.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-3
    block
    text-center
    bg-orange-500
    hover:bg-orange-600
    text-white
    font-bold
    py-2
    rounded-lg
  "
>
  📋 Recordar Saldo
</a>

                <p className="mt-2 font-bold text-orange-500">
                  $
                  {Number(
                    pedido.monto_pagado || 0
                  ).toLocaleString("es-AR")}
                </p>
              </div>

            ))}

          </div>

        </div>

        {/* Pagados */}

        <div className="bg-green-50 rounded-xl shadow">

          <div className="bg-green-500 text-white p-4 rounded-t-xl">
            <h2 className="text-xl font-bold">
              🟢 Pagados ({pagados.length})
            </h2>

            

          </div>

          <div className="p-4 space-y-4">

            {pagados.map((pedido) => (

              <div
                key={pedido.id}
                className="bg-white rounded-lg p-4 shadow"
              >
                <p className="font-bold text-gray-700">
                  #{pedido.id}
                </p>

                <p className="text-gray-600">
                  {pedido.clientes?.nombre}
                </p>

                <p className="text-sm text-gray-500">
                  {pedido.clientes?.telefono}
                </p>

                <p className="mt-3 text-gray-600">
  Total:
  <span className="font-bold ml-2">
    $
    {Number(
      pedido.total || 0
    ).toLocaleString("es-AR")}
  </span>
</p>

<p className="text-green-600">
  Pagado:
  <span className="font-bold ml-2">
    $
    {Number(
      pedido.monto_pagado || 0
    ).toLocaleString("es-AR")}
  </span>
</p>

<p className="text-red-500 font-bold">
  Debe:
  $
  {(
    Number(pedido.total || 0) -
    Number(pedido.monto_pagado || 0)
  ).toLocaleString("es-AR")}
</p>

                <a
                href={`https://wa.me/${pedido.clientes?.telefono?.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hola ${pedido.clientes?.nombre}, tu pedido #${pedido.id} figura como pagado. Gracias por confiar en DTRM Deportes.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center bg-green-500 hover:bg-green-600
                    text-white font-bold py-2 rounded-lg transition"
                >
                📲 WhatsApp
                </a>

                <a
  href={`https://wa.me/${pedido.clientes?.telefono?.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola ${pedido.clientes?.nombre}. Tu pedido #${pedido.id} ya se encuentra listo para retirar. Gracias por elegir DTRM Deportes.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-3
    block
    text-center
    bg-green-500
    hover:bg-green-600
    text-white
    font-bold
    py-2
    rounded-lg
  "
>
  📦 Avisar Entrega
</a>

                <p className="mt-2 font-bold text-green-500">
                  $
                  {Number(
                    pedido.monto_pagado || 0
                  ).toLocaleString("es-AR")}
                </p>
              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}