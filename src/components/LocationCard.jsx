import { MapPin } from "lucide-react";

function LocationCard() {
  return (
    <div className="card space-y-4">

      <h2 className="text-lg font-heading text-gray-700">
        Wedding Ceremony
      </h2>

      <p className="text-gray-500 text-sm leading-relaxed">
        Lourde Matha Church <br />
        Mammood, Kerala
      </p>

      <div className="w-2 h-2 bg-gray-300 rounded-full mx-auto" />

      <a
        href="https://www.google.com/maps/search/?api=1&query=Lourde+Matha+Church+Mammood"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium"
      >
        <MapPin size={18} />
        Get Directions
      </a>

    </div>
  );
}

export default LocationCard;