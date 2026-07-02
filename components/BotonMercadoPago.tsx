"use client";

import { CreditCard } from "lucide-react";

export default function BotonMercadoPago({
  pedidoId,
  titulo,
  precio,
}: {
  pedidoId: number;
  titulo: string;
  precio: number;
}) {
  async function pagar() {

     console.log("CLICK MP");
    const res = await fetch("/api/mercadopago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pedidoId,
        titulo,
        precio,
        cantidad: 1,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.init_point) {
      window.location.href = data.init_point;
    }
  }

 return (
  <button
    onClick={pagar}
    className="bg-blue-500 hover:bg-blue-600 rounded-lg h-11 flex items-center
      justify-center transition w-full"
  >
    <img
      src="/logo-mp.png"
      alt="Mercado Pago"
      className="h-12"
    />
<p >Mercado Pago</p>


  </button>
);}