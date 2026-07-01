"use client";

import { useState } from "react";
import Link from "next/link";

export default function BuscadorProductos({
  productos,
}: {
  productos: any[];
}) {
  const [busqueda, setBusqueda] = useState("");

  const [categoria, setCategoria] = useState("Todos");

  const filtrados = productos.filter((producto) => {

  const coincideNombre =
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

  const coincideCategoria =
    categoria === "Todos" ||
    producto.categoria === categoria;

  return coincideNombre && coincideCategoria;
});

  return (
    <>
      <div className="mb-5">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 text-gray-700"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">

  <button
    onClick={() => setCategoria("Todos")}
    className="px-4 py-2 bg-gray-700 text-white font-bold rounded-lg"
  >
    Todos
  </button>

  <button
    onClick={() => setCategoria("Futbol")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Fútbol
  </button>

  <button
    onClick={() => setCategoria("Camiseta")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Camisetas
  </button>

  <button
    onClick={() => setCategoria("Camisetas niño")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Niño
  </button>

  <button
    onClick={() => setCategoria("Camperas")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Camperas
  </button>

  <button
    onClick={() => setCategoria("Entrenamiento")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Entrenamiento
  </button>

  <button
    onClick={() => setCategoria("Gorras")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Gorras
  </button>

  <button
    onClick={() => setCategoria("Remera")}
    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg"
  >
    Remeras
  </button>

</div>

      <div className="grid md:grid-cols-4 gap-6">

        {filtrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative h-60 w-full bg-gray-100 overflow-hidden flex items-center justify-center">

  {producto.id <= 3 && (
    <div className="
      absolute
      top-2
      left-2
      bg-red-500
      text-white
      text-xs
      font-bold
      px-3
      py-1
      rounded-full
      z-10
    ">
      🔥 Destacado
    </div>
  )}

  {producto.id > 3 && producto.id <= 6 && (
    <div className="
      absolute
      top-2
      left-2
      bg-green-500
      text-white
      text-xs
      font-bold
      px-3
      py-1
      rounded-full
      z-10
    ">
      ⭐ Nuevo
    </div>
  )}

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

            

            <div className="p-4 flex flex-col h-full">

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
                className="block text-center w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
              >
                PEDIR
              </Link>

            </div>
          </div>
        ))}

      </div>
    </>
  );
}