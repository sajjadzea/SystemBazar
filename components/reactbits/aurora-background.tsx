import React from 'react';

export interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className }) => {
  const classes = ['rb-aurora', className].filter(Boolean).join(' ');

  return (
    <div className={classes} aria-hidden="true">
      <div className="rb-aurora__layer">
        <div className="rb-aurora__blob rb-aurora__blob--one" />
        <div className="rb-aurora__blob rb-aurora__blob--two" />
        <div className="rb-aurora__blob rb-aurora__blob--three" />
        <div className="rb-aurora__blob rb-aurora__blob--four" />
      </div>
      <style jsx global>{`
        .rb-aurora {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
          filter: blur(22px);
          transform: translateZ(0);
        }

        .rb-aurora__layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(94, 234, 212, 0.35), transparent 38%),
            radial-gradient(circle at 80% 10%, rgba(129, 140, 248, 0.35), transparent 34%),
            radial-gradient(circle at 10% 70%, rgba(14, 165, 233, 0.3), transparent 35%),
            radial-gradient(circle at 85% 75%, rgba(99, 102, 241, 0.32), transparent 36%);
          opacity: 0.9;
        }

        .rb-aurora__blob {
          position: absolute;
          width: 55%;
          height: 55%;
          border-radius: 9999px;
          mix-blend-mode: screen;
          animation: rb-aurora-shift 28s ease-in-out infinite;
        }

        .rb-aurora__blob--one {
          top: -8%;
          left: 2%;
          background: radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.35), rgba(59, 130, 246, 0.2), transparent 65%);
          animation-delay: -6s;
        }

        .rb-aurora__blob--two {
          top: 10%;
          right: -12%;
          background: radial-gradient(circle at 70% 30%, rgba(129, 140, 248, 0.42), rgba(236, 72, 153, 0.28), transparent 65%);
          animation-delay: -12s;
        }

        .rb-aurora__blob--three {
          bottom: -14%;
          left: 8%;
          background: radial-gradient(circle at 35% 70%, rgba(14, 165, 233, 0.3), rgba(16, 185, 129, 0.32), transparent 70%);
          animation-delay: -3s;
        }

        .rb-aurora__blob--four {
          bottom: -6%;
          right: 12%;
          background: radial-gradient(circle at 65% 65%, rgba(236, 72, 153, 0.32), rgba(99, 102, 241, 0.34), transparent 70%);
          animation-delay: -18s;
        }

        @keyframes rb-aurora-shift {
          0% {
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          25% {
            transform: translate3d(-18px, -12px, 0px) scale(1.05);
          }
          50% {
            transform: translate3d(12px, 18px, 0px) scale(0.97);
          }
          75% {
            transform: translate3d(-12px, 10px, 0px) scale(1.03);
          }
          100% {
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
