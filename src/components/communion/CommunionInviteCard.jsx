import { useEffect, useState } from "react";
import girl from "../../assets/communion.png";
import fog from "../../assets/fog.png";

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
    <div className="w-full max-w-lg mx-auto px-3">

      <div className="relative rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-white">

        {/* IMAGE */}
        <div className="relative aspect-[3/4] overflow-hidden">

          <img
            src={girl}
            className="w-full h-full object-cover scale-105"
          />

          {/* DEPTH LIGHT */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>

          {/* FOG */}
          <img
            src={fog}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] opacity-95 blur-[2px]"
          />

          {/* TITLE */}
          <div className="absolute top-8 w-full text-center px-4">

  <p className="text-[10px] tracking-[0.45em] text-gray-600 font-light">
    FIRST HOLY
  </p>

  <h1 className="
    text-[56px] leading-none
    font-[Allura]
    tracking-wide
    bg-[linear-gradient(120deg,#c89b3c,#f4e2a1,#c89b3c)]
    bg-[length:200%_auto]
    bg-clip-text text-transparent
    animate-[shine_4s_linear_infinite]
    drop-shadow-[0_3px_8px_rgba(200,155,60,0.35)]
  ">
    Communion
  </h1>

  <div className="
    text-[#c89b3c]
    text-[28px]
    -mt-1
    animate-pulse
    drop-shadow-[0_3px_8px_rgba(200,155,60,0.45)]
  ">
    ✝
  </div>
          </div>
        </div>

        {/* 🔥 PREMIUM CARD */}
        <div className="relative -mt-24 px-4 pb-6">

          <div className="
            relative
            bg-[#fdfaf4]
            rounded-t-[70px]
            rounded-b-[24px]
            border border-[#f1e4c8]
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            pt-10 pb-6 px-5 text-center
          ">

            {/* TOP GLOW LINE */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#e6c77a] to-transparent"></div>

            {/* NAME */}
            <h2 className="text-[24px] font-serif text-gray-800 tracking-[0.08em]">
              {event?.child_name}
            </h2>

            <p className="text-sm text-gray-500 italic mt-1">
              Child of {event?.parent_names}
            </p>

            {/* QUOTE */}
            <p className="text-sm text-gray-500 italic mt-4 leading-relaxed px-2">
              “This is my body given for you; do this in remembrance of me.”
            </p>

            <p className="text-[11px] text-gray-400 mt-1 tracking-wide">
              Luke 22:19
            </p>

            {/* DIVIDER */}
            <div className="flex items-center gap-2 my-5">
              <div className="flex-1 h-[1px] bg-[#e9dcc0]"></div>
              <div className="text-[#c89b3c] text-xs">✝</div>
              <div className="flex-1 h-[1px] bg-[#e9dcc0]"></div>
            </div>

            {/* DATE */}
            <div className="flex justify-between items-center text-sm mb-5">

              <div className="text-left">
                <p className="text-[10px] text-gray-400 tracking-wide">APRIL</p>
                <p className="text-gray-600 text-xs">
                  {new Date(event?.event_date).toDateString()}
                </p>
              </div>

              <div className="text-[22px] font-bold text-[#c89b3c]">
                {new Date(event?.event_date).getDate()}
              </div>

              <div className="text-gray-600 text-xs">
                {new Date(event?.event_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {/* COUNTDOWN */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {["days", "hours", "mins", "secs"].map((unit, i) => (
                <div
                  key={i}
                  className="
                    bg-white/80
                    backdrop-blur-sm
                    border border-[#efe3c8]
                    rounded-xl
                    py-2 shadow-sm
                  "
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {timeLeft[unit] ?? "0"}
                  </p>
                  <p className="text-[10px] text-gray-400 capitalize">
                    {unit}
                  </p>
                </div>
              ))}
            </div>

            {/* GUEST */}
            <p className="text-sm text-gray-400 italic">
              Invited Guest: {name}
            </p>

          </div>
        </div>

      </div>

      {/* ✨ SHIMMER ANIMATION */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

    </div>
  );
}

export default CommunionInviteCard;