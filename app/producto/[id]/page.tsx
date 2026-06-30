import { supabase } from "@/lib/supabase";
import PedidoForm from "./PedidoForm";
import Link from "next/link";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: producto } = await supabase
  .from("productos")
  .select("*")
  .eq("id", id)
  .single();

const { data: talles } = await supabase
  .from("talles")
  .select("*")
  .eq("producto_id", id);
  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
  <main className="max-w-5xl mx-auto p-8">

        <Link
      href="/"
      className="inline-block mb-4 bg-gray-700 font-bold hover:bg-gray-800
        text-white px-4 py-2 rounded-lg transition"
    >
      Volver al catálogo
    </Link>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="grid md:grid-cols-2">

        <div className="bg-gray-100 h-[538px] flex items-center justify-center overflow-hidden">

  {producto.imagen ? (
    <img
      src={producto.imagen}
      alt={producto.nombre}
      className="w-full h-full object-contain"
    />
  ) : (
    <span className="text-gray-400 font-bold">
      Sin imagen
    </span>
  )}

</div>

        <div className="p-3">

          <h1 className="text-4xl text-gray-700 font-bold mb-1">
            {producto.nombre}
          </h1>

          <p className="text-gray-900 mb-3">
            {producto.descripcion}
          </p>

          <p className="text-2xl font-black text-orange-500 mb-8">
            $ {producto.precio}
          </p>
          <PedidoForm
            talles={talles || []}
            productoId={producto.id}
            precio={producto.precio}
          />
          

        </div>

      </div>

    </div>

  </main>
); }