export default function BBLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex items-center justify-center gap-8">
        {/* First B - Left side */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div 
            style={{
              animation: 'bounceB1 1.5s ease-in-out infinite',
              transformStyle: 'preserve-3d'
            }}
          >
            <span 
              className="text-8xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.7))',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                animation: 'colorShift1 3s ease-in-out infinite'
              }}
            >
              B
            </span>
          </div>

          {/* Orbiting particles for first B */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`orbit1-${i}`}
              className="absolute"
              style={{
                animation: 'orbit1 2s linear infinite',
                animationDelay: `${i * -0.5}s`
              }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: '#06b6d4',
                  boxShadow: '0 0 12px rgba(6, 182, 212, 0.9)'
                }}
              ></div>
            </div>
          ))}

          {/* Pulse ring for first B */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: 'pulseRing 2s ease-out infinite'
            }}
          >
            <div 
              className="w-24 h-24 rounded-full border-2"
              style={{
                borderColor: 'rgba(6, 182, 212, 0.4)'
              }}
            ></div>
          </div>
        </div>

        {/* Second B - Right side */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div 
            style={{
              animation: 'bounceB2 1.5s ease-in-out infinite',
              animationDelay: '0.75s',
              transformStyle: 'preserve-3d'
            }}
          >
            <span 
              className="text-8xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.7))',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                animation: 'colorShift2 3s ease-in-out infinite'
              }}
            >
              B
            </span>
          </div>

          {/* Orbiting particles for second B */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`orbit2-${i}`}
              className="absolute"
              style={{
                animation: 'orbit2 2s linear infinite',
                animationDelay: `${i * -0.5}s`
              }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: '#ec4899',
                  boxShadow: '0 0 12px rgba(236, 72, 153, 0.9)'
                }}
              ></div>
            </div>
          ))}

          {/* Pulse ring for second B */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: 'pulseRing 2s ease-out infinite',
              animationDelay: '1s'
            }}
          >
            <div 
              className="w-24 h-24 rounded-full border-2"
              style={{
                borderColor: 'rgba(236, 72, 153, 0.4)'
              }}
            ></div>
          </div>
        </div>

        {/* Connecting wave between the B's */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: 'wave 2s ease-in-out infinite'
          }}
        >
          <svg width="100" height="80" viewBox="0 0 100 80">
            <path 
              d="M10,40 Q30,20 50,40 T90,40" 
              fill="none" 
              stroke="url(#waveGrad)" 
              strokeWidth="3"
              strokeLinecap="round"
            >
              <animate 
                attributeName="d" 
                values="M10,40 Q30,20 50,40 T90,40;
                        M10,40 Q30,60 50,40 T90,40;
                        M10,40 Q30,20 50,40 T90,40"
                dur="2s" 
                repeatCount="indefinite" 
              />
            </path>
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 0.6}} />
                <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 0.6}} />
                <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <style>{`
        @keyframes bounceB1 {
          0%, 100% { 
            transform: translateY(0) rotateY(0deg) scale(1);
          }
          50% { 
            transform: translateY(-20px) rotateY(180deg) scale(1.1);
          }
        }
        
        @keyframes bounceB2 {
          0%, 100% { 
            transform: translateY(0) rotateY(0deg) scale(1);
          }
          50% { 
            transform: translateY(-20px) rotateY(-180deg) scale(1.1);
          }
        }
        
        @keyframes orbit1 {
          0% { 
            transform: rotate(0deg) translateX(45px) rotate(0deg);
          }
          100% { 
            transform: rotate(360deg) translateX(45px) rotate(-360deg);
          }
        }
        
        @keyframes orbit2 {
          0% { 
            transform: rotate(0deg) translateX(45px) rotate(0deg);
          }
          100% { 
            transform: rotate(-360deg) translateX(45px) rotate(360deg);
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(0.7);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes colorShift1 {
          0%, 100% {
            filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 35px rgba(139, 92, 246, 0.9));
          }
        }
        
        @keyframes colorShift2 {
          0%, 100% {
            filter: drop-shadow(0 0 25px rgba(236, 72, 153, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 35px rgba(249, 115, 22, 0.9));
          }
        }
      `}</style>
    </div>
  );
}