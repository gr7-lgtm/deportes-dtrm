import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappFlotante() {
  return (
    <a
      href="https://wa.me/5492317401400?text=Hola%20quiero%20consultar%20por%20indumentaria%20DTRM"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-6
        right-6
        bg-green-500
        hover:bg-green-600
        text-white
        rounded-full
        w-12
        h-12
        flex
        items-center
        justify-center
        shadow-2xl
        z-50
      "
    >
      <FaWhatsapp size={27} />
    </a>
  );
}