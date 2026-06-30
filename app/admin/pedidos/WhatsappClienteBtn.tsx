"use client";

export default function WhatsappClienteBtn({
  telefono,
  nombre,
  estado,
}: {
  telefono: string;
  nombre: string;
  estado: string;
}) {

  function abrirWhatsapp() {

    const numero = telefono.replace(/\D/g, "");

    const mensaje = `Hola ${nombre}.

Tu pedido en DTRM Deportes se encuentra en estado:

${estado}

Gracias por tu compra.`;

    const url =
      `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  }

  return (
    <button
      onClick={abrirWhatsapp}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
    >
      📲 Cliente
    </button>
  );
}