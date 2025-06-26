import React from 'react';

const getRandomSpeed = () => Math.random() * 10 + 5; // Random speed between 5-15s
const getRandomDirection = () => Math.random() * 360; // Random direction in degrees

const StarsBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => {
        // Randomize star size and opacity
        const size = Math.random() * 2 + 1; // Random size between 1-3px
        const opacity = Math.random() * 0.5 + 0.2; // Random opacity between 0.2-0.7
        
        // Randomize animation properties
        const speed = getRandomSpeed();
        const direction = getRandomDirection();
        const animationType = Math.random() > 0.7 ? 'falling' : 'twinkling';
        const animationName = `animate-star-${animationType}`;

        return (
          <div 
            key={i}
            className={`absolute rounded-full pointer-events-none ${animationName}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              opacity: opacity,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${speed}s`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `rotate(${direction}deg)`
            }}
          />
        );
      })}
    </div>
  );
};

export default StarsBackground;
