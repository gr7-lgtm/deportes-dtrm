import { supabase } from "@/lib/supabase";
import { Outfit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const outfit = Outfit({
  
  subsets: ["latin"],
});


export default async function Home() {
  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .order("id");

  return (
    <main className="min-h-screen bg-gray-300 p-8">
      <div className="max-w-6xl mx-auto">

        <header className="bg-black text-white py-4 px-8 rounded-2xl mb-10">
  <div className="flex items-center justify-between">

    <div className="flex items-center gap-11">
      <img
        src="/logo-dtrm.png"
        alt="DTRM"
        className="h-18"
      />

      <div>
       <section className="text-center mb-1">
  <h2 className="text-5xl font-black text-gray-700 uppercase">
  INDUMENTARIA DEPORTIVA
</h2>

  <p className={`${outfit.className} text-xl text-orange-500 font-bold tracking-wide`}>
    Calidad, estilo y rendimiento
  </p>
</section>
      </div>
    </div>
    

  </div>
</header>


        <div className="grid md:grid-cols-4 gap-6">

          {productos?.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >

              <div className="h-60 w-full bg-gray-100 overflow-hidden
               flex items-center justify-center">

            {producto.imagen ? (
                <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-gray-400 font-bold">
                Sin imagen
                </span>
            )}

            </div>

              <div className="p-4">

                <h2 className="text-xl text-gray-700 font-bold">
                  {producto.nombre}
                </h2>

                <p className="text-gray-500 mt-2">
                  {producto.descripcion}
                </p>

                <p className="text-2xl font-bold text-orange-500 mt-4">
                  $ {producto.precio}
                </p>

                <Link
              href={`/producto/${producto.id}`}
              className="block text-center w-full mt-4 bg-orange-500
                hover:bg-orange-600 text-white font-bold py-3
                rounded-lg transition"
            >
              PEDIR
            </Link>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}