import { supabase } from "@/lib/supabase";
import WhatsappProveedorBtn from "../produccion/WhatsappProveedorBtn";

export default async function MayoristaPage() {

  const { data: items } = await supabase
    .from("pedido_items")
    .select(`
      cantidad,
      talle,
      productos (
        nombre,
        proveedores (
          nombre,
          telefono
        )
      )
    `);

  const pedidosProveedor: Record<
    string,
    {
      telefono: string;
      productos: Record<string, number>;
    }
  > = {};

  items?.forEach((item: any) => {

    const proveedor =
      item.productos?.proveedores?.nombre ||
      "Sin proveedor";

    const telefono =
      item.productos?.proveedores?.telefono ||
      "";

    const clave =
      `${item.productos?.nombre} - ${item.talle}`;

    if (!pedidosProveedor[proveedor]) {
      pedidosProveedor[proveedor] = {
        telefono,
        productos: {},
      };
    }

    pedidosProveedor[proveedor].productos[clave] =
      (pedidosProveedor[proveedor].productos[clave] || 0)
      + item.cantidad;

  });

  return (
    <main className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        🚚 Pedido Mayorista
      </h1>

      {Object.entries(pedidosProveedor).map(
        ([proveedor, datos]) => {

          const textoPedido = `Pedido DTRM Deportes

${Object.entries(datos.productos)
  .map(
    ([producto, cantidad]) =>
      `${producto} x ${cantidad}`
  )
  .join("\n")}`;

          return (
            <div
              key={proveedor}
              className="bg-white rounded-xl shadow p-6 mb-6"
            >

              <div className="flex justify-between items-center mb-4">

                <div>
                  <h2 className="text-2xl font-bold text-orange-500">
                    {proveedor}
                  </h2>

                  <p className="text-gray-600">
                    📱 {datos.telefono}
                  </p>
                </div>

                <WhatsappProveedorBtn
                  telefono={datos.telefono}
                  texto={textoPedido}
                />

              </div>

              <table className="w-full">

                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-700">
                      Producto
                    </th>

                    <th className="text-center py-2 text-gray-700">
                      Cantidad
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {Object.entries(datos.productos).map(
                    ([producto, cantidad]) => (
                      <tr
                        key={producto}
                        className="border-b"
                      >
                        <td className="py-3 text-gray-700 font-semibold">
                          {producto}
                        </td>

                        <td className="text-center font-bold text-orange-500">
                          {cantidad}
                        </td>
                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          );
        }
      )}

    </main>
  );
}