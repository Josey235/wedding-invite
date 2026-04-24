import { useState } from "react";
import { supabase } from "../supabase";

function RSVPSection({ invite, setInvite }) {
  const [status, setStatus] = useState(invite.rsvp);
  const [guests, setGuests] = useState(invite.guest_count || 1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ NEW

  async function updateRSVP(newStatus) {
    setLoading(true);

    const { data, error } = await supabase
      .from("invitees")
      .update({
        rsvp: newStatus,
        guest_count: newStatus === "attending" ? guests : 0,
      })
      .eq("id", invite.id)
      .select()
      .single();

    if (!error) {
      setInvite(data);
      setStatus(newStatus);
      setSubmitted(true); // ✅ THIS WAS MISSING
    } else {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 w-full max-w-md text-center space-y-6">

      <h2 className="uppercase tracking-widest text-sm text-gray-400">
        Will you attend?
      </h2>

      {/* ✅ AFTER SUBMIT SHOW RESULT */}
      {submitted && (
        <div className="text-green-600 font-medium text-sm">
          ✅ Response recorded successfully
        </div>
      )}

      {/* YES BUTTON */}
      <button
        onClick={() => setStatus("attending")}
        disabled={submitted}
        className={`w-full py-4 rounded-full border-2 transition-all duration-300
        ${
          status === "attending"
            ? "border-primary text-primary"
            : "border-gray-200 text-gray-600 hover:border-primary"
        }`}
      >
        ✔ Yes, with joy!
      </button>

      {/* NO BUTTON */}
      <button
        onClick={() => setStatus("declined")}
        disabled={submitted}
        className={`w-full py-4 rounded-full border-2 transition-all duration-300
        ${
          status === "declined"
            ? "border-red-400 text-red-400"
            : "border-gray-200 text-gray-400 hover:border-red-400"
        }`}
      >
        ✖ Sorry, I can’t make it
      </button>

      {/* YES FLOW */}
      {status === "attending" && !submitted && (
        <div className="space-y-4 animate-fadeIn">

          <p className="text-sm text-gray-500">
            Number of guests
          </p>

          <div className="flex justify-center items-center gap-4">
            
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 rounded-full border text-lg"
            >
              −
            </button>

            <span className="text-xl font-semibold">{guests}</span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-10 h-10 rounded-full border text-lg"
            >
              +
            </button>

          </div>

          <button
            onClick={() => updateRSVP("attending")}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-full mt-2 hover:opacity-90"
          >
            {loading ? "Saving..." : "Confirm Attendance"}
          </button>

        </div>
      )}

      {/* NO FLOW */}
      {status === "declined" && !submitted && (
        <div className="bg-red-50 border-l-4 border-red-300 p-4 rounded-lg text-left space-y-4 animate-fadeIn">

          <h3 className="text-lg font-heading text-gray-700 text-center">
            We’ll Miss You 💔
          </h3>

          <p className="text-sm text-gray-500 italic">
            Thank you for letting us know.  
            Though you won’t be with us in person, you’ll be in our hearts as we celebrate this special day.
          </p>

          <button
            onClick={() => updateRSVP("declined")}
            disabled={loading}
            className="w-full border border-red-400 text-red-500 py-3 rounded-full hover:bg-red-50"
          >
            {loading ? "Saving..." : "Confirm Response"}
          </button>

          <button
            onClick={() => setStatus(null)}
            className="w-full text-sm text-gray-400 underline"
          >
            Change my mind — I’ll attend
          </button>

        </div>
      )}

    </div>
  );
}

export default RSVPSection;