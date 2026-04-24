import { useEffect, useState } from "react";
import petalImg from "../assets/petal.png";

export default function Petals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 30 + Math.random() * 40,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.7 + Math.random() * 0.3,
      blur: Math.random() * 1.5,
      rotation: Math.random() * 360,
    }));

    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
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
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
            filter: `blur(${p.blur}px)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );
}