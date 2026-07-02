"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MontoPagado({
  pedidoId,
  montoInicial,
}: {
  pedidoId: number;
  montoInicial: number;
}) {
  const [monto, setMonto] =
    useState(montoInicial);

  async function guardar() {
    await supabase
      .from("pedidos")
      .update({
        monto_pagado: monto,
      })
      .eq("id", pedidoId);
  }

  return (
    <input
      type="number"
      value={monto}
      onChange={(e) =>
        setMonto(Number(e.target.value))
      }
      onBlur={guardar}
      className="
        w-24
        border
        rounded-lg
        p-2
        text-right
        text-green-600
        font-bold
      "
    />
  );
}