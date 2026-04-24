import { useEffect, useState } from "react";
import leaf from "../../assets/leaf.png";

function CommunionInviteCard({ name, event }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const eventDate = new Date(event?.event_date);
      const diff = eventDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  return (
    <div className="w-full px-4 flex justify-center">
      {/* MATCH RSVP WIDTH */}
      <div className="w-full max-w-[420px]">

        {/* BACKGROUND */}
        <div className="relative p-3">

          {/* GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f9f4ec] to-[#f7efe8] opacity-60 blur-xl"></div>

          {/* CARD */}
          <div className="relative bg-white shadow-xl px-6 sm:px-8 py-8 sm:py-10 rounded-2xl">

            {/* HEADER */}
            <p className="text-center text-lg text-gray-600 font-[Great_Vibes] mb-4">
              First Holy Communion
            </p>

            {/* TOP */}
            <div className="flex flex-col items-center mb-6 relative">

              {/* GLOW BEHIND */}
              <div className="absolute w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

              {/* LEAF */}
              <img
                src={leaf}
                alt="leaf"
                className="w-44 sm:w-56 opacity-80 -rotate-6 relative z-10"
              />

              {/* GOLD CROSS */}
              <div className="text-5xl sm:text-6xl -mt-8 z-10 text-[#c9a646] drop-shadow-sm">
                ✝
              </div>

              <div className="w-12 h-[1px] bg-gray-300 mt-2 opacity-40"></div>
            </div>

            {/* NAME */}
            <h1 className="font-serif text-xl sm:text-2xl text-gray-800 text-center tracking-wide">
              {event?.child_name}
            </h1>

            <p className="text-sm text-gray-500 italic mb-4 text-center">
              Child of {event?.parent_names}
            </p>

            {/* QUOTE */}
            <p className="text-sm text-gray-500 italic mb-2 text-center px-2 leading-relaxed">
              “This is my body given for you; do this in remembrance of me.”
            </p>

            {/* VERSE */}
            <p className="text-xs text-gray-400 text-center tracking-wide mb-6">
              Luke 22:19
            </p>

            {/* DATE */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 sm:px-4 py-3 mb-6 bg-white shadow-sm">

              <div>
                <p className="text-xs text-gray-400">APRIL</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {new Date(event?.event_date).toDateString()}
                </p>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-[#c89b3c]">
                {new Date(event?.event_date).getDate()}
              </div>

              <div className="text-xs sm:text-sm text-gray-600">
                {new Date(event?.event_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {/* COUNTDOWN */}
            <p className="text-xs tracking-widest text-gray-400 mb-3 text-center">
              EVENT COUNTDOWN
            </p>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
              {["days", "hours", "mins", "secs"].map((unit, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#eee] rounded-lg py-2 sm:py-3 shadow-sm text-center"
                >
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {timeLeft[unit] ?? "0"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 capitalize">
                    {unit}
                  </p>
                </div>
              ))}
            </div>

            {/* GUEST */}
            <p className="text-sm text-gray-400 italic text-center">
              Invited Guest: {name}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunionInviteCard;