import { useEffect, useState } from "react";

function InviteCard({ name }) {
  const weddingDate = new Date("2026-07-30T10:30:00");

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
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-card px-6 py-10 text-center w-full max-w-md space-y-6">

      {/* Monogram */}
      <h1 className="font-script text-4xl text-primary tracking-wide">
        J & B
      </h1>

      {/* Blessing */}
      <p className="italic text-gray-500 text-sm text-center">
 " My command is this: Love each other as I have loved you."
  
  <span className="block mt-2 font-semibold">
    — John 15:12 —
  </span>
</p>
      <p className="uppercase text-xs tracking-widest text-gray-400">
        Together with their families
      </p>

      {/* Couple Names */}
      <div className="space-y-2">
        <h2 className="font-heading text-3xl text-gray-800">
          Johny Joseph
        </h2>

        <div className="text-primary text-xl">♡</div>

        <h2 className="font-heading text-3xl text-gray-800">
          Beena Thomas
        </h2>
      </div>

      {/* Invite Line */}
      <p className="uppercase text-xs tracking-widest text-gray-400">
        Request the honor of your presence
      </p>

      {/* Date Card */}
      <div className="border rounded-xl flex justify-between items-center px-4 py-4">
        <div className="text-left">
          <p className="text-xs text-gray-400 uppercase">July</p>
          <p className="text-sm text-gray-600">2026, Thursday</p>
        </div>

        <div className="text-4xl font-heading text-primary">
          30
        </div>

        <div className="text-sm text-gray-600">
          10:30 AM
        </div>
      </div>

      {/* Venue */}
      <p className="uppercase text-sm tracking-widest text-gray-700">
        Lourde Matha Church , Mammood
      </p>

      {/* Countdown */}
      <div className="space-y-2">
        <p className="uppercase text-xs text-gray-400 tracking-widest">
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
              className="border rounded-xl py-3"
            >
              <p className="text-xl font-semibold">{item.value}</p>
              <p className="text-[10px] text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Name (SMALL — not hero) */}
      <p className="text-xs text-gray-400 italic">
        Invited Guest: <span className="text-gray-600">{name}</span>
      </p>

    </div>
  );
}

export default InviteCard;