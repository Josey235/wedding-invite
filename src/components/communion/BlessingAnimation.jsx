import { useMemo } from "react";

function BlessingAnimation() {
  const petals = useMemo(() => {
    const baseCount = window.innerWidth < 640 ? 10 : 18;

    return Array.from({ length: baseCount }).map((_, i) => {
      const depth = Math.random(); // 🔥 depth layer (0–1)

      return {
        id: i,
        left: Math.random() * 100,

        // 🎯 depth-based size
        size: 14 + depth * 20,

        // 🎯 depth-based speed (far = slower)
        duration: 10 + depth * 10,

        delay: Math.random() * 6,

        // 🎯 slight horizontal drift
        drift: (Math.random() - 0.5) * 40,

        // 🎯 opacity based on depth
        opacity: 0.25 + depth * 0.35,

        // 🎯 blur for depth realism
        blur: depth > 0.6 ? 1.2 : depth > 0.3 ? 0.6 : 0,
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