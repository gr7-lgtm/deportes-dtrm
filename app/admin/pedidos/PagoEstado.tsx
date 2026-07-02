"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PagoEstado({
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
        estado_pago: nuevoEstado,
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
      <option>Señado</option>
      <option>Pagado</option>
      <option>Reembolsado</option>
    </select>
  );
}