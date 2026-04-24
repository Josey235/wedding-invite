import { useState } from "react";
import { supabase } from "../../supabase";

function RSVPSection({ invite, setInvite }) {
  const [status, setStatus] = useState(invite.rsvp);
  const [guests, setGuests] = useState(invite.guest_count || 1);
  const [loading, setLoading] = useState(false);

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
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl 
                    px-5 sm:px-8 
                    py-8 sm:py-10 
                    space-y-5 sm:space-y-6">

      {/* TITLE */}
      <h2 className="uppercase tracking-widest 
                     text-xs sm:text-sm 
                     text-gray-400 text-center">
        Will you attend?
      </h2>

      {/* YES */}
      <button
        onClick={() => setStatus("attending")}
        className={`w-full 
        py-3 sm:py-4 
        rounded-full border-2 
        transition-all duration-300 font-medium text-sm sm:text-base
        ${
          status === "attending"
            ? "border-primary text-primary"
            : "border-gray-200 text-gray-600 hover:border-primary"
        }`}
      >
        ✔ Yes, with joy!
      </button>

      {/* NO */}
      <button
        onClick={() => setStatus("declined")}
        className={`w-full 
        py-3 sm:py-4 
        rounded-full border-2 
        transition-all duration-300 font-medium text-sm sm:text-base
        ${
          status === "declined"
            ? "border-red-400 text-red-400"
            : "border-gray-200 text-gray-400 hover:border-red-400"
        }`}
      >
        ✖ Sorry, I can’t make it
      </button>

      {/* YES FLOW */}
      {status === "attending" && (
        <div className="space-y-4 animate-fadeIn">

          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Number of guests
          </p>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-lg"
            >
              −
            </button>

            <span className="text-lg sm:text-xl font-semibold">{guests}</span>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={() => updateRSVP("attending")}
            disabled={loading}
            className="w-full mt-2 py-3 rounded-full 
                       bg-primary text-white 
                       text-sm sm:text-base
                       font-medium tracking-wide 
                       shadow-sm transition-all duration-300 
                       hover:shadow-lg hover:-translate-y-0.5"
          >
            Confirm Attendance
          </button>

        </div>
      )}

      {/* NO FLOW */}
      {status === "declined" && (
        <div className="bg-red-50 border-l-4 border-red-300 
                        p-4 sm:p-5 
                        rounded-xl text-left space-y-4 animate-fadeIn">

          <h3 className="text-base sm:text-lg font-heading text-gray-700 text-center">
            We’ll Miss You 💔
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">
            Thank you for letting us know. Though you won’t be with us in person,
            you’ll be in our hearts as we celebrate this special day.
          </p>

          <button
            onClick={() => updateRSVP("declined")}
            disabled={loading}
            className="w-full border border-red-400 text-red-500 
                       py-3 rounded-full hover:bg-red-50 
                       text-sm sm:text-base font-medium"
          >
            Confirm Response
          </button>

          <button
            onClick={() => setStatus(null)}
            className="w-full text-xs sm:text-sm text-gray-400 underline text-center"
          >
            Change my mind — I’ll attend
          </button>

        </div>
      )}

    </div>
  );
}

export default RSVPSection;