"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PagoEstado({
  pedidoId,
  estadoInicial,
  total,
}: {
  pedidoId: number;
  estadoInicial: string;
  total: number;
})
 {
  const [estado, setEstado] = useState(estadoInicial);

 async function cambiarEstado(
  nuevoEstado: string
) {

  let actualizacion: any = {
    estado_pago: nuevoEstado,
  };

  if (nuevoEstado === "Señado") {

    const monto = prompt(
      "Ingrese el monto de la seña"
    );

    if (monto) {

      actualizacion.monto_pagado =
        Number(monto);

      actualizacion.sena =
        Number(monto);

      actualizacion.saldo =
        total - Number(monto);

    }

  }

  setEstado(nuevoEstado);

  await supabase
    .from("pedidos")
    .update(actualizacion)
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