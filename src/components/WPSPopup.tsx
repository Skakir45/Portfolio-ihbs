import { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface WPSPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '971561796442';

const MESSAGES = {
  default:
    'Hello IHBS Team, I am interested in your PRO Service Packages. Please share more details about the Silver and Gold packages.',
  silver:
    'Hello IHBS Team, I am interested in the Silver PRO Package (AED 2,499). Please share the details.',
  gold:
    'Hello IHBS Team, I am interested in the Gold PRO Package (AED 4,399). Please share the details.',
} as const;

type PackageKey = 'silver' | 'gold';

const services = [
  {
    label: 'Company Setup',
    icon: (
      <>
        <path d="M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" />
        <path d="M14 10h4a2 2 0 0 1 2 2v8" />
        <path d="M3 20h18" />
        <path d="M7.5 8h3M7.5 12h3M7.5 16h3" />
      </>
    ),
  },
  {
    label: 'PRO / Visa Services',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="10" r="2.5" />
        <path d="M9 16h6" />
      </>
    ),
  },
  {
    label: 'Trade License',
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <circle cx="12" cy="13.5" r="2.2" />
        <path d="M10.8 15.6 10 18.5l2-1 2 1-.8-2.9" />
      </>
    ),
  },
  {
    label: 'Corporate Support',
    icon: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
        <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19v.5A2.5 2.5 0 0 1 16.5 22H13" />
      </>
    ),
  },
];

function CrownIcon({ variant }: { variant: PackageKey }) {
  const id = `crown-${variant}`;
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {variant === 'gold' ? (
            <>
              <stop offset="0%" stopColor="#F5D77A" />
              <stop offset="100%" stopColor="#D4AF37" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#F2F4F7" />
              <stop offset="100%" stopColor="#9AA4B2" />
            </>
          )}
        </linearGradient>
      </defs>
      <path
        d="M2.6 8.4 6.4 11l2.9-5 2.7 5 2.7-5 2.9 5 3.8-2.6-1.5 8.9a2 2 0 0 1-2 1.7H6.1a2 2 0 0 1-2-1.7L2.6 8.4Z"
        fill={`url(#${id})`}
        stroke={`url(#${id})`}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4.6 20.6h14.8"
        stroke={`url(#${id})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const goldText = {
  backgroundImage: 'linear-gradient(135deg, #F5D77A 0%, #D4AF37 60%, #B8912B 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

export default function WPSPopup({ isOpen, onClose }: WPSPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<PackageKey | null>(null);

  const reduceMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reset = useCallback(() => {
    setSelected(null);
  }, []);

  const handleClose = useCallback(() => {
    if (reduceMotion() || !overlayRef.current || !modalRef.current) {
      reset();
      onClose();
      return;
    }
    gsap.to(modalRef.current, {
      scale: 0.97,
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        reset();
        onClose();
      },
    });
  }, [onClose, reset]);

  // ── Scroll lock + focus management ───────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      window.clearTimeout(focusTimer);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // ── Escape to close + focus trap ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  // ── Cinematic entrance (~0.7s) ───────────────────────────────────────────
  useGSAP(
    () => {
      if (!isOpen || !overlayRef.current || !modalRef.current) return;

      // Respect reduced-motion: no entrance animation at all
      if (reduceMotion()) return;

      const tl = gsap.timeline();

      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
        .fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.96, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          0.04,
        )
        .fromTo(
          '.popup-reveal',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
          0.18,
        )
        // Hand transforms back to CSS so hover elevation still works
        .set('.popup-reveal', { clearProps: 'transform' })
        .set(modalRef.current, { clearProps: 'transform' });
    },
    { dependencies: [isOpen] },
  );

  if (!isOpen) return null;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    selected ? MESSAGES[selected] : MESSAGES.default,
  )}`;

  const packages: {
    key: PackageKey;
    name: string;
    price: string;
    note: string;
  }[] = [
    { key: 'silver', name: 'SILVER', price: 'AED 2,499', note: 'Up to 10 Visas' },
    { key: 'gold', name: 'GOLD', price: 'AED 4,399', note: 'Up to 20 Visas' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center overflow-y-auto overscroll-contain bg-[#071A33]/75 backdrop-blur-[10px] p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-popup-title"
        className="relative w-full min-w-0 max-w-[1040px] max-h-[94dvh] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-t-[24px] sm:rounded-[24px] border border-[#D4AF37]/30 bg-[#071A33]/85 backdrop-blur-[20px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Gold edge highlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent, rgba(245,215,122,0.8), transparent)',
          }}
        />

        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md transition-all duration-200 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/20 hover:text-[#F5D77A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:right-4 sm:top-4"
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>

        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
          {/* ── Left: content ─────────────────────────────────────────────── */}
          <div className="min-w-0 px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8 lg:px-9">
            {/* Header */}
            <div className="popup-reveal flex items-center gap-3 pr-9 sm:pr-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#D4AF37]/40 bg-white shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)]">
                <img
                  src="/images/ihbs_logo.png"
                  alt="IHBS logo"
                  width="40"
                  height="40"
                  className="h-9 w-9 object-contain"
                  loading="eager"
                  decoding="async"
                />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-[13px] font-semibold leading-tight tracking-[0.04em] text-white">
                  IHBS – Insight Hub Business Services
                </p>
                <p className="mt-0.5 text-[11px] tracking-[0.16em] text-[#D4AF37]/90">
                  &ldquo;We Register, You Prosper.&rdquo;
                </p>
              </div>
            </div>

            {/* Headline */}
            <div className="popup-reveal mt-6">
              <h2
                id="pro-popup-title"
                className="font-heading text-[27px] font-bold leading-[1.06] tracking-[-0.02em] text-white sm:text-[34px] lg:text-[36px]"
              >
                PRO SERVICE{' '}
                <span style={goldText} className="whitespace-nowrap">
                  PACKAGES
                </span>
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65 sm:text-[13.5px]">
                Complete Business &amp; PRO Support in the UAE
              </p>
            </div>

            {/* Package cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
              {packages.map((pkg) => {
                const isGold = pkg.key === 'gold';
                const isSelected = selected === pkg.key;
                return (
                  <button
                    key={pkg.key}
                    type="button"
                    onClick={() => setSelected(isSelected ? null : pkg.key)}
                    aria-pressed={isSelected}
                    className={`popup-reveal group relative flex flex-col items-start overflow-hidden rounded-[20px] border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-16px_rgba(212,175,55,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:p-5 ${
                      isSelected
                        ? 'border-[#D4AF37] shadow-[0_0_0_1px_rgba(212,175,55,0.85),0_20px_50px_-18px_rgba(212,175,55,0.6)]'
                        : isGold
                          ? 'border-[#D4AF37]/35'
                          : 'border-white/15'
                    }`}
                    style={{
                      backgroundImage: isGold
                        ? 'linear-gradient(160deg, rgba(212,175,55,0.16) 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.03) 100%)'
                        : 'linear-gradient(160deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%)',
                      boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.14)',
                    }}
                  >
                    <div className="mb-2 flex w-full items-start justify-between">
                      <CrownIcon variant={pkg.key} />
                      {isSelected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]">
                          <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-[#071A33] fill-none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="5 13 10 18 19 7" />
                          </svg>
                        </span>
                      )}
                    </div>

                    <span
                      className="font-heading text-[11.5px] font-semibold tracking-[0.22em]"
                      style={{ color: isGold ? '#F5D77A' : '#D8DEE8' }}
                    >
                      {pkg.name}
                    </span>

                    <span
                      className="mt-1 font-heading text-[25px] font-bold leading-none sm:text-[27px]"
                      style={
                        isGold
                          ? goldText
                          : { color: '#F4F6FA', textShadow: '0 1px 0 rgba(255,255,255,0.18)' }
                      }
                    >
                      {pkg.price}
                    </span>

                    <span className="mt-1.5 text-[12px] text-white/60">{pkg.note}</span>
                  </button>
                );
              })}
            </div>

            {/* Service icons */}
            <div className="popup-reveal mt-5 grid grid-cols-2 gap-x-3 gap-y-3.5 sm:grid-cols-4">
              {services.map((service) => (
                <div key={service.label} className="flex min-w-0 items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px] shrink-0 stroke-[#D4AF37] fill-none"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </svg>
                  <span className="text-[10.5px] font-medium leading-tight text-white/70 break-words">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="popup-reveal group mt-6 flex w-full items-center justify-center gap-2.5 rounded-[14px] px-5 py-3.5 font-heading text-[14px] font-bold text-[#071A33] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(212,175,55,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D77A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A33] active:translate-y-0"
              style={{
                backgroundImage: 'linear-gradient(135deg, #F5D77A 0%, #D4AF37 55%, #C39B2B 100%)',
                boxShadow: '0 10px 30px -12px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.55)',
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.5-.73-2.96-1.17-4.85-4.2-5-4.4-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.3.58-.37.78-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.06.93 2.21.08.15.13.33.03.53-.1.2-.2.33-.39.53-.2.2-.31.32-.44.51-.15.2-.31.42-.14.72.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.17 1.43Z" />
              </svg>
              Enquire on WhatsApp
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>

            <p className="popup-reveal mt-2.5 text-center text-[10.5px] leading-relaxed text-white/40">
              {selected
                ? `${selected === 'gold' ? 'Gold' : 'Silver'} package selected`
                : 'Select a package to tailor your enquiry'}
            </p>
          </div>

          {/* ── Right: Dubai skyline (desktop only) ───────────────────────── */}
          <div className="relative hidden p-3 lg:block">
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-tr-[26px] rounded-bl-[26px] rounded-tl-[130px] rounded-br-[130px]">
              <img
                src="/images/dubai-skyline.jpg"
                alt="Dubai skyline with the Burj Khalifa"
                width="720"
                height="900"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {/* Navy overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, rgba(7,26,51,0.55) 0%, rgba(7,26,51,0.12) 45%, rgba(7,26,51,0.85) 100%)',
                }}
              />
              {/* Gold curved frame */}
              <div className="pointer-events-none absolute inset-3 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-[122px] rounded-br-[122px] border border-[#D4AF37]/55" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(245,215,122,0.18),transparent_55%)]" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-heading text-[10px] font-semibold tracking-[0.26em] text-[#F5D77A]">
                  DUBAI &middot; UAE
                </p>
                <p className="mt-1.5 font-heading text-[15px] font-semibold leading-snug text-white">
                  Trusted PRO partners for
                  <br />
                  ambitious businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
