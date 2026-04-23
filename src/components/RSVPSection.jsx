import { useState } from "react";

export default function RSVPSection({ invite, onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [guestCount, setGuestCount] = useState(1);

  function handleYes() {
    setSelected("attending");
  }

  function handleNo() {
    setSelected("declined");
    onSubmit("declined", 0);
  }

  function confirmGuests() {
    onSubmit("attending", guestCount);
  }

  return (
    <div className="bg-white p-5 rounded shadow mt-4 text-center">

      <h3 className="text-pink-600 font-semibold text-lg">
        Will you be joining us?
      </h3>

      {/* YES / NO BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button
          className="flex-1 bg-green-500 text-white py-2 rounded"
          onClick={handleYes}
        >
          Yes 🎉
        </button>

        <button
          className="flex-1 bg-gray-400 text-white py-2 rounded"
          onClick={handleNo}
        >
          No 😔
        </button>
      </div>

      {/* 👇 ONLY SHOW AFTER YES */}
      {selected === "attending" && (
        <div className="mt-4">

          <p className="text-gray-600 mb-2">
            Number of guests
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setGuestCount(num)}
                className={`px-3 py-1 rounded ${
                  guestCount === num
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={confirmGuests}
            className="mt-3 bg-pink-600 text-white px-4 py-2 rounded w-full"
          >
            Confirm RSVP
          </button>

        </div>
      )}

      {/* RESPONSE MESSAGE */}
      {invite.rsvp && (
        <p className="text-green-600 mt-3">
          ✅ Response recorded
        </p>
      )}

    </div>
  );
}