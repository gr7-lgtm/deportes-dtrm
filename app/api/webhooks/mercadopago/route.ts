import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { supabase } from "@/lib/supabase";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Webhook recibido:", body);

    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id;

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const payment = new Payment(client);

    const paymentInfo = await payment.get({
      id: paymentId,
    });

    const pedidoId = paymentInfo.external_reference;

    if (!pedidoId) {
      return NextResponse.json({ ok: true });
    }

    if (paymentInfo.status === "approved") {
      const montoPagado = Number(paymentInfo.transaction_amount);

      const { data: pedido } = await supabase
        .from("pedidos")
        .select("total")
        .eq("id", pedidoId)
        .single();

      if (!pedido) {
        return NextResponse.json({ ok: false });
      }

      const saldo =
        Number(pedido.total) - montoPagado;

      await supabase
        .from("pedidos")
        .update({
          estado_pago:
            saldo <= 0 ? "Pagado" : "Parcial",
          monto_pagado: montoPagado,
          saldo: Math.max(0, saldo),
        })
        .eq("id", pedidoId);

      console.log(
        `Pedido ${pedidoId} actualizado`
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}