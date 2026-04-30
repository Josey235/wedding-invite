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
        -mt-2 sm:-mt-4
        bg-gradient-to-br from-[#f8fbff] via-[#f1f6fb] to-[#eef4fa]
        border border-[#dbe7f3]
        rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        px-5 sm:px-8
        py-7 sm:py-9
        space-y-5
        transition-all duration-500
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
      "
    >

      <h2 className="uppercase tracking-[0.2em] text-xs text-center text-[#5b7fa3]">
        Your Presence Matters
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
          w-full py-3 rounded-full border
          transition-all duration-300
          font-medium
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "attending"
              ? "border-[#5b7fa3] text-[#5b7fa3] shadow-sm bg-white"
              : "border-[#dbe7f3] text-gray-600 hover:border-[#5b7fa3]"
          }
        `}
      >
        ✨ Joyfully attending
      </button>

      {/* NO */}
      <button
        onClick={() => setStatus("declined")}
        className={`
          w-full py-3 rounded-full border
          transition-all duration-300
          font-medium
          transform hover:scale-[1.02] active:scale-95
          ${
            status === "declined"
              ? "border-[#5b7fa3] text-[#5b7fa3]"
              : "border-[#dbe7f3] text-gray-400 hover:border-[#5b7fa3]"
          }
        `}
      >
        🙏 Unable to attend
      </button>

      {status === "attending" && (
        <div className="space-y-4 animate-fadeIn">

          <p className="text-sm text-gray-500 text-center">
            Number of guests
          </p>

          <div className="flex justify-center items-center gap-4">

            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 rounded-full border border-[#dbe7f3] text-lg"
            >
              −
            </button>

            <span className="text-xl font-semibold">{guests}</span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-10 h-10 rounded-full border border-[#dbe7f3] text-lg"
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
                  : "bg-[#5b7fa3] text-white hover:shadow-md"
              }
            `}
          >
            {loading ? "Saving..." : "Confirm Attendance"}
          </button>

        </div>
      )}

      {status === "declined" && (
        <div className="bg-white border border-[#dbe7f3] p-5 rounded-xl space-y-4 animate-fadeIn">

          <h3 className="text-lg text-gray-700 text-center">
            You’ll Be Missed
          </h3>

          <p className="text-sm text-gray-500 italic text-center">
            Your blessings mean a lot, even if you can’t be there in person.
          </p>

          <button
            onClick={() => updateRSVP("declined")}
            disabled={loading}
            className="w-full py-3 rounded-full border border-[#5b7fa3] text-[#5b7fa3]"
          >
            {loading ? "Saving..." : "Confirm Response"}
          </button>

          <button
            onClick={() => setStatus(null)}
            className="w-full text-sm text-gray-400 underline text-center"
          >
            Change my response
          </button>
        </div>
      )}
    </div>
  );
}

export default CommunionRSVPSection;