import { useState } from "react";
import { supabase } from "../../supabase";

function CommunionRSVPSection({ invite, setInvite }) {
  const [status, setStatus] = useState(invite.rsvp);
  const [guests, setGuests] = useState(invite.guest_count || 1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      className="
        mt-0
        bg-gradient-to-br from-[#faf7f2] via-[#fdfaf6] to-[#f5efe6]
        border border-[#e8ded0]
        rounded-3xl
        shadow-[0_15px_50px_rgba(0,0,0,0.06)]
        px-6 sm:px-10
        py-8 sm:py-10
        space-y-6
        transition-all duration-500
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)]
      "
    >

      <h2 className="uppercase tracking-[0.25em] text-xs text-center text-[#bfa46f]">
        WILL YOU ATTEND?
      </h2>

      {success && (
        <div className="text-center text-sm text-[#6b8e23] animate-fadeIn">
          ✔ Response saved successfully
        </div>
      )}

      {/* YES */}
      <button
        onClick={() => setStatus("attending")}
        className={`
          w-full py-3 rounded-full border
          transition-all duration-300
          font-medium
          backdrop-blur-sm
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "attending"
              ? "border-[#c8a96a] text-[#5a4a2f] bg-white/70 shadow-sm"
              : "border-[#e8ded0] text-[#6b6b6b] hover:border-[#c8a96a]"
          }
        `}
      >
        ✔ Yes, with joy!
      </button>

      {/* NO */}
      <button
        onClick={() => setStatus("declined")}
        className={`
          w-full py-3 rounded-full border
          transition-all duration-300
          font-medium
          backdrop-blur-sm
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "declined"
              ? "border-[#c8a96a] text-[#5a4a2f]"
              : "border-[#e8ded0] text-gray-400 hover:border-[#c8a96a]"
          }
        `}
      >
        ✖ Sorry, I can’t make it
      </button>

      {status === "attending" && (
        <div className="space-y-4 animate-fadeIn">

          <p className="text-sm text-[#7a7a7a] text-center">
            Number of guests
          </p>

          <div className="flex justify-center items-center gap-4">

            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 rounded-full border border-[#e8ded0] text-lg text-[#5a4a2f]"
            >
              −
            </button>

            <span className="text-xl font-semibold text-[#3e3e3e]">
              {guests}
            </span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-10 h-10 rounded-full border border-[#e8ded0] text-lg text-[#5a4a2f]"
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
                  : "bg-[#c8a96a] text-white hover:shadow-md"
              }
            `}
          >
            {loading ? "Saving..." : "Confirm Attendance"}
          </button>

        </div>
      )}

      {status === "declined" && (
        <div className="bg-white/70 backdrop-blur-md border border-[#e8ded0] p-5 rounded-2xl space-y-4 animate-fadeIn">

          <h3 className="text-lg text-[#3e3e3e] text-center">
            We’ll Miss You 💔
          </h3>

          <p className="text-sm text-[#7a7a7a] italic text-center">
            Thank you for letting us know. Though you won’t be with us in person,
            you’ll be in our hearts as we celebrate this special day.
          </p>

          <button
            onClick={() => updateRSVP("declined")}
            disabled={loading}
            className="w-full py-3 rounded-full border border-[#c8a96a] text-[#5a4a2f]"
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

export default CommunionRSVPSection;