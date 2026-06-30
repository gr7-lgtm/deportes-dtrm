"use client";

export default function CopiarPedidoBtn({
  texto,
}: {
  texto: string;
}) {

  async function copiar() {
    await navigator.clipboard.writeText(texto);

    alert("Pedido copiado");
  }

  return (
    <button
      onClick={copiar}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      📋 Copiar Pedido
    </button>
  );
}