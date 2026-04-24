import { MapPin } from "lucide-react";

function LocationCard() {
  const locationUrl =
    "https://www.google.com/maps?q=Lourde+Matha+Church+Mammod";

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-card p-6 w-full max-w-md text-center space-y-4">

      {/* Title */}
      <h2 className="font-heading text-lg text-gray-700">
        Wedding Ceremony
      </h2>

      {/* Location Name */}
      <p className="text-sm text-gray-500 leading-relaxed">
        Lourde Matha Church <br />
        Mammod, Kerala
      </p>

      {/* Divider Dot */}
      <div className="flex justify-center">
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Button */}
      <a
        href={locationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border border-primary text-primary py-3 rounded-full transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <MapPin size={18} />
        Get Directions
      </a>

    </div>
  );
}

export default LocationCard;