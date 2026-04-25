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
          <img src={girl} className="w-full h-full object-cover" />

          {/* LIGHT FADE */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent"></div>

          {/* TOP SECTION */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">

            {/* FOG */}
            <div className="absolute top-0 w-full flex justify-center">
              <img
                src={fog}
                className="w-[75%] opacity-95 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
              />
            </div>

            {/* CORNER CROSSES */}
            <div className="absolute left-4 top-10 text-[#c89b3c] text-[26px] animate-pulse">
              ✝
            </div>

            <div className="absolute right-4 top-10 text-[#c89b3c] text-[26px] animate-pulse">
              ✝
            </div>

            {/* TEXT */}
            <div className="relative z-10 flex flex-col items-center pt-10">

              <p className="text-[10px] tracking-[0.5em] text-gray-700 mb-1">
                FIRST HOLY
              </p>

              <h1 className="
                text-[44px]
                leading-none
                font-[Allura]
                text-center
                bg-[linear-gradient(120deg,#c89b3c,#f4e2a1,#c89b3c)]
                bg-[length:200%_auto]
                bg-clip-text text-transparent
                animate-[shine_4s_linear_infinite]
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]
              ">
                Communion
              </h1>

            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="relative -mt-20 px-4 pb-6">

          <div className="
            bg-[#fdfaf4]
            rounded-t-[60px]
            rounded-b-[24px]
            border border-[#f1e4c8]
            shadow-md
            pt-8 pb-6 px-5 text-center
          ">

            {/* 🔥 1. BIBLE VERSE FIRST */}
            <p className="text-sm text-gray-500 italic">
              “This is my body given for you; do this in remembrance of me.”
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Luke 22:19
            </p>

            {/* 🔥 2. NAME */}
            <h2 className="text-[22px] font-serif text-gray-800 tracking-wide mt-4">
              {event?.child_name}
            </h2>

            {/* 🔥 3. INVITATION TEXT */}
            <p className="
  mt-3
  text-[20px]
  font-[Parisienne]
  text-[#b8964c]
  leading-relaxed
  tracking-wide
">
  We invite you to join our daughter’s First Holy Communion
</p>

            {/* DIVIDER */}
            <div className="flex items-center gap-2 my-5">
              <div className="flex-1 h-[1px] bg-[#e9dcc0] animate-divider"></div>
              <div className="text-[#c89b3c] text-xs">✝</div>
              <div className="flex-1 h-[1px] bg-[#e9dcc0] animate-divider"></div>
            </div>

            {/* DATE SECTION */}
            <div className="flex items-center justify-between mb-6 px-2 text-center">

              <div className="flex-1">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  {new Date(event?.event_date).toLocaleDateString("en-US", { weekday: "long" })}
                </p>
              </div>

              <div className="w-[1px] h-10 bg-[#e5d3a5] animate-divider"></div>

              <div className="flex flex-col items-center px-4">

                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  {new Date(event?.event_date).toLocaleDateString("en-US", { month: "long" })}
                </p>

                <p className="text-2xl font-semibold text-[#c89b3c] leading-none">
                  {new Date(event?.event_date).getDate()}
                </p>

                <p className="text-[10px] text-gray-400">
                  {new Date(event?.event_date).getFullYear()}
                </p>

              </div>

              <div className="w-[1px] h-10 bg-[#e5d3a5] animate-divider"></div>

              <div className="flex-1">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  At
                </p>
                <p className="text-sm text-gray-700">
                  {new Date(event?.event_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

            </div>

            {/* COUNTDOWN */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["days", "hours", "mins", "secs"].map((unit, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#efe3c8] rounded-lg py-2 shadow-sm"
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

      <style>{`
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes dividerGlow {
          0% { opacity: 0.6; transform: scaleX(0.9); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0.6; transform: scaleX(0.9); }
        }

        .animate-divider {
          animation: dividerGlow 3s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}

export default CommunionInviteCard;