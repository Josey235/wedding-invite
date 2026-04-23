import { useState } from "react";

export default function RSVPSection({ invite, onSubmit }) {
  const [guestCount, setGuestCount] = useState(1);
  const [selected, setSelected] = useState(invite.rsvp);

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
    <div className="card">
      <h3 style={{ textAlign: "center", color: "red" }}>
        Will you be joining us?
      </h3>

      {/* YES / NO */}
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button
          style={{ flex: 1, background: "green", color: "white" }}
          onClick={handleYes}
        >
          Yes 🎉
        </button>

        <button
          style={{ flex: 1, background: "gray", color: "white" }}
          onClick={handleNo}
        >
          No 😔
        </button>
      </div>

      {/* SHOW GUEST COUNT ONLY AFTER YES */}
      {selected === "attending" && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p>Select number of guests</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setGuestCount(n)}
                style={{
                  background: guestCount === n ? "red" : "#eee",
                  color: guestCount === n ? "white" : "black",
                }}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              width: "100%",
            }}
            onClick={confirmGuests}
          >
            Confirm RSVP
          </button>
        </div>
      )}

      {/* RESPONSE MESSAGE */}
      {invite.rsvp && (
        <p style={{ marginTop: "10px", color: "green", textAlign: "center" }}>
          ✅ Response recorded
        </p>
      )}
    </div>
  );
}