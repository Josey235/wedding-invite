import { useEffect, useState } from "react";
import petalImg from "../../assets/petal.png";

export default function Petals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 30 + Math.random() * 40,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.5 + Math.random() * 0.4,
      blur: Math.random() * 1.5,
      rotation: Math.random() * 360,
    }));

    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[50]">
      {petals.map((p) => (
        <img
          key={p.id}
          src={petalImg}
          alt="petal"
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            top: "-60px",
            opacity: p.opacity * 0.6, // softened visibility
            transform: `rotate(${p.rotation}deg)`,
            filter: `blur(${p.blur}px) brightness(1.1)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );
}import { useMemo } from "react";

function BlessingAnimation() {
  const petals = useMemo(() => {
    const count = window.innerWidth < 640 ? 14 : 22;

    return Array.from({ length: count }).map((_, i) => {
      const depth = Math.random();

      return {
        id: i,
        left: Math.random() * 100,

        size: 24 + depth * 32,
        duration: 8 + depth * 8,
        delay: Math.random() * 3,
        drift: (Math.random() - 0.5) * 30,

        opacity: 0.7 + depth * 0.3,

        blur: depth > 0.6 ? 1 : depth > 0.3 ? 0.5 : 0,

        // slight rotation variation (adds realism)
        rotate: Math.random() * 360,
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
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",

            opacity: p.opacity,

            // 🔥 GOLDEN TRANSFORMATION
            filter: `
              sepia(0.8)
              saturate(1.5)
              hue-rotate(10deg)
              brightness(1.1)
              blur(${p.blur}px)
            `,

            // ✨ soft glow effect
            boxShadow: "0 0 12px rgba(200,169,106,0.25)",

            transform: `translateX(${p.drift}px) rotate(${p.rotate}deg)`,

            // 🌟 blend into background (premium feel)
            mixBlendMode: "multiply",
          }}
        />
      ))}
    </div>
  );
}

export default BlessingAnimation;