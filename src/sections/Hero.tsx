import { useRef, useEffect, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface MousePosition {
  x: number;
  y: number;
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const watchVideoRef = useRef<HTMLAnchorElement>(null);

  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  // ─── Mouse parallax tracker ─────────────────────────────────────────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // ─── Creates and animates floating particles inside useGSAP ───────────────
  const createParticles = useCallback(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const shapes = ['circle', 'diamond', 'ring'];
    const colors = ['rgba(147,197,253,0.3)', 'rgba(255,255,255,0.08)', 'rgba(147,197,253,0.15)'];

    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      const shape = shapes[i % shapes.length];
      const size = 6 + Math.random() * 18;
      const color = colors[i % colors.length];
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;

      el.className = 'particle';

      if (shape === 'circle') {
        el.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${xPos}%;
          top: ${yPos}%;
          pointer-events: none;
          border-radius: 50%;
          background: ${color};
        `;
      } else if (shape === 'diamond') {
        el.style.cssText = `
          position: absolute;
          left: ${xPos}%;
          top: ${yPos}%;
          pointer-events: none;
          width: 0;
          height: 0;
          border-left: ${size / 2}px solid transparent;
          border-right: ${size / 2}px solid transparent;
          border-bottom: ${size}px solid ${color};
          background: none;
        `;
      } else if (shape === 'ring') {
        el.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${xPos}%;
          top: ${yPos}%;
          pointer-events: none;
          border-radius: 50%;
          border: 1.5px solid ${color};
          background: none;
        `;
      }

      container.appendChild(el);
    }
  }, []);

  // ─── GSAP Master Timeline ────────────────────────────────────────────────
  useGSAP(() => {
    if (!contentRef.current || !bgRef.current || !overlayRef.current) return;

    // Create particle DOM elements before animating them
    createParticles();

    let ctx = gsap.context(() => {
      // ── Entrance animations ──
      const elements = contentRef.current!.querySelectorAll('.hero-animate');
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.18,
          delay: 0.3,
        }
      );

      // ── Scroll parallax: background ──
      gsap.to(bgRef.current, {
        y: '25%',
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // ── Scroll parallax: overlay ──
      gsap.to(overlayRef.current, {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // ── Scroll parallax: content ──
      gsap.to(contentRef.current, {
        y: '6%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // ── Scroll progress bar ──
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // ── Floating particles animation ──
      const particles = particlesRef.current?.querySelectorAll('.particle');
      if (particles) {
        particles.forEach((p) => {
          const xDrift = (Math.random() - 0.5) * 120;
          const yDrift = (Math.random() - 0.5) * 120 + 30;
          const duration = 5 + Math.random() * 6;
          const pDelay = Math.random() * 4;

          gsap.set(p, {
            opacity: 0.4 + Math.random() * 0.4,
            scale: 0.3 + Math.random() * 0.7,
          });

          gsap.to(p, {
            x: xDrift,
            y: yDrift,
            rotation: Math.random() > 0.5 ? 360 : -360,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: pDelay,
          });
        });
      }

      // ── Watch Video button pulse ──
      if (watchVideoRef.current) {
        gsap.to(watchVideoRef.current.querySelector('.play-pulse'), {
          scale: 1.15,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, { scope: heroRef });

  // ─── Mouse parallax effect (tilt via transforms) ────────────────────────
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;
    const intensity = 8;
    const overlayTiltX = mousePos.y * intensity * 0.4;
    const overlayTiltY = mousePos.x * intensity * 0.4;
    const contentTiltX = mousePos.y * intensity * 0.6;
    const contentTiltY = mousePos.x * intensity * 0.6;

    gsap.to(overlayRef.current, {
      x: overlayTiltY,
      y: overlayTiltX,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(contentRef.current, {
      x: contentTiltY,
      y: contentTiltX,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [mousePos]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[90vh] lg:min-h-[85vh] flex items-center"
    >
      {/* ── Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-navy/10">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0"
          style={{
            background: 'linear-gradient(90deg, #1A56DB, #93C5FD, #1A56DB)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* ── Background Video with parallax ── */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <div className="absolute inset-0 bg-navy/10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/dubai-skyline.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/skyline-construction.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Gradient Overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] will-change-transform"
        style={{
          background:
            'linear-gradient(to right, rgba(13,27,62,0.92) 30%, rgba(13,27,62,0.5) 60%, rgba(13,27,62,0.15) 100%)',
        }}
      />

      {/* ── Bottom gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(13,27,62,0.6), transparent)',
        }}
      />

      {/* ── Floating Particles Container ── */}
      <div
        ref={particlesRef}
        className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative z-[3] px-6 lg:px-[60px] py-20 lg:py-24 max-w-[620px]" 
      >
        {/* Eyebrow */}
        <div className="hero-eyebrow hero-animate opacity-0">
          <span className="inline-block w-6 h-[2px] bg-sky mr-2" />
          PRO SERVICES IN UAE
        </div>

        {/* Heading */}
        <h1 className="hero-animate opacity-0 font-heading text-[clamp(36px,5.5vw,58px)] font-black leading-[1.1] text-white mb-3 tracking-tight">
          We Register,
          <span className="block bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
            You Prosper.
          </span>
        </h1>

        {/* Description */}
        <p className="hero-animate opacity-0 text-[15px] md:text-[16px] text-white/75 leading-[1.75] mb-10 max-w-[480px]">
          IHBS provides comprehensive PRO solutions to help businesses start, stay
          compliant, and grow with confidence in the UAE.
        </p>

        {/* CTA Buttons */}
        <div className="hero-animate opacity-0 flex flex-wrap items-center gap-5">
          {/* Primary CTA */}
          <a
            href="#services"
            className="group relative inline-flex items-center gap-2.5 bg-blue text-white px-8 py-4 rounded-lg font-body text-[14px] font-semibold transition-all duration-300 hover:bg-blue/90 hover:shadow-lg hover:shadow-blue/25 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <span className="relative z-[1]">Explore Our Services</span>
            <svg
              className="relative z-[1] w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </a>

          {/* Watch Video */}
          <a
            ref={watchVideoRef}
            href="#"
            className="inline-flex items-center gap-3 text-white no-underline group"
          >
            <div className="play-pulse w-[42px] h-[42px] rounded-full border-2 border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-white/10">
              <svg
                viewBox="0 0 12 12"
                className="w-4 h-4 fill-white ml-0.5"
              >
                <polygon points="3,1 11,6 3,11" />
              </svg>
            </div>
            <div className="transition-transform duration-300 group-hover:translate-x-0.5">
              <span className="block text-[13px] font-medium leading-tight">Watch Video</span>
              <small className="block text-[10px] text-white/50 font-normal leading-tight mt-0.5">
                See how we simplify PRO services for you
              </small>
            </div>
          </a>
        </div>

        {/* Bottom decorative line */}
        <div className="hero-animate opacity-0 mt-16 flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[2px] uppercase text-white/40">
            Trusted by 500+ businesses
          </span>
          <span className="flex-1 h-px max-w-[80px] bg-white/10" />
        </div>
      </div>
    </section>
  );
}

