import { supabase } from "@/lib/supabase";
import { Outfit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import BuscadorProductos from "./BuscadorProductos";
import WhatsappFlotante from "./WhatsappFlotante";

const outfit = Outfit({
  
  subsets: ["latin"],
});

export default async function Home() {
const { data: productos } = await supabase
  .from("productos")
  .select("*")
  .eq("activo", true)
  .order("id", { ascending: false });

  return (
    
    <main className="min-h-screen bg-gray-300 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">

        <header className="bg-black text-white py-7 px-8 rounded-2xl mb-3">
          
  <div className="
  flex
  flex-col
  lg:flex-row
  items-center
  justify-between
  gap-6
">

        <div className="
  flex
  flex-col
  sm:flex-row
  items-center
  gap-4
  text-center
  sm:text-left
">
      <img
  src="/logo-dtrm.png"
  alt="DTRM"
  className="h-16 md:h-20"
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
<div className="bg-white rounded-2xl shadow-lg p-3 mb-8">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">

    <div>
      
      <h3 className="font-bold text-gray-700">
        Trabajamos por pedido
      </h3>
      <p className="text-sm text-gray-500">
        Elegí tu producto y lo encargamos para vos.
      </p>
    </div>

    <div>
      
      <h3 className="font-bold text-gray-700">
        Entrega rápida
      </h3>
      <p className="text-sm text-gray-500">
        
      </p>
    </div>

    <div>
      
      <h3 className="font-bold text-gray-700">
        Medios de pago
      </h3>
      <p className="text-sm text-gray-500">
        Transferencia, efectivo y MP.
      </p>
    </div>

    <div>
      
      <h3 className="font-bold text-gray-700">
        Atención personalizada
      </h3>
      <p className="text-sm text-gray-500">
        Consultanos directamente por WhatsApp.
      </p>
    </div>

  </div>

</div>

<header>
<h2 className="text-2xl font-bold text-gray-700 mb-4">
  Productos Destacados
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

  {productos?.slice(0, 4).map((producto) => (

    <Link
      key={producto.id}
      href={`/producto/${producto.id}`}
      className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
        hover:scale-110
        transition
      "
    >

      <div className="h-56 bg-gray-100">

        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Sin imagen
          </div>
        )}

      </div>

      <div className="p-3">

        <p className="font-bold text-gray-700">
          {producto.nombre}
        </p>

        <p className="text-orange-500 font-bold mt-2">
          $ {producto.precio}
        </p>

      </div>

    </Link>

  ))}

</div>
</header>



<BuscadorProductos
  productos={productos || []}
/>

      </div>

      <WhatsappFlotante />
    </main>
  );
}