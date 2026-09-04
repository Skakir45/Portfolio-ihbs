import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── 3D Service Illustrations (CSS-only) ─────────────────────────────────── */

function ServiceIllustration({ serviceId, color }: { serviceId: string; color: string }) {
  const illustrations: Record<string, JSX.Element> = {
    'trade-license': (
      <div className="relative w-[220px] h-[180px]" style={{ perspective: '500px' }}>
        {/* Building */}
        <div
          className="absolute bottom-0 left-[30px] w-[100px] h-[140px] rounded-t-md"
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
            border: `1px solid ${color}30`,
            transform: 'rotateY(-8deg) rotateX(2deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Windows grid */}
          <div className="grid grid-cols-3 gap-1.5 p-3 pt-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square rounded-sm"
                style={{
                  background: Math.random() > 0.3 ? `${color}50` : `${color}15`,
                  boxShadow: Math.random() > 0.3 ? `0 0 6px ${color}30` : 'none',
                }}
              />
            ))}
          </div>
          {/* Door */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[18px] h-[24px] rounded-t-md" style={{ background: `${color}60` }} />
        </div>
        {/* License doc floating */}
        <div
          className="absolute top-[10px] right-[10px] w-[70px] h-[50px] rounded-md"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.15)',
            transform: 'rotateY(12deg) rotateZ(-5deg)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="p-2 space-y-1">
            <div className="w-full h-[3px] rounded-full" style={{ background: `${color}60` }} />
            <div className="w-3/4 h-[2px] rounded-full bg-white/20" />
            <div className="w-1/2 h-[2px] rounded-full bg-white/15" />
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border" style={{ borderColor: `${color}50` }}>
              <div className="w-full h-full rounded-full" style={{ background: `${color}30` }} />
            </div>
          </div>
        </div>
        {/* Floating sparkle */}
        <div className="absolute top-[5px] left-[60px] w-2 h-2 rounded-full" style={{ background: `${color}60`, boxShadow: `0 0 8px ${color}40` }} />
      </div>
    ),
    'visa': (
      <div className="relative w-[220px] h-[180px]" style={{ perspective: '500px' }}>
        {/* Passport */}
        <div
          className="absolute bottom-[20px] left-[20px] w-[110px] h-[75px] rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${color}50, ${color}25)`,
            border: `1.5px solid ${color}40`,
            transform: 'rotateY(-10deg) rotateX(5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="p-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full" style={{ background: `${color}30`, border: `1px solid ${color}40` }} />
            <div className="space-y-1 flex-1">
              <div className="w-full h-[2px] rounded-full bg-white/30" />
              <div className="w-2/3 h-[2px] rounded-full bg-white/20" />
            </div>
          </div>
          <div className="absolute bottom-2 left-3 right-3 h-[2px] rounded-full" style={{ background: `${color}30` }} />
        </div>
        {/* Visa stamp */}
        <div
          className="absolute top-[15px] right-[15px] w-[65px] h-[65px] rounded-full"
          style={{
            border: `2px solid ${color}50`,
            transform: 'rotate(-15deg)',
          }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: `${color}90` }}>UAE</span>
          </div>
          <div className="absolute inset-2 rounded-full border" style={{ borderColor: `${color}25` }} />
        </div>
        {/* Airplane trail */}
        <svg className="absolute top-[5px] left-[10px] w-[80px] h-[40px] opacity-40" viewBox="0 0 80 40">
          <path d="M5 35 Q20 5 75 8" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="72,5 80,8 72,11" fill={color} opacity="0.6" />
        </svg>
      </div>
    ),
    'document': (
      <div className="relative w-[220px] h-[180px]" style={{ perspective: '500px' }}>
        {/* Document stack */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-lg"
            style={{
              bottom: `${15 + i * 8}px`,
              left: `${25 + i * 10}px`,
              width: '100px',
              height: '130px',
              background: `linear-gradient(135deg, rgba(255,255,255,${0.08 - i * 0.02}), rgba(255,255,255,${0.03 - i * 0.01}))`,
              border: `1px solid ${color}${20 - i * 5}`,
              transform: `rotateY(${-8 + i * 5}deg) rotateZ(${-3 + i * 2}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="p-3 space-y-2">
              <div className="w-full h-[3px] rounded-full" style={{ background: `${color}${40 - i * 10}` }} />
              <div className="w-4/5 h-[2px] rounded-full bg-white/15" />
              <div className="w-3/5 h-[2px] rounded-full bg-white/10" />
              {i === 2 && (
                <div className="mt-4 flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: `${color}50` }} />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Checkmark badge */}
        <div
          className="absolute top-[10px] right-[20px] w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: `${color}30`, border: `1.5px solid ${color}50` }}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
            <polyline points="3.5 8 7 11.5 12.5 5" />
          </svg>
        </div>
      </div>
    ),
    'liaison': (
      <div className="relative w-[220px] h-[180px]" style={{ perspective: '500px' }}>
        {/* Government building */}
        <div
          className="absolute bottom-0 left-[35px] w-[90px] h-[100px]"
          style={{
            transform: 'rotateY(-5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Pediment (triangle) */}
          <div
            className="absolute -top-[25px] left-0 right-0 h-[30px]"
            style={{
              background: `linear-gradient(135deg, ${color}40, ${color}20)`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
          {/* Columns */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-around px-2 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-[6px] rounded-t-sm" style={{ background: `${color}35`, height: '70%' }} />
            ))}
          </div>
          {/* Base */}
          <div className="absolute bottom-0 left-[-5px] right-[-5px] h-[12px] rounded-sm" style={{ background: `${color}30` }} />
        </div>
        {/* Handshake */}
        <div className="absolute top-[20px] right-[15px]">
          <svg viewBox="0 0 50 40" className="w-[50px] h-[40px]" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6">
            <path d="M5 20h8l6-8h10l6 8h8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 20l4 12M33 20l-4 12" strokeLinecap="round" />
            <circle cx="25" cy="12" r="3" fill={color} opacity="0.3" />
          </svg>
        </div>
        {/* Connection lines */}
        <svg className="absolute bottom-[30px] right-[10px] w-[60px] h-[30px] opacity-30" viewBox="0 0 60 30">
          <circle cx="10" cy="15" r="4" fill={color} opacity="0.4" />
          <circle cx="30" cy="8" r="3" fill={color} opacity="0.3" />
          <circle cx="50" cy="18" r="4" fill={color} opacity="0.4" />
          <line x1="14" y1="15" x2="27" y2="8" stroke={color} strokeWidth="1" />
          <line x1="33" y1="8" x2="46" y2="18" stroke={color} strokeWidth="1" />
        </svg>
      </div>
    ),
    'emirates-id': (
      <div className="relative w-[220px] h-[180px]" style={{ perspective: '500px' }}>
        {/* ID Card */}
        <div
          className="absolute bottom-[30px] left-[25px] w-[140px] h-[85px] rounded-lg overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}35, ${color}15)`,
            border: `1.5px solid ${color}35`,
            transform: 'rotateY(-8deg) rotateX(3deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Holographic strip */}
          <div className="absolute top-0 left-0 right-0 h-[25px]" style={{ background: `linear-gradient(90deg, ${color}20, transparent, ${color}15)` }} />
          {/* Photo area */}
          <div className="absolute top-[30px] left-[10px] w-[25px] h-[30px] rounded-sm" style={{ background: `${color}25`, border: `1px solid ${color}30` }} />
          {/* Text lines */}
          <div className="absolute top-[32px] left-[42px] space-y-1.5">
            <div className="w-[55px] h-[3px] rounded-full" style={{ background: `${color}40` }} />
            <div className="w-[40px] h-[2px] rounded-full bg-white/20" />
            <div className="w-[50px] h-[2px] rounded-full bg-white/15" />
          </div>
          {/* Chip */}
          <div className="absolute bottom-[10px] left-[10px] w-[14px] h-[10px] rounded-sm" style={{ background: `${color}40`, border: `1px solid ${color}50` }} />
          {/* EMIRATES ID text */}
          <div className="absolute bottom-[10px] right-[10px]">
            <span className="text-[6px] font-bold tracking-[1px] uppercase" style={{ color: `${color}70` }}>EMIRATES ID</span>
          </div>
        </div>
        {/* Floating shield */}
        <div
          className="absolute top-[10px] right-[20px] w-[45px] h-[50px]"
          style={{ transform: 'rotateY(10deg)' }}
        >
          <svg viewBox="0 0 40 48" className="w-full h-full" fill="none">
            <path d="M20 4L4 12v14c0 10 16 18 16 18s16-8 16-18V12L20 4z" fill={`${color}15`} stroke={color} strokeWidth="1.5" opacity="0.5" />
            <polyline points="14 24 18 28 26 18" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>
    ),
    'pro': (
      <div className="relative w-[220px] h-[180px]" style={{ perspective: '500px' }}>
        {/* Clipboard */}
        <div
          className="absolute bottom-[15px] left-[30px] w-[100px] h-[130px] rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}12)`,
            border: `1.5px solid ${color}25`,
            transform: 'rotateY(-6deg) rotateZ(2deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Clip */}
          <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-[30px] h-[16px] rounded-t-md" style={{ background: `${color}40`, border: `1px solid ${color}35` }} />
          {/* Checklist */}
          <div className="p-3 pt-5 space-y-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: i < 3 ? `${color}40` : 'transparent', border: `1px solid ${color}35` }}
                >
                  {i < 3 && (
                    <svg viewBox="0 0 10 10" className="w-2 h-2" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <polyline points="2 5 4.5 7.5 8 3" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 h-[2px] rounded-full" style={{ background: `${color}${25 - i * 5}` }} />
              </div>
            ))}
          </div>
        </div>
        {/* Gear icon */}
        <div className="absolute top-[10px] right-[20px]" style={{ animation: 'spin 8s linear infinite' }}>
          <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
            <circle cx="18" cy="18" r="6" />
            <path d="M18 4v4M18 28v4M4 18h4M28 18h4M8.5 8.5l2.8 2.8M24.7 24.7l2.8 2.8M27.5 8.5l-2.8 2.8M11.3 24.7l-2.8 2.8" />
          </svg>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    ),
  };

  return illustrations[serviceId] || null;
}

/* ─── Service Data ────────────────────────────────────────────────────────── */

const services = [
  {
    id: 'trade-license',
    title: 'Trade License',
    shortTitle: 'Trade License',
    tagline: 'Start Your Business',
    desc: 'Hassle-free company setup and licensing for mainland, free zone, and offshore entities in the UAE. We handle everything from application to approval.',
    features: ['Mainland trade license', 'Free zone formation', 'Offshore company setup', 'License renewal & amendments'],
    color: '#3b82f6',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="6" width="32" height="36" rx="3" />
        <path d="M8 16h32M16 6v10M32 6v10M14 24h8M14 30h12M14 36h6" />
        <circle cx="34" cy="34" r="6" fill="none" strokeWidth="1.5" />
        <path d="M34 31v6M31 34h6" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'visa',
    title: 'Visa & Immigration',
    shortTitle: 'Visa',
    tagline: 'Travel With Ease',
    desc: 'End-to-end visa solutions for you and your team — from employment visas to investor visas and family sponsorship.',
    features: ['Employment visa processing', 'Investor & partner visas', 'Family sponsorship', 'Visit & tourist visas'],
    color: '#8b5cf6',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="10" width="40" height="28" rx="4" />
        <circle cx="16" cy="24" r="5" />
        <path d="M24 20h14M24 26h10M24 32h12" />
        <path d="M4 18h40" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    id: 'document',
    title: 'Document Clearing',
    shortTitle: 'Documents',
    tagline: 'Process With Speed',
    desc: 'Fast and efficient government document processing, attestation, and legalization for all types of business and personal documents.',
    features: ['Document attestation', 'MOFA attestation', 'Embassy attestation', 'Translation & notarization'],
    color: '#06b6d4',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M28 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V16L28 4z" />
        <polyline points="28 4 28 16 40 16" />
        <path d="M16 26h12M16 32h8" strokeWidth="1.8" />
        <path d="M32 28l4 4-4 4" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'liaison',
    title: 'Gov. Liaison',
    shortTitle: 'Liaison',
    tagline: 'Connect With Authority',
    desc: 'Strong connections with UAE government bodies for smoother, faster approvals. We act as your bridge to official authorities.',
    features: ['DLD & DED liaison', 'Ministry approvals', 'Municipality coordination', 'Customs clearances'],
    color: '#f59e0b',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4L6 14v6h36v-6L24 4z" />
        <rect x="10" y="22" width="6" height="16" rx="1" />
        <rect x="21" y="22" width="6" height="16" rx="1" />
        <rect x="32" y="22" width="6" height="16" rx="1" />
        <rect x="4" y="40" width="40" height="4" rx="1" />
      </svg>
    ),
  },
  {
    id: 'emirates-id',
    title: 'Emirates ID',
    shortTitle: 'Emirates ID',
    tagline: 'Identity Secured',
    desc: 'Complete support for Emirates ID applications, renewals, and amendments — ensuring compliance with UAE identity regulations.',
    features: ['New ID application', 'ID renewal processing', 'Address amendments', 'Biometric booking'],
    color: '#10b981',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="10" width="40" height="28" rx="4" />
        <circle cx="18" cy="24" r="6" />
        <path d="M28 18h10M28 24h8M28 30h10" />
        <rect x="8" y="14" width="4" height="4" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'pro',
    title: 'Other PRO',
    shortTitle: 'PRO',
    tagline: 'Complete Support',
    desc: 'Comprehensive PRO support for your business including labor cards, WPS registration, and ongoing compliance management.',
    features: ['Labor card processing', 'WPS registration', 'PRO retainer services', 'Compliance management'],
    color: '#ef4444',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 44V20h8v24" />
        <path d="M28 44V8h8v36" />
        <path d="M4 44h40" strokeWidth="2" />
        <circle cx="16" cy="14" r="4" />
        <path d="M32 4v4M28 8h8" strokeWidth="1.5" />
      </svg>
    ),
  },
];

/* ─── Main Component ──────────────────────────────────────────────────────── */

export default function LuxuryServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  // ─── Column entrance animations ───────────────────────────────────────────
  useGSAP(() => {
    if (!columnsRef.current) return;
    const cols = columnsRef.current.querySelectorAll('.svc-octo-col');

    gsap.fromTo(
      cols,
      { y: 60, opacity: 0, rotateY: -15 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  // ─── Detail panel animation ───────────────────────────────────────────────
  useGSAP(() => {
    if (!activeService || !detailRef.current) return;

    const service = services.find((s) => s.id === activeService);
    if (!service) return;

    const tl = gsap.timeline();

    tl.fromTo(
      detailRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
    );

    const items = detailRef.current.querySelectorAll('.detail-animate');
    tl.fromTo(
      items,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );

    const features = detailRef.current.querySelectorAll('.feat-item');
    tl.fromTo(
      features,
      { x: 15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'power2.out' },
      '-=0.2'
    );

    // Illustration entrance
    const illustration = detailRef.current.querySelector('.svc-illustration');
    if (illustration) {
      tl.fromTo(
        illustration,
        { opacity: 0, scale: 0.85, rotateY: -10 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: 'back.out(1.2)' },
        '-=0.5'
      );
    }
  }, { dependencies: [activeService] });

  // ─── 3D Tilt Handler ──────────────────────────────────────────────────────
  const handleTilt = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = y * -15;
    const tiltY = x * 15;

    const inner = el.querySelector('.octo-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05,1.05,1.05)`;
    }
  }, []);

  const handleTiltReset = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const inner = e.currentTarget.querySelector('.octo-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
  }, []);

  const handleServiceClick = (id: string) => {
    if (activeService === id) {
      if (detailRef.current) {
        gsap.to(detailRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.97,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => setActiveService(null),
        });
      }
    } else {
      setActiveService(id);
    }
  };

  const active = services.find((s) => s.id === activeService);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0f1e 0%, #0d1530 40%, #111d3d 100%)',
      }}
    >
      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue/[0.03] blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple/[0.04] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-[1] max-w-[1300px] mx-auto px-6 lg:px-[60px]">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-10 h-px bg-gradient-to-r from-transparent to-blue" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-blue">
              Premium Solutions
            </span>
            <span className="block w-10 h-px bg-gradient-to-l from-transparent to-blue" />
          </div>
          <h2 className="font-heading text-[clamp(26px,3.5vw,42px)] font-black text-white leading-[1.15] mb-4">
            Our <span className="bg-gradient-to-r from-blue via-sky to-blue bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-[14.5px] text-white/50 max-w-[480px] mx-auto leading-[1.7]">
            Comprehensive PRO solutions crafted for businesses that demand excellence.
          </p>
        </div>

        {/* ── Octagonal Columns Grid ── */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-4 mb-10"
          style={{ perspective: '800px' }}
        >
          {services.map((service) => {
            const isActive = activeService === service.id;

            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltReset}
                className={`svc-octo-col group relative cursor-pointer text-left transition-all duration-300`}
              >
                {/* ── Octagonal Column with Tilt ── */}
                <div
                  className="octo-inner relative mx-auto transition-transform duration-300 ease-out"
                  style={{
                    width: '100%',
                    maxWidth: '160px',
                    aspectRatio: '1 / 1.35',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Octagon shape */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      background: isActive
                        ? `linear-gradient(135deg, ${service.color}30 0%, ${service.color}15 50%, ${service.color}08 100%)`
                        : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    }}
                  />

                  {/* Inner glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      background: `radial-gradient(circle at 50% 40%, ${service.color}20 0%, transparent 70%)`,
                    }}
                  />

                  {/* Border */}
                  <div
                    className="absolute inset-[1px] transition-all duration-500"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      border: `1.5px solid ${isActive ? service.color + '60' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-3 py-6">
                    <div
                      className="w-12 h-12 mb-3 flex items-center justify-center transition-all duration-500"
                      style={{
                        color: isActive ? service.color : 'rgba(255,255,255,0.5)',
                        filter: isActive ? `drop-shadow(0 0 10px ${service.color}40)` : 'none',
                      }}
                    >
                      {service.icon}
                    </div>
                    <h3
                      className="text-[11px] font-bold text-center leading-tight transition-colors duration-500 uppercase tracking-wider"
                      style={{ color: isActive ? service.color : 'rgba(255,255,255,0.6)' }}
                    >
                      {service.shortTitle}
                    </h3>
                    <p className="text-[9px] text-white/30 mt-1 tracking-wider uppercase">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: service.color, boxShadow: `0 0 8px ${service.color}` }}
                    />
                  )}
                </div>

                {/* Glow behind */}
                <div
                  className="absolute inset-0 -z-10 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* ── Active Service Detail Panel ── */}
        {active && (
          <div ref={detailRef} className="relative max-w-[960px] mx-auto">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: `1px solid ${active.color}25`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-6 items-center">
                  {/* Left: Info */}
                  <div>
                    <div className="detail-animate flex items-center gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${active.color}20, ${active.color}08)`,
                          border: `1px solid ${active.color}30`,
                          color: active.color,
                        }}
                      >
                        {active.icon}
                      </div>
                      <div>
                        <h3 className="font-heading text-[20px] font-bold text-white">{active.title}</h3>
                        <p className="text-[12px] tracking-wider uppercase" style={{ color: active.color }}>{active.tagline}</p>
                      </div>
                    </div>

                    <p className="detail-animate text-[14px] text-white/60 leading-[1.75] mb-6">{active.desc}</p>

                    <div className="detail-animate mb-6">
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${active.color}, ${active.color}cc)`,
                          color: '#fff',
                          boxShadow: `0 4px 20px ${active.color}30`,
                        }}
                      >
                        Get Started
                        <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <line x1="2" y1="7" x2="12" y2="7" />
                          <polyline points="8,3 12,7 8,11" />
                        </svg>
                      </button>
                    </div>

                    <p className="detail-animate text-[11px] font-semibold tracking-[2px] uppercase text-white/40 mb-3">
                      What's Included
                    </p>
                    <div className="space-y-2.5">
                      {active.features.map((feat) => (
                        <div
                          key={feat}
                          className="feat-item flex items-center gap-3 p-2.5 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${active.color}15` }}>
                            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke={active.color} strokeWidth="2.5" strokeLinecap="round">
                              <polyline points="3.5 8 7 11.5 12.5 5" />
                            </svg>
                          </div>
                          <span className="text-[12.5px] text-white/70">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: 3D Illustration */}
                  <div className="flex items-center justify-center svc-illustration">
                    <div
                      className="relative w-full max-w-[240px] aspect-square rounded-2xl flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${active.color}08 0%, transparent 70%)`,
                      }}
                    >
                      <ServiceIllustration serviceId={active.id} color={active.color} />
                      {/* Orbit ring */}
                      <div
                        className="absolute inset-4 rounded-full border border-dashed opacity-15"
                        style={{ borderColor: active.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${active.color}60, transparent)` }} />
            </div>
          </div>
        )}

        {/* ── View All ── */}
        {!activeService && (
          <div className="text-center mt-10">
            <a
              href="/services"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/50 hover:text-blue transition-colors duration-200"
            >
              View All Services
              <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="7" x2="12" y2="7" />
                <polyline points="8,3 12,7 8,11" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
