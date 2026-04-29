import { MapPin } from "lucide-react";

function LocationCard({ event, theme = "wedding" }) {
  const isWedding = theme === "wedding";

  const locationQuery =
    event?.location ||
    event?.venue ||
    event?.address ||
    "";

  return (
    <div
      className={`
        -mt-8 sm:-mt-10
        ${
          isWedding
            ? "bg-gradient-to-br from-[#faf7f2] via-[#fdfaf6] to-[#f5efe6] border border-[#e8ded0]"
            : "bg-white"
        }
        rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        px-6 py-8
        text-center
        transition-all duration-500
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1
      `}
    >

      <h3 className="text-lg font-heading tracking-wide text-[#3e3e3e]">
        Ceremony
      </h3>

      <p className="text-sm text-[#7a7a7a] mt-1">
        {locationQuery || "Location will be updated soon"}
      </p>

      <div className="flex items-center justify-center gap-3 my-4">
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#c8a96a] to-transparent"></span>
        <span className="text-[#c8a96a] text-sm">✦</span>
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#c8a96a] to-transparent"></span>
      </div>

      <a
        href={
          locationQuery
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
        className={`
          flex items-center justify-center gap-2
          w-full py-3 rounded-full border
          font-medium text-sm
          transition-all duration-300
          ${
            isWedding
              ? "border-[#d6c3a3] text-[#5a4a2f] bg-white/60 backdrop-blur-sm hover:bg-[#f3ede4]"
              : "border-gray-300 text-gray-600"
          }
          hover:scale-[1.02]
          ${!locationQuery && "opacity-50 pointer-events-none"}
        `}
      >
        <MapPin className="w-4 h-4" />
        Get Directions
      </a>

    </div>
  );
}

export default LocationCard;