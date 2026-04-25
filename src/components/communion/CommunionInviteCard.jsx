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
    <div className="w-full flex justify-center">

      {/* 🔥 SLIGHTLY BIGGER THAN BEFORE */}
      <div className="w-full max-w-[460px]">

        <div className="bg-white shadow-xl px-7 sm:px-9 py-9 sm:py-11 rounded-2xl">

          {/* HEADER */}
          <p className="text-center text-lg text-gray-600 font-[Great_Vibes] mb-5">
            First Holy Communion
          </p>

          {/* TOP */}
          <div className="flex flex-col items-center mb-7 relative">

            {/* LEAF */}
            <img
              src={leaf}
              alt="leaf"
              className="w-48 sm:w-60 opacity-80 -rotate-6 relative z-14"
            />

            {/* 🔥 PREMIUM GOLD CROSS (REAL EFFECT) */}
            <div className="text-6xl sm:text-7xl -mt-10 z-10 cross-premium">
              ✝
            </div>

            <div className="w-14 h-[1px] bg-gray-300 mt-3 opacity-40"></div>
          </div>

          {/* NAME */}
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-800 text-center tracking-wide">
            {event?.child_name}
          </h1>

          <p className="text-sm text-gray-500 italic mb-5 text-center">
            Child of {event?.parent_names}
          </p>

          {/* QUOTE */}
          <p className="text-sm text-gray-500 italic mb-2 text-center px-3 leading-relaxed">
            “This is my body given for you; do this in remembrance of me.”
          </p>

          <p className="text-xs text-gray-400 text-center tracking-wide mb-7">
            Luke 22:19
          </p>

          {/* DATE */}
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 mb-7 bg-white shadow-sm">

            <div>
              <p className="text-xs text-gray-400">APRIL</p>
              <p className="text-sm text-gray-600">
                {new Date(event?.event_date).toDateString()}
              </p>
            </div>

            <div className="text-3xl font-bold text-[#c89b3c]">
              {new Date(event?.event_date).getDate()}
            </div>

            <div className="text-sm text-gray-600">
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

          <div className="grid grid-cols-4 gap-3 mb-7">
            {["days", "hours", "mins", "secs"].map((unit, i) => (
              <div
                key={i}
                className="bg-white border border-[#eee] rounded-lg py-3 shadow-sm text-center"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {timeLeft[unit] ?? "0"}
                </p>
                <p className="text-xs text-gray-400 capitalize">
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
  );
}

export default CommunionInviteCard;