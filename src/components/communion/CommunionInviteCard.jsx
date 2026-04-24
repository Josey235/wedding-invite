import { useEffect, useState } from "react";

function CommunionInviteCard({ name, event }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    if (!event?.event_date) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(event.event_date).getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  if (!event) return null;

  const eventDate = new Date(event.event_date);

  return (
    <div className="card space-y-6">

      {/* ✝️ Title */}
      <div className="space-y-2">
        <p className="uppercase tracking-widest text-xs text-gray-400">
          First Holy Communion
        </p>

        <h1 className="text-3xl font-heading text-gray-800">
          {event.child_name}
        </h1>

        <p className="text-sm text-gray-500 italic">
          Child of {event.parent_names}
        </p>
      </div>

      {/* 🙏 Blessing line */}
      <p className="text-sm text-gray-500 italic">
        "This is my body given for you; do this in remembrance of me."
      </p>

      {/* 📅 Date Box */}
      <div className="border rounded-xl px-4 py-3 flex justify-between items-center">

        <div className="text-left">
          <p className="text-xs uppercase text-gray-400">
            {eventDate.toLocaleString("default", { month: "long" })}
          </p>

          <p className="text-sm text-gray-600">
            {eventDate.getFullYear()}, {eventDate.toLocaleDateString("default", { weekday: "long" })}
          </p>
        </div>

        <div className="text-3xl text-primary font-semibold">
          {eventDate.getDate()}
        </div>

        <div className="text-sm text-gray-600">
          {eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

      </div>

      {/* ⏳ Countdown */}
      <div className="space-y-2">
        <p className="uppercase text-xs tracking-widest text-gray-400">
          Event Countdown
        </p>

        <div className="flex justify-center gap-3">

          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.mins },
            { label: "Secs", value: timeLeft.secs },
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-xl px-3 py-2 w-16 text-center"
            >
              <p className="text-lg font-semibold">{item.value}</p>
              <p className="text-xs text-gray-400">{item.label}</p>
            </div>
          ))}

        </div>
      </div>

      {/* 👤 Guest */}
      <p className="text-sm text-gray-400 italic">
        Invited Guest: {name}
      </p>

    </div>
  );
}

export default CommunionInviteCard;