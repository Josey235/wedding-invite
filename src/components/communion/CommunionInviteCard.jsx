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

      <div className="relative rounded-[28px] overflow-hidden shadow-xl bg-white">

        {/* IMAGE */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={girl}
            className="w-full h-full object-cover"
          />

          {/* LIGHT FADE */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent"></div>

          {/* 🔥 TOP OVERLAY (FIXED SYSTEM) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">

            {/* FOG (ANCHOR TO TOP) */}
            <img
              src={fog}
              className="absolute -top-8 w-[70%] opacity-100 blur-[1px]"
            />

            {/* TEXT */}
            <div className="relative z-10 flex flex-col items-center pt-3">

              <p className="text-[10px] tracking-[0.5em] text-gray-600 mb-1">
                FIRST HOLY
              </p>

              <h1 className="
                text-[42px]
                leading-none
                font-[Allura]
                text-center
                bg-[linear-gradient(120deg,#c89b3c,#f4e2a1,#c89b3c)]
                bg-[length:200%_auto]
                bg-clip-text text-transparent
                animate-[shine_4s_linear_infinite]
              ">
                Communion
              </h1>

            </div>

            {/* 🔥 CROSS (DETACHED FROM TEXT FLOW) */}
            <div className="
              absolute
              top-[80px]
              left-1/2
              -translate-x-1/2
              text-[#c89b3c]
              text-[22px]
              animate-pulse
            ">
              ✝
            </div>

          </div>
        </div>

        {/* CARD BODY */}
        <div className="relative -mt-20 px-4 pb-6">

          <div className="
            bg-[#fdfaf4]
            rounded-t-[60px]
            rounded-b-[24px]
            border border-[#f1e4c8]
            shadow-md
            pt-8 pb-6 px-5 text-center
          ">

            <h2 className="text-[22px] font-serif text-gray-800 tracking-wide">
              {event?.child_name}
            </h2>

            <p className="text-sm text-gray-500 italic">
              Child of {event?.parent_names}
            </p>

            <p className="text-sm text-gray-500 italic mt-3">
              “This is my body given for you; do this in remembrance of me.”
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Luke 22:19
            </p>

            {/* DIVIDER */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-[1px] bg-[#e9dcc0]"></div>
              <div className="text-[#c89b3c] text-xs">✝</div>
              <div className="flex-1 h-[1px] bg-[#e9dcc0]"></div>
            </div>

            {/* DATE */}
            <div className="flex justify-between items-center text-sm mb-4">

              <div>
                <p className="text-xs text-gray-400">APRIL</p>
                <p className="text-gray-600 text-xs">
                  {new Date(event?.event_date).toDateString()}
                </p>
              </div>

              <div className="text-xl font-bold text-[#c89b3c]">
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
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["days", "hours", "mins", "secs"].map((unit, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#efe3c8] rounded-lg py-2"
                >
                  <p className="text-sm font-semibold">
                    {timeLeft[unit] ?? "0"}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {unit}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-400 italic">
              Invited Guest: {name}
            </p>

          </div>
        </div>
      </div>

      {/* SHINE ANIMATION */}
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