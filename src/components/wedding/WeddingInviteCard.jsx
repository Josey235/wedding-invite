import { useEffect, useState } from "react";

function InviteCard({ name }) {
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
    <div className="card">

      <div className="space-y-6">

        <h1 className="font-script text-4xl text-primary">A & S</h1>.

        <p className="italic text-gray-500 text-sm">
          " My command is this: Love each other as I have loved you."
          <span className="block mt-2 font-semibold">
            — John 15:12 —
          </span>
        </p>

        <p className="uppercase text-xs tracking-widest text-gray-400">
          Together with their families
        </p>

        <div className="space-y-2">
          <h2 className="font-heading text-3xl text-gray-800">
            Anto
          </h2>
          <div className="text-primary text-xl">♡</div>
          <h2 className="font-heading text-3xl text-gray-800">
            Soja
          </h2>
        </div>

        <p className="uppercase text-xs tracking-widest text-gray-400">
          Request the honor of your presence
        </p>

        <div className="border rounded-xl flex justify-between items-center px-4 py-4">
          <div className="text-left">
            <p className="text-xs text-gray-400 uppercase">May</p>
            <p className="text-sm text-gray-600">2026, Sunday</p>
          </div>

          <div className="text-4xl font-heading text-primary">10</div>

          <div className="text-sm text-gray-600">11:30 AM</div>
        </div>

        <p className="uppercase text-sm tracking-widest text-gray-700">
          St.Antony's Church,Chenappady
        </p>

        <div>
          <p className="uppercase text-xs text-gray-400 tracking-widest mb-3">
            Wedding Countdown
          </p>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl py-3">
                <p className="text-xl font-semibold">{item.value}</p>
                <p className="text-[10px] text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 italic">
          Invited Guest: <span className="text-gray-600">{name}</span>
        </p>

      </div>
    </div>
  );
}

export default InviteCard;