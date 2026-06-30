"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditarProductoForm({
  producto,
}: {
  producto: any;
}) {
  const router = useRouter();

  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [precio, setPrecio] = useState(producto.precio);
  const [categoria, setCategoria] = useState(producto.categoria);
  const [activo, setActivo] = useState(producto.activo);
  const [proveedorId, setProveedorId] = useState(
  String(producto.proveedor_id || "")
);

const [proveedores, setProveedores] = useState<any[]>([]);
const [imagen, setImagen] = useState<File | null>(null);

useEffect(() => {
  async function cargarProveedores() {

    const { data } = await supabase
      .from("proveedores")
      .select("*")
      .order("nombre");

    setProveedores(data || []);
  }

  cargarProveedores();
}, []);

  async function guardarCambios() {

  let urlImagen = producto.imagen;

  if (imagen) {

    const nombreArchivo =
      `${Date.now()}-${imagen.name}`;

    const { error: uploadError } =
      await supabase.storage
        .from("Productos")
        .upload(nombreArchivo, imagen);

    if (uploadError) {
      console.error(uploadError);
      alert("Error al subir imagen");
      return;
    }

    const { data } = supabase.storage
      .from("Productos")
      .getPublicUrl(nombreArchivo);

    urlImagen = data.publicUrl;
  }

  const { error } = await supabase
    .from("productos")
    .update({
      nombre,
      descripcion,
      precio,
      categoria,
      proveedor_id: Number(proveedorId),
      imagen: urlImagen,
      activo,
    })
    .eq("id", producto.id);

  if (error) {
    console.error(error);
    alert("Error al guardar");
    return;
  }

  alert("Producto actualizado");

  router.refresh();
}

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">

      <h1 className="text-3xl font-bold text-gray-800">
        Editar Producto
      </h1>
      {producto.imagen && (
  <img
    src={producto.imagen}
    alt={producto.nombre}
    className="w-48 h-48 object-contain border rounded-lg"
  />
)}


      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border rounded-lg p-3 text-gray-700"
      />

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={4}
        className="w-full border rounded-lg p-3 text-gray-700"
      />

      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        className="w-full border rounded-lg p-3 text-gray-700"
      />

      <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full border rounded-lg p-3 text-gray-700"
      />

      <select
  value={proveedorId}
  onChange={(e) =>
    setProveedorId(e.target.value)
  }
  className="w-full border rounded-lg p-3 text-gray-700"
>
  <option value="">
    Seleccionar proveedor
  </option>
  

  {proveedores.map((proveedor) => (
    <option
      key={proveedor.id}
      value={String(proveedor.id)}
    >
      {proveedor.nombre}
    </option>
  ))}
</select>
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImagen(e.target.files?.[0] || null)
  }
  className="w-full border rounded-lg p-3 text-gray-700"
/>

      <label className="flex items-center gap-3 text-gray-700 font-semibold">
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => setActivo(e.target.checked)}
        />
        Producto activo
      </label>

      <button
        onClick={guardarCambios}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg"
      >
        Guardar Cambios
      </button>

    </div>
  );
}