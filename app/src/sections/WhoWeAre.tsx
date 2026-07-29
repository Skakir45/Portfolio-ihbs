import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const textCol = sectionRef.current.querySelector('.who-text-col');
    const imgCol = sectionRef.current.querySelector('.who-img-col');

    if (textCol) {
      gsap.fromTo(
        textCol,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }
    if (imgCol) {
      gsap.fromTo(
        imgCol,
        { x: 40, opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[480px]"
    >
      {/* Text Column */}
      <div className="who-text-col opacity-0 py-14 lg:py-[80px] px-6 lg:px-16 flex flex-col justify-center bg-white">
        <div className="section-eyebrow">Who We Are</div>
        <h2 className="font-heading text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.2] text-navy mb-3">
          Your Trusted PRO Partner{' '}
          <span className="text-blue">in the UAE</span>
        </h2>
        <p className="text-[14.5px] text-ihbs-muted leading-[1.75] mb-8 max-w-[480px]">
          At IHBS, we simplify government processes so you can focus on what
          matters most — growing your business. Our experienced team delivers
          fast, transparent, and reliable PRO solutions tailored to your needs.
        </p>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          {[
            { text: '10+ years of industry experience', icon: 'M9 12l2 2 4-4' },
            { text: '98% client satisfaction rate', icon: 'M9 12l2 2 4-4' },
            { text: 'Dedicated account managers', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
            { text: 'Fast turnaround guaranteed', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
          ].map((feature) => (
            <div key={feature.text} className="flex items-center gap-3">
              <div className="w-7 h-7 bg-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 stroke-blue fill-none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={feature.icon} />
                </svg>
              </div>
              <span className="text-[13.5px] text-ihbs-text/80">{feature.text}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className="btn-primary w-fit group">
          Get in Touch
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
      </div>

      {/* Image Column */}
      <div className="who-img-col opacity-0 relative overflow-hidden min-h-[300px] lg:min-h-0">
        <img
          src="/images/office-interior.jpg"
          alt="IHBS Office Interior"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,27,62,0.4) 0%, rgba(26,86,219,0.15) 60%, transparent 100%)',
          }}
        />
        {/* Office Badge */}
        <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3.5 shadow-badge flex items-center gap-3 transition-all duration-300 hover:bg-white">
          <div className="w-10 h-10 bg-ihbs-light rounded-lg flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-blue fill-none"
              strokeWidth="2"
            >
              <polyline points="3 9 12 2 21 9" />
              <path d="M9 22V12h6v10" />
              <rect x="3" y="9" width="18" height="13" rx="1" />
            </svg>
          </div>
          <div>
            <strong className="block text-sm font-bold text-navy">IHBS Office</strong>
            <span className="text-[11px] text-ihbs-muted">Dubai, UAE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
