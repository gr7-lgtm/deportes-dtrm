import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const preference = new Preference(client);

    console.log(
  "SITE_URL:",
  process.env.NEXT_PUBLIC_SITE_URL
);

console.log(
  `${process.env.NEXT_PUBLIC_SITE_URL}/pago/exitoso`
);

    const result = await preference.create({
      body: {
        items: [
          {
            id: String(body.pedidoId),
            title: body.titulo,
            quantity: Number(body.cantidad),
            unit_price: Number(body.precio),
            currency_id: "ARS",
          },
        ],

        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/pago/exitoso`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/pago/error`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pago/pendiente`,
        },

        auto_return: "approved",

        external_reference: String(
          body.pedidoId
        ),

        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error creando preferencia",
      },
      {
        status: 500,
      }
    );
  }
}