import { supabase } from "@/lib/supabase";
import PedidoForm from "./PedidoForm";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

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

  const { data: relacionados } = await supabase
  .from("productos")
  .select("*")
  .eq("categoria", producto.categoria)
  .neq("id", producto.id)
  .eq("activo", true)
  .limit(4);

  
  return (
  <main className="max-w-6xl mx-auto p-8">

    <Link
      href="/"
      className="inline-block mb-4 bg-gray-700 font-bold hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
    >
      Volver al catálogo
    </Link>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="grid md:grid-cols-2">

        <div className="bg-gray-100 h-[538px] flex items-center justify-center overflow-hidden rounded-l-2xl">

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

        <div className="p-4">

          <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full mb-3">
            ⭐ Destacado
          </div>

          <h1 className="text-4xl text-gray-700 font-bold mb-2">
            {producto.nombre}
          </h1>

          <p className="text-gray-500 mb-4">
            {producto.descripcion}
          </p>

          <p className="text-3xl font-black text-orange-500 mb-6">
            $ {producto.precio}
          </p>

          <PedidoForm
            talles={talles || []}
            productoId={producto.id}
            precio={producto.precio}
          />

          <a
            href={`https://wa.me/5492317401400?text=${encodeURIComponent(
              `Hola, me interesa ${producto.nombre}. ¿Tenés disponibilidad?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-green-500
              hover:bg-green-600
              text-white
              font-bold
              py-3
              rounded-lg
              mt-3
              transition
            "
          >
            <MessageCircle size={24} />
            Comprar por WhatsApp
          </a>

          <div className="grid grid-cols-3 gap-3 mt-4">

            <div className="bg-gray-100 rounded-xl p-3 text-center">
              <div className="text-2xl">🚚</div>
              <p className="text-xs font-bold text-gray-700">
                Entrega
              </p>
              <p className="text-xs text-gray-500">
                7 a 10 días
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-3 text-center">
              <div className="text-2xl">🛡️</div>
              <p className="text-xs font-bold text-gray-700">
                Segura
              </p>
              <p className="text-xs text-gray-500">
                Compra
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-3 text-center">
              <div className="text-2xl">💳</div>
              <p className="text-xs font-bold text-gray-700">
                Pago
              </p>
              <p className="text-xs text-gray-500">
                Transferencia
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

    {relacionados && relacionados.length > 0 && (

      <div className="mt-10">

        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          También te puede interesar
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {relacionados.map((item) => (

            <Link
              key={item.id}
              href={`/producto/${item.id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <div className="h-52 bg-gray-100 flex items-center justify-center">

                {item.imagen ? (
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <span className="text-gray-400">
                    Sin imagen
                  </span>
                )}

              </div>

              <div className="p-4">

                <h3 className="font-bold text-gray-700">
                  {item.nombre}
                </h3>

                <p className="text-orange-500 font-bold mt-2">
                  $ {item.precio}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    )}

  </main>
);}