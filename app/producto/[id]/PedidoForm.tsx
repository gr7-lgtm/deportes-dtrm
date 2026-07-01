"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Talle = {
  id: number;
  talle: string;
};

export default function PedidoForm({
  talles,
  productoId,
  precio,
}: {
  talles: Talle[];
  productoId: number;
  precio: number;
}) {
const [nombre, setNombre] = useState("");
const [telefono, setTelefono] = useState("");
const [cantidad, setCantidad] = useState(1);
const [talle, setTalle] = useState("");
const [mensaje, setMensaje] = useState("");

async function realizarPedido() {
  try {
    if (!nombre || !telefono || !talle) {
      setMensaje("Complete todos los campos");
      return;
    }
    

    const { data: cliente, error: errorCliente } = await supabase
      .from("clientes")
      .insert({
        nombre,
        telefono,
      })
      .select()
      .single();

    if (errorCliente) throw errorCliente;

    const { data: pedido, error: errorPedido } = await supabase
      .from("pedidos")
      .insert({
        cliente_id: cliente.id,
      })
      .select()
      .single();

    if (errorPedido) throw errorPedido;

    const { error: errorItem } = await supabase
      .from("pedido_items")
      .insert({
        pedido_id: pedido.id,
        producto_id: productoId,
        talle,
        cantidad,
        precio,
      });

    if (errorItem) throw errorItem;

    setMensaje("✅ Pedido realizado correctamente");

    setNombre("");
    setTelefono("");
    setCantidad(1);
    setTalle("");

  } catch (error) {
    console.error(error);
    setMensaje("❌ Error al guardar el pedido");
  }
}

  return (
    <div className="space-y-4 mt-3">
        <div>
  <label className="block text-gray-500 mb-1 font-semibold">
    Talle
  </label>

  <select
  value={talle}
  onChange={(e) => setTalle(e.target.value)}
  className="w-full text-gray-700 border rounded-lg p-1"
>
  <option value="">Seleccione un talle</option>

  {talles.map((talleItem) => (
    <option
      key={talleItem.id}
      value={talleItem.talle}
    >
      {talleItem.talle}
    </option>
  ))}
</select>
</div>

      <div>
        <label className="block text-gray-500 mb-1 font-semibold">
          Nombre y Apellido
        </label>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full text-gray-700 border rounded-lg p-1"
        />
      </div>

      <div>
        <label className="block text-gray-500 mb-1 font-semibold">
          WhatsApp
        </label>

        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full text-gray-700 border rounded-lg p-1"
        />
      </div>

      <div>
        <label className="block text-gray-500 mb-1 font-semibold">
          Cantidad
        </label>

        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-full text-gray-700 border rounded-lg p-1"
        />
      </div>

      <button onClick={realizarPedido}
        className="
          w-full
          bg-orange-500
          hover:bg-orange-600
          text-white
          font-bold
          py-1
          rounded-lg
          transition
        "
      >
        REALIZAR PEDIDO
      </button>
      {mensaje && (
  <p className="text-center font-semibold text-gray-700 mt-3">
    {mensaje}
  </p>
)}

    </div>
  );
}