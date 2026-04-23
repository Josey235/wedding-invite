import { useEffect, useState } from "react";

function InviteCard({ name }) {
  const weddingDate = new Date("2026-05-12T10:30:00"); // adjust if needed

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-pink-100">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold text-pink-600">
        Welcome, {name}
      </h1>

      <p className="text-gray-600 mt-2">
        You are invited to <span className="font-semibold">Rahul & Anjali's</span> wedding
      </p>

      {/* COUNTDOWN TITLE */}
      <p className="mt-4 text-sm text-gray-500">
        Countdown to our big day
      </p>

      {/* COUNTDOWN BOXES */}
      <div className="flex justify-center gap-3 mt-3">

        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-pink-50 px-4 py-3 rounded-lg shadow-sm w-16"
          >
            <div className="text-pink-600 text-lg font-bold">
              {item.value}
            </div>
            <div className="text-xs text-gray-500">
              {item.label}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default InviteCard;