import React, { useState, useEffect, useRef } from 'react';

// --- Interfaces and Types ---
interface ChaosOverlayProps {
  isActive?: boolean;
  intensity?: 'low' | 'medium' | 'high' | 'insane';
}

interface IntensityConfig {
  minDelay: number;
  maxDelay: number;
  maxSimultaneous: number;
}

interface MatrixRainDrop {
  id: number;
  x: number;
  char: string;
  speed: number;
}

type EffectName =
  | 'shatter'
  | 'meltdown'
  | 'gravity'
  | 'explode'
  | 'zoom'
  | 'portal'
  | 'canvas'
  | 'bleed'
  | 'rotate'
  | 'invert'
  | 'static';

// --- ChaosOverlay Component ---
const ChaosOverlay: React.FC<ChaosOverlayProps> = ({ isActive = true, intensity = 'medium' }) => {
  const [activeEffects, setActiveEffects] = useState<Set<EffectName>>(new Set());
  const [glitchText, setGlitchText] = useState<string>('');
  const [matrixRain, setMatrixRain] = useState<MatrixRainDrop[]>([]);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalTitle = useRef<string>(document.title);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Intensity settings
  const intensityConfig: Record<NonNullable<ChaosOverlayProps['intensity']>, IntensityConfig> = {
    low: { minDelay: 8000, maxDelay: 15000, maxSimultaneous: 1 },
    medium: { minDelay: 3000, maxDelay: 8000, maxSimultaneous: 2 },
    high: { minDelay: 1000, maxDelay: 4000, maxSimultaneous: 3 },
    insane: { minDelay: 500, maxDelay: 2000, maxSimultaneous: 5 },
  };

  const config = intensityConfig[intensity] || intensityConfig.medium;

  // Create audio context for glitch sounds
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.log('Audio not available', e);
    }
  }, []);

  // Glitch sound generator
  const playGlitchSound = (type: 'static' | 'glitch' | 'error' = 'static'): void => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (type) {
      case 'static':
        oscillator.frequency.setValueAtTime(Math.random() * 1000 + 100, ctx.currentTime);
        oscillator.type = 'sawtooth';
        break;
      case 'glitch':
        oscillator.frequency.setValueAtTime(Math.random() * 500 + 200, ctx.currentTime);
        oscillator.type = 'square';
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.type = 'triangle';
        break;
    }

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  };

  // Effect functions
  const effects: Record<string, () => void> = {
    domShatter: () => {
      playGlitchSound('static');
      setActiveEffects((prev) => new Set([...prev, 'shatter']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('shatter');
          return newSet;
        });
      }, 3000);
    },

    cssMeltdown: () => {
      playGlitchSound('glitch');
      setActiveEffects((prev) => new Set([...prev, 'meltdown']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('meltdown');
          return newSet;
        });
      }, 4000);
    },

    gravityCollapse: () => {
      setActiveEffects((prev) => new Set([...prev, 'gravity']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('gravity');
          return newSet;
        });
      }, 3000);
    },

    explodingLayout: () => {
      playGlitchSound('error');
      setActiveEffects((prev) => new Set([...prev, 'explode']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('explode');
          return newSet;
        });
      }, 2500);
    },

    zoomStorm: () => {
      setActiveEffects((prev) => new Set([...prev, 'zoom']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('zoom');
          return newSet;
        });
      }, 3000);
    },

    portalSwirl: () => {
      setActiveEffects((prev) => new Set([...prev, 'portal']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('portal');
          return newSet;
        });
      }, 4000);
    },

    matrixLeak: () => {
      const matrix: MatrixRainDrop[] = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        char: Math.random() > 0.5 ? '1' : '0',
        speed: Math.random() * 2 + 1,
      }));
      setMatrixRain(matrix);
      setTimeout(() => setMatrixRain([]), 5000);
    },

    tabFlicker: () => {
      const glitchChars = ['▓', '░', '▒', '█', '▄', '▀', '▐', '▌', '♦', '♠', '♣', '♥'];
      let counter = 0;

      const flicker = setInterval(() => {
        const randomGlitch = Array.from({ length: 8 }, () =>
          glitchChars[Math.floor(Math.random() * glitchChars.length)],
        ).join('');
        document.title = `${randomGlitch} ERROR ${randomGlitch}`;
        counter++;

        if (counter > 15) {
          clearInterval(flicker);
          document.title = originalTitle.current;
        }
      }, 150);
    },

    textBleed: () => {
      setActiveEffects((prev) => new Set([...prev, 'bleed']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('bleed');
          return newSet;
        });
      }, 3000);
    },

    canvasTakeover: () => {
      playGlitchSound('static');
      setActiveEffects((prev) => new Set([...prev, 'canvas']));

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          let frameCount = 0;
          const drawNoise = () => {
            if (frameCount++ > 60) return;

            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              const noise = Math.random() * 255;
              const glitch = Math.random() > 0.7;
              data[i] = glitch ? 255 : noise;
              data[i + 1] = glitch ? 0 : noise;
              data[i + 2] = glitch ? 0 : noise;
              data[i + 3] = Math.random() * 200 + 55;
            }

            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(drawNoise);
          };

          drawNoise();
        }
      }

      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('canvas');
          return newSet;
        });
      }, 3000);
    },

    rotatingBody: () => {
      setActiveEffects((prev) => new Set([...prev, 'rotate']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('rotate');
          return newSet;
        });
      }, 2000);
    },

    screenShake: () => {
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 1000);
    },

    glitchOverlay: () => {
      const messages = [
        'SYSTEM COMPROMISED',
        'ERROR 404: REALITY NOT FOUND',
        'HACKING IN PROGRESS...',
        'VIRUS DETECTED',
        'CTRL+ALT+DELETE',
        'BLUE SCREEN OF DEATH',
        'MEMORY LEAK',
        'STACK OVERFLOW',
        'SEGMENTATION FAULT',
        'KERNEL PANIC',
        'ACCESS DENIED',
      ];
      setGlitchText(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setGlitchText(''), 2000);
    },

    colorInvert: () => {
      setActiveEffects((prev) => new Set([...prev, 'invert']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('invert');
          return newSet;
        });
      }, 1500);
    },

    staticLines: () => {
      setActiveEffects((prev) => new Set([...prev, 'static']));
      setTimeout(() => {
        setActiveEffects((prev) => {
          const newSet = new Set(prev);
          newSet.delete('static');
          return newSet;
        });
      }, 2000);
    },
  };

  // Random effect trigger
  useEffect(() => {
    if (!isActive) return;

    const triggerRandomEffect = () => {
      const effectNames = Object.keys(effects);
      const randomEffectName = effectNames[Math.floor(Math.random() * effectNames.length)];
      const randomEffect = effects[randomEffectName];

      if (activeEffects.size < config.maxSimultaneous) {
        randomEffect();
      }

      const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
      setTimeout(triggerRandomEffect, delay);
    };

    const initialDelay = Math.random() * 5000 + 2000;
    const timeoutId = setTimeout(triggerRandomEffect, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [isActive, intensity, activeEffects.size, config.maxSimultaneous, config.maxDelay, config.minDelay, effects]);

  // Inject dynamic CSS styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes matrix-fall {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(1deg); }
        50% { transform: translateX(10px) rotate(-1deg); }
        75% { transform: translateX(-5px) rotate(0.5deg); }
      }

      .animate-shake {
        animation: shake 0.1s infinite;
      }

      .glitch-text {
        position: relative;
        animation: glitch-flicker 0.15s infinite;
      }

      @keyframes glitch-flicker {
        0%, 90%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
        20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
        40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
        60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
        80% { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
      }

      .shatter-chaos * {
        animation: shatter-random 3s ease-out forwards;
      }

      @keyframes shatter-random {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(400px, 400px) rotate(360deg) scale(2); opacity: 0; }
      }

      .meltdown-chaos {
        animation: meltdown-extreme 2s infinite;
      }

      @keyframes meltdown-extreme {
        0% { transform: rotate(0deg) skew(0deg) scale(1); filter: blur(0px) hue-rotate(0deg); }
        25% { transform: rotate(10deg) skew(5deg) scale(0.9); filter: blur(2px) hue-rotate(90deg); }
        50% { transform: rotate(-15deg) skew(-8deg) scale(1.1); filter: blur(3px) hue-rotate(180deg); }
        75% { transform: rotate(5deg) skew(3deg) scale(0.95); filter: blur(1px) hue-rotate(270deg); }
        100% { transform: rotate(0deg) skew(0deg) scale(1); filter: blur(0px) hue-rotate(360deg); }
      }

      .gravity-chaos * {
        animation: gravity-fall 4s ease-in forwards;
      }

      @keyframes gravity-fall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(150vh) rotate(720deg); opacity: 0; }
      }

      .explode-chaos * {
        animation: explode-extreme 3s ease-out forwards;
      }

      @keyframes explode-extreme {
        0% { transform: scale(1) translate(0, 0) rotate(0deg); opacity: 1; }
        50% { transform: scale(3) translate(200px, 200px) rotate(180deg); }
        100% { transform: scale(0.1) translate(800px, 800px) rotate(720deg); opacity: 0; }
      }

      .zoom-chaos {
        animation: zoom-insane 2s ease-in-out infinite;
      }

      @keyframes zoom-insane {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(5) rotate(90deg); }
        50% { transform: scale(0.1) rotate(180deg); }
        75% { transform: scale(8) rotate(270deg); }
      }

      .portal-chaos {
        animation: portal-vortex 3s linear infinite;
      }

      @keyframes portal-vortex {
        0% { transform: rotate(0deg) scale(1); filter: brightness(1); }
        25% { transform: rotate(900deg) scale(0.2); filter: brightness(2); }
        50% { transform: rotate(1800deg) scale(0.05); filter: brightness(0.5); }
        75% { transform: rotate(2700deg) scale(0.8); filter: brightness(1.5); }
        100% { transform: rotate(3600deg) scale(1); filter: brightness(1); }
      }

      .bleed-chaos * {
        animation: bleed-extreme 4s ease-out forwards;
      }

      @keyframes bleed-extreme {
        0% { transform: translateY(0) skewX(0deg); filter: blur(0px); opacity: 1; }
        50% { transform: translateY(100px) skewX(10deg); filter: blur(2px); opacity: 0.7; }
        100% { transform: translateY(200px) skewX(20deg); filter: blur(5px); opacity: 0.1; }
      }

      .rotate-chaos {
        animation: rotate-madness 3s ease-in-out;
      }

      @keyframes rotate-madness {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(180deg) scale(0.5); }
        50% { transform: rotate(720deg) scale(1.5); }
        75% { transform: rotate(1080deg) scale(0.8); }
        100% { transform: rotate(1440deg) scale(1); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      {/* Canvas for noise effects */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          activeEffects.has('canvas') ? 'opacity-70' : 'opacity-0'
        }`}
      />

      {/* Matrix Rain Effect */}
      {matrixRain.length > 0 && (
        <div className="fixed inset-0 z-[9998] overflow-hidden pointer-events-none">
          {matrixRain.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-green-400 text-sm font-mono animate-pulse"
              style={{
                left: `${drop.x}%`,
                animation: `matrix-fall ${drop.speed}s linear infinite`,
                fontSize: `${Math.random() * 8 + 8}px`,
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}

      {/* Glitch Text Overlay */}
      {glitchText && (
        <div className="fixed inset-0 z-[9997] flex items-center justify-center pointer-events-none">
          <div className="text-red-500 text-6xl font-bold animate-pulse glitch-text bg-black bg-opacity-80 p-8 rounded">
            {glitchText}
          </div>
        </div>
      )}

      {/* Static Lines Effect */}
      {activeEffects.has('static') && (
        <div className="fixed inset-0 z-[9996] pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-white opacity-30 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 0.5 + 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Apply effects to body */}
      <div
        className={`fixed inset-0 pointer-events-none z-[9995] ${
          shakeScreen ? 'animate-shake' : ''
        } ${getEffectClasses(activeEffects)}`}
        style={{
          mixBlendMode: activeEffects.has('invert') ? 'difference' : 'normal',
        }}
      />
    </>
  );
};

// Helper function to get effect classes
function getEffectClasses(activeEffects: Set<EffectName>): string {
  const classes = [];
  if (activeEffects.has('shatter')) classes.push('shatter-chaos');
  if (activeEffects.has('meltdown')) classes.push('meltdown-chaos');
  if (activeEffects.has('gravity')) classes.push('gravity-chaos');
  if (activeEffects.has('explode')) classes.push('explode-chaos');
  if (activeEffects.has('zoom')) classes.push('zoom-chaos');
  if (activeEffects.has('portal')) classes.push('portal-chaos');
  if (activeEffects.has('bleed')) classes.push('bleed-chaos');
  if (activeEffects.has('rotate')) classes.push('rotate-chaos');
  return classes.join(' ');
}

export default ChaosOverlay;