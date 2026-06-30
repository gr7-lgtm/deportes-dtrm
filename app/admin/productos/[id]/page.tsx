import { supabase } from "@/lib/supabase";
import EditarProductoForm from "./EditarProductoForm";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: producto } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <EditarProductoForm producto={producto} />
    </div>
  );
}