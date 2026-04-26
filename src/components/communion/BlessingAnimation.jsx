import { useMemo } from "react";

function BlessingAnimation() {
  const petals = useMemo(() => {
    const count = window.innerWidth < 640 ? 14 : 22;

    return Array.from({ length: count }).map((_, i) => {
      const depth = Math.random();

      return {
        id: i,
        left: Math.random() * 100,

        // size variation
        size: 16 + depth * 22,

        // slightly faster for continuity
        duration: 8 + depth * 8,

        // 🔥 key fix: spread delays tightly (continuous flow)
        delay: Math.random() * 3,

        drift: (Math.random() - 0.5) * 30,

        // 🔥 increased opacity (clearer petals)
        opacity: 0.45 + depth * 0.4,

        // reduced blur so petals are visible
        blur: depth > 0.6 ? 0.8 : depth > 0.3 ? 0.4 : 0,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal animate-fall"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            backgroundImage: `url('/petal.png')`,

            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,

            transform: `translateX(${p.drift}px)`,
          }}
        />
      ))}
    </div>
  );
}

export default BlessingAnimation;