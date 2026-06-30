import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { count: pedidos } = await supabase
    .from("pedidos")
    .select("*", { count: "exact", head: true });

  const { count: clientes } = await supabase
    .from("clientes")
    .select("*", { count: "exact", head: true });

  const { data: items } = await supabase
    .from("pedido_items")
    .select("cantidad, precio");

  const prendasVendidas =
    items?.reduce((acc, item) => acc + item.cantidad, 0) || 0;

  const ventasTotales =
    items?.reduce(
      (acc, item) => acc + item.cantidad * Number(item.precio),
      0
    ) || 0;

const { data: pedidosEstado } = await supabase
  .from("pedidos")
  .select("estado");

const pendientes =
  pedidosEstado?.filter((p) => p.estado === "Pendiente").length || 0;

const proveedor =
  pedidosEstado?.filter((p) => p.estado === "Proveedor").length || 0;

const recibidos =
  pedidosEstado?.filter((p) => p.estado === "Recibido").length || 0;

const retirar =
  pedidosEstado?.filter((p) => p.estado === "Listo para retirar").length || 0;

const entregados =
  pedidosEstado?.filter((p) => p.estado === "Entregado").length || 0;

  const { data } = await supabase
  .from("pedido_items")
  .select(`
    cantidad,
    productos(nombre)
  `);

  const { data: productosVendidos } = await supabase
  .from("pedido_items")
  .select(`
    cantidad,
    productos(nombre)
  `);

  const rankingProductos: Record<string, number> = {};

productosVendidos?.forEach((item: any) => {
  const nombre = item.productos?.nombre;

  if (!nombre) return;

  rankingProductos[nombre] =
    (rankingProductos[nombre] || 0) + item.cantidad;
});

const topProductos = Object.entries(rankingProductos)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
const rankingTalles: Record<string, number> = {};

items?.forEach((item: any) => {
  if (!item.talle) return;

  rankingTalles[item.talle] =
    (rankingTalles[item.talle] || 0) + item.cantidad;
});

const topTalles = Object.entries(rankingTalles)
  .sort((a, b) => b[1] - a[1]);

 const { count: productosActivos } = await supabase
  .from("productos")
  .select("*", { count: "exact", head: true })
  .eq("activo", true);

const { count: productosInactivos } = await supabase
  .from("productos")
  .select("*", { count: "exact", head: true })
  .eq("activo", false); 

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard DTRM Deportes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

        <div className="bg-white rounded-xl text-gray-700 shadow p-6">
          <h2 className="text-gray-500 text-md">Pedidos</h2>
          <p className="text-3xl font-bold">{pedidos || 0}</p>
        </div>

        <div className="bg-white rounded-xl text-gray-700 shadow p-6">
          <h2 className="text-gray-500 text-md">Clientes</h2>
          <p className="text-3xl font-bold">{clientes || 0}</p>
        </div>

        <div className="bg-white rounded-xl text-gray-700 shadow p-6">
          <h2 className="text-gray-500 text-md">Prendas Vendidas</h2>
          <p className="text-3xl font-bold">{prendasVendidas}</p>
        </div>

        <div className="bg-white rounded-xl text-gray-700 shadow p-6">
          <h2 className="text-gray-500 text-md">Ventas Totales</h2>
          <p className="text-3xl font-bold">
            ${ventasTotales.toLocaleString("es-AR")}
          </p>

            
        </div>

        <div className="bg-white rounded-xl text-gray-700 shadow p-6">
          <h2 className="text-gray-500 text-md">
            Productos Activos
          </h2>
          <p className="text-3xl font-bold">
            {productosActivos || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl text-gray-700 shadow p-6">
          <h2 className="text-gray-500 text-md">
            Productos Inactivos
          </h2>
          <p className="text-3xl font-bold">
            {productosInactivos || 0}
          </p>
        </div>  
        
      </div>
      <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Estados de Pedidos
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

    <div className="bg-yellow-100 rounded-xl p-4 text-center text-gray-700">
      <p className="text-sm">Pendientes</p>
      <p className="text-3xl font-bold">{pendientes}</p>
    </div>

    <div className="bg-blue-100 rounded-xl p-4 text-center text-gray-700">
      <p className="text-sm">Proveedor</p>
      <p className="text-3xl font-bold">{proveedor}</p>
    </div>

    <div className="bg-purple-100 rounded-xl p-4 text-center text-gray-700">
      <p className="text-sm">Recibidos</p>
      <p className="text-3xl font-bold">{recibidos}</p>
    </div>

    <div className="bg-orange-100 rounded-xl p-4 text-center text-gray-700">
      <p className="text-sm">Listo Retirar</p>
      <p className="text-3xl font-bold">{retirar}</p>
    </div>

    <div className="bg-green-100 rounded-xl p-4 text-center text-gray-700">
      <p className="text-sm">Entregados</p>
      <p className="text-3xl font-bold">{entregados}</p>
    </div>
    <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4 text-gray-700">
    🏆 Productos Más Vendidos
  </h2>

  <div className="bg-white rounded-xl shadow p-6">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left text-gray-700 py-2">Producto</th>
          <th className="text-right py-2 text-gray-700">Cantidad</th>
        </tr>
      </thead>

      <tbody>
        {topProductos.map(([nombre, cantidad]) => (
          <tr key={nombre} className="border-b">
            <td className="py-3 text-gray-700">{nombre}</td>
            <td className="py-3 text-right text-gray-700 font-bold">
              {cantidad}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  </div>
</div>


    </div>
    
  );
}