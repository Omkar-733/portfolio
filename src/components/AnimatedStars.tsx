import React from 'react';

const AnimatedStars = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-2 h-2 bg-white dark:bg-gray-200 rounded-full pointer-events-none
                    animate-star-${i % 3}
                    ${i % 2 === 0 ? 'animate-star-blink' : ''}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedStars;
