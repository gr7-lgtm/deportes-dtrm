"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditarProveedorForm({
  proveedor,
}: {
  proveedor: any;
}) {

  const router = useRouter();

  const [nombre, setNombre] = useState(
    proveedor.nombre
  );

  const [telefono, setTelefono] = useState(
    proveedor.telefono || ""
  );

  const [guardando, setGuardando] = useState(false);

  async function guardarCambios() {
    try {

      setGuardando(true);

      const { error } = await supabase
        .from("proveedores")
        .update({
          nombre,
          telefono,
        })
        .eq("id", proveedor.id);

      if (error) throw error;

      alert("Proveedor actualizado");

      router.refresh();

    } catch (error) {

      console.error(error);
      alert("Error al guardar");

    } finally {

      setGuardando(false);

    }
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Editar Proveedor
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <input
          type="text"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          className="w-full border rounded-lg p-3 text-gray-700"
        />

        <input
          type="text"
          value={telefono}
          onChange={(e) =>
            setTelefono(e.target.value)
          }
          className="w-full border rounded-lg p-3 text-gray-700"
        />

        <button
          onClick={guardarCambios}
          disabled={guardando}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
        >
          {guardando
            ? "Guardando..."
            : "Guardar Cambios"}
        </button>

      </div>

    </div>
  );
}