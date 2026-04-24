import { MapPin } from "lucide-react";

function LocationCard({ event }) {
  if (!event) return null;

  return (
    <div className="card">

      <h2 className="text-xl font-heading text-gray-700 mb-2">
        Ceremony
      </h2>

      <p className="text-gray-600">
        {event.venue}
      </p>

      <a
        href={event.location_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition"
      >
        📍 Get Directions
      </a>

    </div>
  );
}

export default LocationCard;