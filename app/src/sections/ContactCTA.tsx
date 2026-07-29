import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const content = sectionRef.current.querySelector('.cta-content');
    gsap.fromTo(
      content,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-16 lg:py-20 px-6 lg:px-[60px]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-blue/90" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue/20 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="cta-content opacity-0 relative z-[1] max-w-[800px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-sky mb-5">
          <span className="w-6 h-px bg-sky/50" />
          Get Started Today
          <span className="w-6 h-px bg-sky/50" />
        </div>

        <h2 className="font-heading text-[clamp(24px,3.5vw,42px)] font-extrabold text-white leading-[1.15] mb-4">
          Ready to Simplify Your{' '}
          <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
            PRO Services?
          </span>
        </h2>

        <p className="text-[15px] text-white/60 leading-[1.75] mb-8 max-w-[560px] mx-auto">
          Schedule a free consultation with our experts and discover how IHBS can help your business thrive in the UAE.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="group relative inline-flex items-center gap-2.5 bg-white text-navy px-8 py-4 rounded-lg font-body text-[14px] font-semibold transition-all duration-300 hover:bg-sky hover:text-navy hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <span className="relative z-[1]">Book a Free Consultation</span>
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
          </a>

          <a
            href="tel:+97141234567"
            className="inline-flex items-center gap-2.5 text-white/80 hover:text-white text-[14px] font-medium transition-colors duration-200 border border-white/20 hover:border-white/40 px-8 py-4 rounded-lg"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +971 4 123 4567
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/30">
          <span className="text-[12px] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Free consultation
          </span>
          <span className="text-[12px] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            No hidden fees
          </span>
          <span className="text-[12px] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Fast turnaround
          </span>
        </div>
      </div>
    </section>
  );
}
