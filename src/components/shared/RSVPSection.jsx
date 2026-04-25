import { useState } from "react";
import { supabase } from "../../supabase";

function RSVPSection({ invite, setInvite, theme = "communion" }) {
  const [status, setStatus] = useState(invite.rsvp);
  const [guests, setGuests] = useState(invite.guest_count || 1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isCommunion = theme === "communion";

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
        -mt-10 sm:-mt-4  /* 🔥 GAP FIX */
        ${isCommunion ? "bg-[#fdfaf4] border border-[#f1e4c8]" : "bg-white"}
        rounded-2xl shadow-xl 
        px-5 sm:px-8 
        py-7 sm:py-9 
        space-y-5
        transition-all duration-500
        hover:shadow-2xl
      `}
    >

      <h2 className="uppercase tracking-widest text-xs text-center text-[#c89b3c]">
        Will you attend?
      </h2>

      {success && (
        <div className="text-center text-sm text-green-600 animate-fadeIn">
          ✔ Response saved successfully
        </div>
      )}

      <button
        onClick={() => setStatus("attending")}
        className={`
          w-full py-3 rounded-full border-2 
          transition-all duration-300 
          font-medium
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "attending"
              ? "border-[#c89b3c] text-[#c89b3c] shadow-md"
              : "border-[#e5d7b5] text-gray-600 hover:border-[#c89b3c]"
          }
        `}
      >
        ✔ Yes, with joy!
      </button>

      <button
        onClick={() => setStatus("declined")}
        className={`
          w-full py-3 rounded-full border-2 
          transition-all duration-300 
          font-medium
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "declined"
              ? "border-[#c89b3c] text-[#c89b3c]"
              : "border-[#e5d7b5] text-gray-400 hover:border-[#c89b3c]"
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
              className="w-10 h-10 rounded-full border border-[#e5d7b5]
                         text-lg transition hover:scale-110 active:scale-90"
            >
              −
            </button>

            <span className="text-xl font-semibold">{guests}</span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-10 h-10 rounded-full border border-[#e5d7b5]
                         text-lg transition hover:scale-110 active:scale-90"
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
              transition-all duration-300
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#c89b3c] text-white hover:shadow-lg hover:-translate-y-0.5"
              }
            `}
          >
            {loading ? "Saving..." : "Confirm Attendance"}
          </button>

        </div>
      )}

      {status === "declined" && (
        <div className="bg-[#faf6ee] border-l-4 border-[#c89b3c]
                        p-5 rounded-xl space-y-4 animate-fadeIn">

          <h3 className="text-lg text-gray-700 text-center">
            We’ll Miss You 💔
          </h3>

          <p className="text-sm text-gray-500 italic text-center">
            Though you won’t be with us in person, you’ll be in our hearts.
          </p>

          <button
            onClick={() => updateRSVP("declined")}
            disabled={loading}
            className={`
              w-full py-3 rounded-full 
              border border-[#c89b3c] text-[#c89b3c]
              transition-all duration-300
              ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#f6f0e4]"
              }
            `}
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