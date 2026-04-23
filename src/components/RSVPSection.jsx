import { useState } from "react";
import { supabase } from "../supabase";

function RSVPSection({ guest, slug }) {
  const [step, setStep] = useState(
    guest.rsvp && guest.rsvp !== "pending" ? 3 : 1
  );

  const [response, setResponse] = useState(null);
  const [guests, setGuests] = useState(guest.guest_count || 1);

  const submit = async () => {
    const status = response === "yes" ? "attending" : "declined";

    await supabase
      .from("invitees")
      .update({
        rsvp: status,
        guest_count: status === "attending" ? guests : 0,
        responded_at: new Date(),
      })
      .eq("slug", slug);

    setStep(3);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-pink-100 w-full max-w-md text-center">

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h2 className="text-lg font-semibold text-pink-700">
            Will you be joining us?
          </h2>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                setResponse("yes");
                setStep(2);
              }}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Yes 🎉
            </button>

            <button
              onClick={() => {
                setResponse("no");
                submit();
              }}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold transition"
            >
              No 😔
            </button>
          </div>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="text-lg font-semibold text-pink-700">
            How many guests will attend?
          </h2>

          <div className="flex items-center justify-center gap-6 mt-5">

            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="bg-gray-200 px-4 py-2 rounded-lg text-lg"
            >
              -
            </button>

            <span className="text-2xl font-bold text-pink-600">
              {guests}
            </span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="bg-gray-200 px-4 py-2 rounded-lg text-lg"
            >
              +
            </button>

          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-300 py-2 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={submit}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold"
            >
              Confirm
            </button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          {guest.rsvp === "attending" || response === "yes" ? (
            <p className="text-green-600 font-semibold text-lg">
              🎉 You're confirmed!
              <br />
              Guests: {guests}
            </p>
          ) : (
            <p className="text-gray-600 font-medium">
              😔 Sorry you can’t make it.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default RSVPSection;