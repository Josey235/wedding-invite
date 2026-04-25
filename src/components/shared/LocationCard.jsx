import { MapPin } from "lucide-react"; // if not installed, tell me

function LocationCard({ event, theme = "communion" }) {
  const isCommunion = theme === "communion";

  return (
    <div
      className={`
        -mt-8 sm:-mt-6   /* 🔥 GAP FIX */
        ${isCommunion 
          ? "bg-[#fdfaf4] border border-[#f1e4c8]" 
          : "bg-white"}
        rounded-2xl shadow-xl 
        px-6 py-8
        text-center
        transition-all duration-500
        hover:shadow-2xl hover:-translate-y-1
      `}
    >

      {/* TITLE */}
      <h3 className="text-lg font-heading tracking-wide text-gray-800">
        Ceremony
      </h3>

      {/* LOCATION TEXT */}
      <p className="text-sm text-gray-500 mt-1">
        {event?.location}
      </p>

      {/* PREMIUM DIVIDER */}
      <div className="flex items-center justify-center gap-3 my-4">
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent"></span>
        <span className="text-[#c89b3c] text-sm">✦</span>
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent"></span>
      </div>

      {/* BUTTON */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event?.location)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          flex items-center justify-center gap-2
          w-full py-3 rounded-full border
          font-medium text-sm
          transition-all duration-300
          ${
            isCommunion
              ? "border-[#c89b3c] text-[#c89b3c] hover:bg-[#f6f0e4]"
              : "border-red-400 text-red-500 hover:bg-red-50"
          }
          hover:scale-[1.02] active:scale-95
        `}
      >
        <MapPin className="w-4 h-4" />
        Get Directions
      </a>

    </div>
  );
}

export default LocationCard;