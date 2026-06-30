"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NuevoProveedorPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function guardarProveedor() {
    try {
      setGuardando(true);

      const { error } = await supabase
        .from("proveedores")
        .insert({
          nombre,
          telefono,
        });

      if (error) throw error;

      alert("Proveedor creado");

      router.push("/admin/proveedores");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Nuevo Proveedor
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded-lg p-3 text-gray-700"
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full border rounded-lg p-3 text-gray-700"
        />

        <button
          onClick={guardarProveedor}
          disabled={guardando}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>

      </div>

    </div>
  );
}