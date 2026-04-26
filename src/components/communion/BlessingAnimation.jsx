import { useMemo } from "react";

function BlessingAnimation() {
  const petals = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 5,
      delay: Math.random() * 4,
      size: 20 + Math.random() * 10,
    }));
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
          }}
        />
      ))}
    </div>
  );
}

export default BlessingAnimation;