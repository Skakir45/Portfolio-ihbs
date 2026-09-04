import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const TOTAL_FLOORS = 8;
const FLOOR_HEIGHT = 48;
const BUILDING_WIDTH = 180;
const BUILDING_DEPTH = 120;

export default function BuildingAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [showOffice, setShowOffice] = useState(false);

  // ─── 3D Building Construction Animation ───────────────────────────────────
  useGSAP(() => {
    if (!sceneRef.current) return;

    const foundation = sceneRef.current.querySelector('.bld-foundation');
    const floors = sceneRef.current.querySelectorAll('.bld-floor');
    const windows = sceneRef.current.querySelectorAll('.bld-window');
    const roof = sceneRef.current.querySelector('.bld-roof');
    const crane = sceneRef.current.querySelector('.bld-crane');
    const dustParticles = sceneRef.current.querySelectorAll('.bld-dust');

    const tl = gsap.timeline({
      onComplete: () => {
        // After building is complete, transition to office image
        setTimeout(() => setShowOffice(true), 800);
      },
    });

    // ── Phase 1: Foundation ──
    tl.fromTo(foundation, { scaleY: 0, opacity: 0 }, {
      scaleY: 1, opacity: 1, duration: 0.6, ease: 'power3.out',
    });

    // ── Phase 2: Crane appears ──
    tl.fromTo(crane, { scaleY: 0, transformOrigin: 'bottom center' }, {
      scaleY: 1, duration: 0.8, ease: 'power2.out',
    }, '-=0.3');

    // ── Phase 3: Floors build up one by one ──
    floors.forEach((floor, i) => {
      tl.fromTo(floor,
        { scaleX: 0, scaleY: 0, opacity: 0, transformOrigin: 'bottom center' },
        {
          scaleX: 1, scaleY: 1, opacity: 1,
          duration: 0.35,
          ease: 'back.out(1.7)',
        },
        i === 0 ? '-=0.2' : '-=0.15'
      );

      // Dust particle burst per floor
      if (dustParticles[i]) {
        tl.fromTo(dustParticles[i],
          { opacity: 0.8, scale: 0.5 },
          { opacity: 0, scale: 1.5, duration: 0.5, ease: 'power2.out' },
          '-=0.25'
        );
      }
    });

    // ── Phase 4: Windows light up ──
    tl.fromTo(windows,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1, scale: 1,
        duration: 0.3,
        stagger: { each: 0.04, from: 'bottom' },
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // ── Phase 5: Roof lands ──
    tl.fromTo(roof,
      { y: -80, opacity: 0, rotateX: -20 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.6,
        ease: 'bounce.out',
      },
      '-=0.2'
    );

    // ── Phase 6: Crane retracts ──
    tl.to(crane, {
      scaleY: 0, duration: 0.5, ease: 'power2.in',
    }, '-=0.1');

    // ── Phase 7: Subtle building pulse (completion) ──
    tl.to(sceneRef.current.querySelector('.bld-body'), {
      boxShadow: '0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.2)',
      duration: 0.8,
      ease: 'power2.inOut',
    });

  }, { scope: sceneRef });

  // ─── Office image fade-in ─────────────────────────────────────────────────
  useGSAP(() => {
    if (!showOffice || !containerRef.current) return;
    const overlay = containerRef.current.querySelector('.office-reveal');
    if (overlay) {
      gsap.fromTo(overlay,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, { dependencies: [showOffice] });

  return (
    <div ref={containerRef} className="relative w-full h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-b from-navy via-[#0f2347] to-[#162d5a]">
      {/* ── Starfield background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              opacity: 0.2 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Ground / Cityscape silhouette ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px]">
        <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
          <rect x="0" y="60" width="1200" height="60" fill="#0a1628" />
          {/* Background buildings silhouette */}
          <rect x="50" y="30" width="60" height="90" fill="#0d1f3c" rx="2" />
          <rect x="130" y="45" width="40" height="75" fill="#0d1f3c" rx="2" />
          <rect x="190" y="20" width="50" height="100" fill="#0d1f3c" rx="2" />
          <rect x="260" y="50" width="35" height="70" fill="#0d1f3c" rx="2" />
          <rect x="900" y="35" width="55" height="85" fill="#0d1f3c" rx="2" />
          <rect x="980" y="50" width="45" height="70" fill="#0d1f3c" rx="2" />
          <rect x="1050" y="25" width="60" height="95" fill="#0d1f3c" rx="2" />
          <rect x="1130" y="55" width="40" height="65" fill="#0d1f3c" rx="2" />
        </svg>
      </div>

      {/* ── 3D Building Scene ── */}
      <div
        ref={sceneRef}
        className="absolute bottom-[100px] left-1/2 -translate-x-1/2"
        style={{ perspective: '800px', perspectiveOrigin: '50% 40%' }}
      >
        <div
          className="bld-body relative"
          style={{
            width: `${BUILDING_WIDTH}px`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-8deg) rotateY(-15deg)',
          }}
        >
          {/* Foundation */}
          <div
            className="bld-foundation absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm"
            style={{
              width: `${BUILDING_WIDTH + 30}px`,
              height: '16px',
              background: 'linear-gradient(to right, #1e3a5f, #2a4a72, #1e3a5f)',
              transformOrigin: 'bottom center',
            }}
          />

          {/* Floors */}
          <div className="relative" style={{ paddingBottom: `${TOTAL_FLOORS * FLOOR_HEIGHT + 30}px` }}>
            {Array.from({ length: TOTAL_FLOORS }).map((_, i) => {
              const isTop = i === TOTAL_FLOORS - 1;
              const floorY = (TOTAL_FLOORS - 1 - i) * FLOOR_HEIGHT;
              const hue = 210 + i * 3;
              const lightness = 18 + i * 2;

              return (
                <div key={i}>
                  {/* Floor slab */}
                  <div
                    className="bld-floor absolute"
                    style={{
                      bottom: `${floorY}px`,
                      left: '0',
                      width: `${BUILDING_WIDTH}px`,
                      height: `${FLOOR_HEIGHT - 2}px`,
                      background: `linear-gradient(180deg, hsl(${hue}, 55%, ${lightness}%) 0%, hsl(${hue}, 50%, ${lightness - 4}%) 100%)`,
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderTop: i === 0 ? '2px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Front face highlight */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%)',
                      }}
                    />
                  </div>

                  {/* Windows for this floor */}
                  {Array.from({ length: 5 }).map((_, wi) => {
                    const winWidth = 22;
                    const winHeight = 28;
                    const gap = (BUILDING_WIDTH - 5 * winWidth) / 6;
                    const x = gap + wi * (winWidth + gap);
                    const isLit = Math.random() > 0.3;

                    return (
                      <div
                        key={wi}
                        className="bld-window absolute"
                        style={{
                          bottom: `${floorY + 8}px`,
                          left: `${x}px`,
                          width: `${winWidth}px`,
                          height: `${winHeight}px`,
                          background: isLit
                            ? 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 40%, #d97706 100%)'
                            : 'linear-gradient(180deg, #1a2744 0%, #0f1b30 100%)',
                          borderRadius: '2px',
                          boxShadow: isLit
                            ? '0 0 8px rgba(251,191,36,0.4), inset 0 0 4px rgba(251,191,36,0.2)'
                            : 'inset 0 0 3px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}

            {/* Roof */}
            <div
              className="bld-roof absolute"
              style={{
                bottom: `${TOTAL_FLOORS * FLOOR_HEIGHT}px`,
                left: '-10px',
                width: `${BUILDING_WIDTH + 20}px`,
                height: '20px',
                background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '4px 4px 0 0',
                transformOrigin: 'bottom center',
                transform: 'rotateX(0deg)',
              }}
            >
              {/* Antenna / Spire */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-[35px]"
                style={{
                  width: '4px',
                  height: '35px',
                  background: 'linear-gradient(to top, #3b82f6, #93c5fd)',
                  borderRadius: '2px 2px 0 0',
                }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-[40px] w-2 h-2 rounded-full bg-red-500"
                style={{ boxShadow: '0 0 8px rgba(239,68,68,0.6)' }}
              />
            </div>

            {/* Crane */}
            <div
              className="bld-crane absolute"
              style={{
                bottom: `${TOTAL_FLOORS * FLOOR_HEIGHT + 20}px`,
                left: `${BUILDING_WIDTH + 20}px`,
                width: '4px',
                height: '160px',
                background: 'linear-gradient(to top, #f59e0b, #fbbf24)',
                transformOrigin: 'bottom center',
              }}
            >
              {/* Crane arm */}
              <div
                className="absolute top-0 -left-[60px]"
                style={{
                  width: '120px',
                  height: '3px',
                  background: '#f59e0b',
                }}
              />
              {/* Crane hook cable */}
              <div
                className="absolute top-[3px] left-[50px]"
                style={{
                  width: '2px',
                  height: '40px',
                  background: '#94a3b8',
                }}
              />
              <div
                className="absolute top-[43px] left-[46px]"
                style={{
                  width: '10px',
                  height: '12px',
                  border: '2px solid #94a3b8',
                  borderTop: 'none',
                  borderRadius: '0 0 3px 3px',
                }}
              />
              {/* Crane cabin */}
              <div
                className="absolute -bottom-[20px] -left-[8px]"
                style={{
                  width: '20px',
                  height: '20px',
                  background: '#f59e0b',
                  borderRadius: '3px',
                }}
              />
            </div>

            {/* Dust particles (one per floor) */}
            {Array.from({ length: TOTAL_FLOORS }).map((_, i) => (
              <div
                key={i}
                className="bld-dust absolute pointer-events-none"
                style={{
                  bottom: `${i * FLOOR_HEIGHT}px`,
                  left: `${BUILDING_WIDTH * 0.2}px`,
                  width: `${BUILDING_WIDTH * 0.6}px`,
                  height: '20px',
                  opacity: 0,
                }}
              >
                {Array.from({ length: 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="absolute rounded-full bg-amber-200/40"
                    style={{
                      width: `${4 + Math.random() * 8}px`,
                      height: `${4 + Math.random() * 8}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Status Text ── */}
      <div className="absolute bottom-[140px] left-1/2 -translate-x-1/2 text-center">
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-blue/70 mb-1">
          Building Your Success
        </p>
        <div className="flex items-center gap-2 justify-center">
          <span className="block w-8 h-px bg-blue/30" />
          <span className="text-[10px] text-white/30 tracking-wider">IHBS</span>
          <span className="block w-8 h-px bg-blue/30" />
        </div>
      </div>

      {/* ── Office Image Reveal ── */}
      {showOffice && (
        <div className="office-reveal absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Gradient overlay behind image */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(13,27,62,0.85) 0%, rgba(13,27,62,0.6) 50%, rgba(59,130,246,0.3) 100%)',
              }}
            />
            {/* Office image */}
            <img
              src="/images/office-interior.jpg"
              alt="IHBS Office — Where your business finds its home"
              className="w-full h-full object-cover"
            />
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="block w-8 h-px bg-sky" />
                  <span className="text-[11px] font-semibold tracking-[3px] uppercase text-sky">
                    Welcome to
                  </span>
                  <span className="block w-8 h-px bg-sky" />
                </div>
                <h2 className="font-heading text-[clamp(32px,5vw,56px)] font-black text-white leading-[1.1] mb-3">
                  IHBS
                </h2>
                <p className="text-[14px] text-white/70 max-w-[360px] mx-auto leading-[1.6]">
                  Insight Hub Business Services — your trusted PRO partner in the UAE
                </p>
                <div className="mt-6 flex items-center gap-3 justify-center">
                  <span className="block w-12 h-px bg-white/20" />
                  <span className="text-[10px] text-white/40 tracking-[2px] uppercase">We Register, You Prosper</span>
                  <span className="block w-12 h-px bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Twinkle keyframes (injected) ── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
