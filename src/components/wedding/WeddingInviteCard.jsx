import { useEffect, useState } from "react";

function InviteCard({ name, showGuestTag = false }) {
  const weddingDate = new Date("2026-05-10T11:30");

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = weddingDate - new Date();

    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card bg-gradient-to-br from-[#faf7f2] via-[#fdfaf6] to-[#f5efe6] border border-[#e8ded0] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-6 py-10">

      <div className="space-y-7 text-center">

        <h1 className="font-script text-4xl text-[#bfa46f] tracking-wide">
          A & S
        </h1>

        <p className="italic text-[#7a7a7a] text-sm leading-relaxed">
          " My command is this: Love each other as I have loved you."
          <span className="block mt-2 font-semibold text-[#5c5c5c]">
            — John 15:12 —
          </span>
        </p>

        <p className="uppercase text-[10px] tracking-[0.3em] text-[#a8a29e]">
          Together with their families
        </p>

        <div className="space-y-3">
          <h2 className="font-heading text-3xl text-[#2f2f2f]">
            Anto
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#c8a96a] to-transparent"></span>
            <span className="text-[#c8a96a] text-lg">✦</span>
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#c8a96a] to-transparent"></span>
          </div>

          <h2 className="font-heading text-3xl text-[#2f2f2f]">
            Soja
          </h2>
        </div>

        <p className="uppercase text-[10px] tracking-[0.3em] text-[#a8a29e]">
          Request the honor of your presence
        </p>

        <div className="border border-[#e8ded0] bg-white/60 backdrop-blur-md rounded-2xl flex justify-between items-center px-5 py-5 shadow-sm">
          <div className="text-left">
            <p className="text-[10px] text-[#a8a29e] uppercase tracking-widest">
              May
            </p>
            <p className="text-sm text-[#5c5c5c]">2026, Sunday</p>
          </div>

          <div className="text-4xl font-heading text-[#bfa46f]">10</div>

          <div className="text-sm text-[#5c5c5c]">11:30 AM</div>
        </div>

        <p className="uppercase text-xs tracking-[0.2em] text-[#4b4b4b]">
          St.Antony's Church, Chenappady
        </p>

        <div>
          <p className="uppercase text-[10px] text-[#a8a29e] tracking-[0.3em] mb-4">
            Wedding Countdown
          </p>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md border border-[#ece5d8] rounded-xl py-3 shadow-sm"
              >
                <p className="text-xl font-semibold text-[#3e3e3e]">
                  {item.value}
                </p>
                <p className="text-[10px] text-[#a8a29e] tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {showGuestTag && (
          <p className="text-xs text-[#9a9a9a] italic">
            Invited Guest:{" "}
            <span className="text-[#4b4b4b]">{name}</span>
          </p>
        )}

      </div>
    </div>
  );
}

export default InviteCard;