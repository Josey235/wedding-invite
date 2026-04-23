function LocationCard() {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2>Wedding Ceremony</h2>
      <p>St. Mary's Church, Kochi</p>

      <button
        onClick={() =>
          window.open(
            "https://maps.google.com/?q=St Marys Church Kochi",
            "_blank"
          )
        }
      >
        View Location
      </button>
    </div>
  );
}

export default LocationCard;