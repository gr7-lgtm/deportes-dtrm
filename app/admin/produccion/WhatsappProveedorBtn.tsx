"use client";

export default function WhatsappProveedorBtn({
  telefono,
  texto,
}: {
  telefono: string;
  texto: string;
}) {
  function abrirWhatsapp() {

    const numero = telefono.replace(/\D/g, "");

    const url =
      `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  }

  return (
    <button
      onClick={abrirWhatsapp}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      📲 WhatsApp
    </button>
  );
}