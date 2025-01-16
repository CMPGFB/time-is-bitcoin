import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function BitcoinClock() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [rotation, setRotation] = useState(0);

  // Update rotation based on current time
  useEffect(() => {
    const updateRotation = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();
      
      // Calculate rotation based on current time
      const secondDegrees = ((seconds / 60) * 360);
      setRotation(secondDegrees);
    };

    updateRotation(); // Initial update
    const timer = setInterval(() => {
      updateRotation();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-48 h-48">
      {/* Shadow effect */}
      <div className="absolute inset-0 rounded-full bg-[#F7931A] opacity-10 blur-xl transform scale-110" />
      
      {/* Main clock face */}
      <div className={`absolute inset-0 rounded-full ${
        isDark ? 'bg-[#0D0D0D]' : 'bg-gray-100'
      } shadow-lg`}>
        {/* Border ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#F7931A]" />

        {/* Bitcoin logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[#F7931A] text-5xl font-bold">
            ₿
          </div>
        </div>

        {/* Clock hand */}
        <div
          className="absolute left-1/2 bottom-1/2 origin-bottom -translate-x-1/2"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* Hand with gradient */}
          <div className="w-[1.5px] h-16 bg-gradient-to-t from-[#F7931A] to-[#F7931A]/40 rounded-full" />
          
          {/* Hand circle */}
          <div className="absolute bottom-0 left-1/2 w-3 h-3 -translate-x-1/2 translate-y-1/2 rounded-full border-[1.5px] border-[#F7931A] bg-[#0D0D0D]" />
        </div>
      </div>
    </div>
  );
}