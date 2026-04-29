import { useState } from "react";
import { supabase } from "../../supabase";

function RSVPSection({ invite, setInvite, theme = "wedding" }) {
  const [status, setStatus] = useState(invite.rsvp);
  const [guests, setGuests] = useState(invite.guest_count || 1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isWedding = theme === "wedding";

  async function updateRSVP(newStatus) {
    setLoading(true);
    setSuccess(false);

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
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }

    setLoading(false);
  }

  return (
    <div
      className={`
        -mt-10 sm:-mt-12
        ${isWedding ? "bg-[#fff5f5] border border-[#fecaca]" : "bg-white"}
        rounded-2xl shadow-xl 
        px-5 sm:px-8 
        py-7 sm:py-9 
        space-y-5
        transition-all duration-500
        hover:shadow-2xl
      `}
    >

      <h2 className="uppercase tracking-widest text-xs text-center text-[#dc2626]">
        Will you attend?
      </h2>

      {success && (
        <div className="text-center text-sm text-green-600 animate-fadeIn">
          ✔ Response saved successfully
        </div>
      )}

      {/* YES */}
      <button
        onClick={() => setStatus("attending")}
        className={`
          w-full py-3 rounded-full border-2 
          transition-all duration-300 
          font-medium
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "attending"
              ? "border-[#dc2626] text-[#dc2626] shadow-md"
              : "border-[#fecaca] text-gray-600 hover:border-[#dc2626]"
          }
        `}
      >
        ✔ Yes, with joy!
      </button>

      {/* NO */}
      <button
        onClick={() => setStatus("declined")}
        className={`
          w-full py-3 rounded-full border-2 
          transition-all duration-300 
          font-medium
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "declined"
              ? "border-[#dc2626] text-[#dc2626]"
              : "border-[#fecaca] text-gray-400 hover:border-[#dc2626]"
          }
        `}
      >
        ✖ Sorry, I can’t make it
      </button>

      {status === "attending" && (
        <div className="space-y-4 animate-fadeIn">

          <p className="text-sm text-gray-500 text-center">
            Number of guests
          </p>

          <div className="flex justify-center items-center gap-4">

            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 rounded-full border border-[#fecaca] text-lg"
            >
              −
            </button>

            <span className="text-xl font-semibold">{guests}</span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-10 h-10 rounded-full border border-[#fecaca] text-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={() => updateRSVP("attending")}
            disabled={loading}
            className={`
              w-full py-3 rounded-full 
              font-medium tracking-wide
              ${
                loading
                  ? "bg-gray-300"
                  : "bg-[#dc2626] text-white hover:shadow-lg"
              }
            `}
          >
            {loading ? "Saving..." : "Confirm Attendance"}
          </button>

        </div>
      )}

      {status === "declined" && (
        <div className="bg-[#fff5f5] border-l-4 border-[#dc2626] p-5 rounded-xl space-y-4 animate-fadeIn">

          <h3 className="text-lg text-gray-700 text-center">
            We’ll Miss You 💔
          </h3>

          <p className="text-sm text-gray-500 italic text-center">
            Though you won’t be with us in person, you’ll be in our hearts.
          </p>

          <button
            onClick={() => updateRSVP("declined")}
            disabled={loading}
            className="w-full py-3 rounded-full border border-[#dc2626] text-[#dc2626]"
          >
            {loading ? "Saving..." : "Confirm Response"}
          </button>

          <button
            onClick={() => setStatus(null)}
            className="w-full text-sm text-gray-400 underline text-center"
          >
            Change my mind — I’ll attend
          </button>
        </div>
      )}
    </div>
  );
}

export default RSVPSection;