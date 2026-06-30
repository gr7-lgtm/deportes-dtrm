import { supabase } from "@/lib/supabase";
import EditarProveedorForm from "./EditarProveedorForm";

export default async function ProveedorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const { data: proveedor } = await supabase
    .from("proveedores")
    .select("*")
    .eq("id", id)
    .single();

  if (!proveedor) {
    return (
      <div className="p-6">
        Proveedor no encontrado
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <EditarProveedorForm proveedor={proveedor} />
    </div>
  );
}