/*import { useEffect, useState } from 'react';

const PulsingButton = () => {
  const [rings, setRings] = useState([]);
  
  useEffect(() => {
    // Create a new ring every 2 seconds
    const intervalId = setInterval(() => {
      const newRing = {
        id: Date.now(),
      };
      
      setRings(prev => [...prev, newRing]);
      
      // Remove ring after animation completes
      setTimeout(() => {
        setRings(prev => prev.filter(ring => ring.id !== newRing.id));
      }, 2000); // Match animation duration
    }, 2000);
    
    // Start with one ring immediately
    setRings([{ id: Date.now() }]);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <button className="relative overflow-hidden flex items-center justify-center p-2 h-11 w-1/4 rounded-lg bg-[hsl(var(--background3))]">
      <span className="relative z-10 text-[hsl(var(--text))]">Pulse Button</span>
        {rings.map(ring => (
          <div
            key={ring.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-full animate-inner-pulse"
          />
        ))}
    </button>
  );
};

// Add custom animation
const styles = `
  @keyframes inner-pulse {
    0% {
      width: 0;
      height: 0;
      opacity: 0.6;
    }
    100% {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  .animate-inner-pulse {
    animation: inner-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) forwards;
  }
`;

export default PulsingButton;*/