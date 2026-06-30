import { supabase } from "@/lib/supabase";

export default async function MayoristaPage() {

  const { data: items } = await supabase
    .from("pedido_items")
    .select("*");

  const agrupados: Record<string, number> = {};

  if (items) {
    for (const item of items) {

      const { data: producto } = await supabase
        .from("productos")
        .select("nombre")
        .eq("id", item.producto_id)
        .single();

      const clave =
        `${producto?.nombre || "Producto"} - ${item.talle}`;

      agrupados[clave] =
        (agrupados[clave] || 0) + item.cantidad;
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        📦 Pedido Mayorista
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        {Object.entries(agrupados).map(
          ([producto, cantidad]) => (
            <div
              key={producto}
              className="border-b py-3"
            >
              <p className="font-bold text-gray-800">
                {producto}
              </p>

              <p className="text-orange-500 font-bold">
                x {cantidad}
              </p>
            </div>
          )
        )}

      </div>

    </main>
  );
};
