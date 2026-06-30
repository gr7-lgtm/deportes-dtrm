import { supabase } from "@/lib/supabase";
import CopiarPedidoBtn from "./CopiarPedidoBtn";
import WhatsappProveedorBtn from "./WhatsappProveedorBtn";

export default async function ProduccionPage() {

  const { data: items } = await supabase
  .from("pedido_items")
  .select(`
    cantidad,
    talle,
    pedido_id,
    pedidos (
      estado
    ),
    productos (
      nombre,
      proveedores (
        nombre,
        telefono
      )
    )
  `);

  

  const produccionPorProveedor: Record<
  string,
  {
    telefono: string;
    productos: Record<string, Record<string, number>>;
  }
> = {};

items?.forEach((item: any) => {
if (
  item.pedidos?.estado !== "Pendiente" &&
  item.pedidos?.estado !== "Pedido al proveedor"
) {
  return;
}
  const proveedor =
    item.productos?.proveedores?.nombre ||
    "Sin proveedor";

  const telefono =
    item.productos?.proveedores?.telefono ||
    "";

  const producto =
    item.productos?.nombre;

  if (!producto) return;

  if (!produccionPorProveedor[proveedor]) {
    produccionPorProveedor[proveedor] = {
      telefono,
      productos: {},
    };
  }

  if (
    !produccionPorProveedor[proveedor]
      .productos[producto]
  ) {
    produccionPorProveedor[proveedor]
      .productos[producto] = {};
  }

  produccionPorProveedor[proveedor]
    .productos[producto][item.talle] =
      (
        produccionPorProveedor[proveedor]
          .productos[producto][item.talle] || 0
      ) + item.cantidad;

});

const totalProveedores =
  Object.keys(produccionPorProveedor).length;

const totalPrendas =
  Object.values(produccionPorProveedor).reduce(
    (acc, proveedor) =>
      acc +
      Object.values(proveedor.productos).reduce(
        (subAcc, talles) =>
          subAcc +
          Object.values(talles).reduce(
            (a, c) => a + Number(c),
            0
          ),
        0
      ),
    0
  );



  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        🏭 Producción
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500">
      Proveedores con pedidos
    </p>

    <p className="text-4xl font-black text-orange-500">
      {totalProveedores}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500">
      Prendas a solicitar
    </p>

    <p className="text-4xl font-black text-green-600">
      {totalPrendas}
    </p>
  </div>

</div>

      <div className="bg-white rounded-xl shadow p-6">

  <h2 className="text-xl font-bold text-gray-700 mb-4">
    Producción por proveedor
  </h2>

  {Object.entries(produccionPorProveedor).map(
  ([proveedor, datos]) => {

    const textoPedido = `Pedido DTRM Deportes

${Object.entries(datos.productos)
  .map(([producto, talles]) => {

    const detalle = Object.entries(talles)
      .map(
        ([talle, cantidad]) =>
          `${talle} x ${cantidad}`
      )
      .join("\n");

    return `${producto}\n${detalle}`;
  })
  .join("\n\n")}`;

    return (
      <div
        key={proveedor}
        className="border rounded-xl p-4 mb-6"
      >

        <h3 className="text-2xl font-bold text-orange-500 mb-2">
          {proveedor}
        </h3>

        <p className="text-gray-600 mb-4">
          📱 {datos.telefono}
        </p>

        <div className="mb-4 flex gap-3">

  <CopiarPedidoBtn
    texto={textoPedido}
  />

  <WhatsappProveedorBtn
    telefono={datos.telefono}
    texto={textoPedido}
  />

</div>

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-700">
              <th className="text-left py-2">
                Producto
              </th>
              <th className="text-center">
                S
              </th>
              <th className="text-center">
                M
              </th>
              <th className="text-center">
                L
              </th>
              <th className="text-center">
                XL
              </th>
              <th className="text-center">
                XXL
              </th>
              <th className="text-center">
                Total
              </th>
            </tr>
          </thead>

          <tbody>

            {Object.entries(datos.productos).map(
              ([producto, talles]) => {

                const total = Object.values(
                  talles
                ).reduce(
                  (acc, c) =>
                    acc + Number(c),
                  0
                );

                return (
                  <tr
                    key={producto}
                    className="border-b"
                  >
                    <td className="py-2 font-semibold text-gray-700">
                      {producto}
                    </td>

                    <td className="text-center text-gray-700 font-bold">
                      {talles["S"] || 0}
                    </td>

                    <td className="text-center text-gray-700 font-bold">
                      {talles["M"] || 0}
                    </td>

                    <td className="text-center text-gray-700 font-bold">
                      {talles["L"] || 0}
                    </td>

                    <td className="text-center text-gray-700 font-bold">
                      {talles["XL"] || 0}
                    </td>

                    <td className="text-center text-gray-700 font-bold">
                      {talles["XXL"] || 0}
                    </td>

                    <td className="text-center font-bold text-orange-500">
                      {total}
                    </td>
                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>
    );
  }
)}
</div>
</div>
  );}