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
    <div className="w-full max-w-lg mx-auto fade-in"> {/* ✅ ONLY CHANGE HERE */}

      <div className="relative p-4">

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f9f4ec] to-[#f7efe8] opacity-60 blur-xl"></div>

        <div className="relative card bg-white shadow-xl px-8 py-10 rounded-2xl">

          <p className="text-center text-lg text-gray-600 font-[Great_Vibes] mb-4">
            First Holy Communion
          </p>

          <div className="flex flex-col items-center mb-6 relative">

            <div className="absolute w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

            <img
              src={leaf}
              alt="leaf"
              className="w-56 opacity-80 -rotate-6 relative z-13"
            />

            <div className="text-6xl -mt-10 gold-text z-10">
              ✝
            </div>

            <div className="w-12 h-[1px] bg-gray-300 mt-2 opacity-40"></div>
          </div>

          <h1 className="font-serif text-2xl text-gray-800 text-center tracking-wide">
            {event?.child_name}
          </h1>

          <p className="text-sm text-gray-500 italic mb-4 text-center">
            Child of {event?.parent_names}
          </p>

          <p className="text-sm text-gray-500 italic mb-2 text-center px-4 leading-relaxed">
            “This is my body given for you; do this in remembrance of me.”
          </p>

          <p className="text-xs text-gray-400 text-center tracking-wide mb-6">
            Luke 22:19
          </p>

          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 mb-6 bg-white/70 shadow-sm">

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

          <p className="text-xs tracking-widest text-gray-400 mb-3 text-center">
            EVENT COUNTDOWN
          </p>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {["days", "hours", "mins", "secs"].map((unit, i) => (
              <div
                key={i}
                className="bg-white border border-[#eee] rounded-lg py-3 shadow-sm text-center hover:shadow-md transition"
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

          <p className="text-sm text-gray-400 italic text-center">
            Invited Guest: {name}
          </p>

        </div>
      </div>
    </div>
  );
}

export default CommunionInviteCard;