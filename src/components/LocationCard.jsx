function LocationCard() {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2>Wedding Ceremony</h2>
      <p>Lourde Matha Church, Mammood</p>

      <button
        onClick={() =>
          window.open(
            "https://share.google/qwiRgbNazu3n3ktzk",
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