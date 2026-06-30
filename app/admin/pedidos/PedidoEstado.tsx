"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PedidoEstado({
  pedidoId,
  estadoInicial,
}: {
  pedidoId: number;
  estadoInicial: string;
}) {
  const [estado, setEstado] = useState(estadoInicial);

  async function cambiarEstado(
    nuevoEstado: string
  ) {
    setEstado(nuevoEstado);

    await supabase
      .from("pedidos")
      .update({
        estado: nuevoEstado,
      })
      .eq("id", pedidoId);
  }

  return (
    <select
      value={estado}
      onChange={(e) =>
        cambiarEstado(e.target.value)
      }
      className="border rounded-lg p-2 text-sm text-gray-500 font-semibold"
    >
      <option>Pendiente</option>
      <option>Pedido al proveedor</option>
      <option>Listo para retirar</option>
      <option>Entregado</option>
    </select>
  );
}