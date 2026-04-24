<div className="w-full max-w-md mx-auto fade-in">

  <div className="relative p-2 sm:p-4">

    {/* CARD */}
    <div className="relative bg-white shadow-xl 
                    px-5 sm:px-8 
                    py-8 sm:py-10 
                    rounded-2xl">

      {/* HEADER */}
      <p className="text-center 
                    text-base sm:text-lg 
                    text-gray-600 
                    font-[Great_Vibes] 
                    mb-4 sm:mb-6">
        First Holy Communion
      </p>

      {/* TOP */}
      <div className="flex flex-col items-center 
                      mb-5 sm:mb-6 relative">

        <div className="absolute w-32 sm:w-40 h-32 sm:h-40 
                        bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

        <img
          src={leaf}
          alt="leaf"
          className="w-44 sm:w-56 opacity-80 -rotate-6 relative z-10"
        />

        <div className="text-5xl sm:text-6xl -mt-8 sm:-mt-10 gold-text z-10">
          ✝
        </div>

        <div className="w-10 sm:w-12 h-[1px] bg-gray-300 mt-2 opacity-40"></div>
      </div>

      {/* NAME */}
      <h1 className="font-serif 
                     text-xl sm:text-2xl 
                     text-gray-800 
                     text-center tracking-wide">
        {event?.child_name}
      </h1>

      <p className="text-xs sm:text-sm text-gray-500 italic mb-3 sm:mb-4 text-center">
        Child of {event?.parent_names}
      </p>

      {/* QUOTE */}
      <p className="text-xs sm:text-sm text-gray-500 italic mb-2 text-center px-2 sm:px-4 leading-relaxed">
        “This is my body given for you; do this in remembrance of me.”
      </p>

      <p className="text-[10px] sm:text-xs text-gray-400 text-center tracking-wide mb-5 sm:mb-6">
        Luke 22:19
      </p>

      {/* DATE */}
      <div className="flex items-center justify-between 
                      border border-gray-200 rounded-xl 
                      px-3 sm:px-4 
                      py-2.5 sm:py-3 
                      mb-5 sm:mb-6 
                      bg-white/70 shadow-sm">

        <div>
          <p className="text-[10px] sm:text-xs text-gray-400">APRIL</p>
          <p className="text-xs sm:text-sm text-gray-600">
            {new Date(event?.event_date).toDateString()}
          </p>
        </div>

        <div className="text-2xl sm:text-3xl font-bold text-[#c89b3c]">
          {new Date(event?.event_date).getDate()}
        </div>

        <div className="text-xs sm:text-sm text-gray-600">
          {new Date(event?.event_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* COUNTDOWN */}
      <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 mb-3 text-center">
        EVENT COUNTDOWN
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {["days", "hours", "mins", "secs"].map((unit, i) => (
          <div
            key={i}
            className="bg-white border border-[#eee] 
                       rounded-lg py-2.5 sm:py-3 
                       shadow-sm text-center">
            <p className="text-sm sm:text-lg font-semibold text-gray-800">
              {timeLeft[unit] ?? "0"}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 capitalize">
              {unit}
            </p>
          </div>
        ))}
      </div>

      {/* GUEST */}
      <p className="text-xs sm:text-sm text-gray-400 italic text-center">
        Invited Guest: {name}
      </p>

    </div>
  </div>
</div>