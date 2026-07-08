import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.querySelectorAll('.hero-animate');
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
      }
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/dubai-skyline.jpg"
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to right, rgba(13,27,62,0.88) 35%, rgba(13,27,62,0.4) 65%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] px-6 lg:px-[60px] py-16 lg:py-20 max-w-[560px]"
      >
        <div className="hero-eyebrow hero-animate opacity-0">
          PRO SERVICES IN UAE
        </div>

        <h1 className="hero-animate opacity-0 font-heading text-[clamp(32px,5vw,54px)] font-black leading-[1.1] text-white mb-2.5">
          We Register,
          <span className="block text-sky">You Prosper.</span>
        </h1>

        <p className="hero-animate opacity-0 text-[15px] text-white/80 leading-[1.7] mb-9 max-w-[420px]">
          IHBS provides comprehensive PRO solutions to help businesses start, stay
          compliant, and grow with confidence in the UAE.
        </p>

        <div className="hero-animate opacity-0 flex flex-wrap items-center gap-5">
          <a href="#services" className="btn-primary">
            Explore Our Services
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="2" y1="7" x2="12" y2="7" />
              <polyline points="8,3 12,7 8,11" />
            </svg>
          </a>

          <a href="#" className="inline-flex items-center gap-2.5 text-white no-underline group">
            <div className="w-[38px] h-[38px] rounded-full border-2 border-white/50 flex items-center justify-center transition-colors duration-200 group-hover:border-white">
              <svg
                viewBox="0 0 12 12"
                className="w-3.5 h-3.5 fill-white ml-0.5"
              >
                <polygon points="3,1 11,6 3,11" />
              </svg>
            </div>
            <div>
              <span className="block text-[13px] font-medium">Watch Video</span>
              <small className="block text-[10px] text-white/50 font-normal">
                See how we simplify PRO services for you
              </small>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
