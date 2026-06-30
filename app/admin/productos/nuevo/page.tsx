"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NuevoProductoPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedorId, setProveedorId] = useState("");
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [imagen, setImagen] = useState<File | null>(null);
  const [guardando, setGuardando] = useState(false);

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

  async function guardarProducto() {
    try {
      setGuardando(true);

      let urlImagen = null;

      if (imagen) {
        const nombreArchivo = `${Date.now()}-${imagen.name}`;

        const { error: uploadError } = await supabase.storage
          .from("Productos")
          .upload(nombreArchivo, imagen);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("Productos")
          .getPublicUrl(nombreArchivo);

        urlImagen = data.publicUrl;
      }

      const { data: nuevoProducto, error } = await supabase
  .from("productos")
  .insert({
    nombre,
    descripcion,
    precio: Number(precio),
    categoria,
    proveedor_id: Number(proveedorId),
    imagen: urlImagen,
    activo: true,
  })
  .select()
  .single();

if (error) throw error;

const { error: tallesError } = await supabase
  .from("talles")
  .insert([
    { producto_id: nuevoProducto.id, talle: "S", stock: 0 },
    { producto_id: nuevoProducto.id, talle: "M", stock: 0 },
    { producto_id: nuevoProducto.id, talle: "L", stock: 0 },
    { producto_id: nuevoProducto.id, talle: "XL", stock: 0 },
    { producto_id: nuevoProducto.id, talle: "XXL", stock: 0 },
  ]);

if (tallesError) {
  console.log(tallesError);
  throw tallesError;
}

      alert("Producto guardado correctamente");

      router.push("/admin/productos");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    } finally {
      setGuardando(false);
    }
  }


  return (
    <div className="max-w-3xl mx-auto p-6">

  <h1 className="text-3xl font-bold mb-6">
    Nuevo Producto
  </h1>

  <div className="bg-white rounded-xl shadow p-6 space-y-4">

    <input
      type="text"
      placeholder="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="w-full border font-semibold text-gray-400 rounded-lg p-3"
    />

    <textarea
      placeholder="Descripción"
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
      className="w-full border font-semibold text-gray-400 rounded-lg p-3"
    />

    <input
      type="number"
      placeholder="Precio"
      value={precio}
      onChange={(e) => setPrecio(e.target.value)}
      className="w-full border font-semibold text-gray-400 rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Categoría"
      value={categoria}
      onChange={(e) => setCategoria(e.target.value)}
      className="w-full border font-semibold text-gray-400 rounded-lg p-3"
    />

    <select
      value={proveedorId}
      onChange={(e) => setProveedorId(e.target.value)}
      className="w-full border font-semibold text-gray-700 rounded-lg p-3"
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
      className="w-full border font-semibold text-gray-400 rounded-lg p-3"
    />

    <button
      onClick={guardarProducto}
      disabled={guardando}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
    >
      {guardando ? "Guardando..." : "Guardar Producto"}
    </button>

  </div>

</div>
  );}