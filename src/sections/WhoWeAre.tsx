import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  {
    title: 'Integrity',
    desc: 'Transparent processes and honest guidance in every interaction.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-blue fill-none" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'Delivering quality service that exceeds expectations every time.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-blue fill-none" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    desc: 'Consistent, on-time delivery you can depend on.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-blue fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Client Success',
    desc: 'Your business growth drives everything we do.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-blue fill-none" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const textCol = sectionRef.current.querySelector('.who-text-col');
    const imgCol = sectionRef.current.querySelector('.who-img-col');
    const visionMission = sectionRef.current.querySelectorAll('.vm-card');
    const values = sectionRef.current.querySelectorAll('.value-item');

    if (textCol) {
      gsap.fromTo(
        textCol,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }
    if (imgCol) {
      gsap.fromTo(
        imgCol,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }
    if (visionMission.length) {
      gsap.fromTo(
        visionMission,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: visionMission[0], start: 'top 85%', once: true },
        }
      );
    }
    if (values.length) {
      gsap.fromTo(
        values,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: values[0], start: 'top 88%', once: true },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="who-we-are">
      {/* ── Main Intro Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[480px] mt-16 lg:mt-20">
        {/* Text Column */}
        <div className="who-text-col opacity-0 py-14 lg:py-[70px] px-6 lg:px-16 flex flex-col justify-center">
          <div className="section-eyebrow">Who We Are</div>
          <h2 className="font-heading text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.2] text-navy mb-2.5">
            Your Trusted PRO Partner{' '}
            <span className="text-blue">in the UAE</span>
          </h2>
          <p className="text-[14.5px] text-ihbs-muted leading-[1.75] mb-8 max-w-[480px]">
            At <strong>Integrated Hub Business Services (IHBS)</strong>, we simplify UAE government
            processes so you can focus on what matters most — growing your business. With over a
            decade of experience, our team of PRO experts delivers fast, transparent, and reliable
            solutions for trade licensing, company formation, visa processing, and document clearing
            across Dubai, Abu Dhabi, and all seven emirates.
          </p>
          <a href="#" className="btn-outline w-fit">
            Learn More About Us
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
        </div>

        {/* Image Column */}
        <div className="who-img-col opacity-0 relative overflow-hidden min-h-[300px] lg:min-h-0">
          <img
            src="/images/office-interior.jpg"
            alt="IHBS Office Interior — Professional PRO services team in Dubai, UAE"
            width={800}
            height={600}
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(13,27,62,0.35) 0%, rgba(26,86,219,0.12) 60%, transparent 100%)',
            }}
          />
          {/* Office Badge */}
          <div className="absolute bottom-6 lg:bottom-7 left-6 lg:left-7 bg-white rounded-[10px] px-4 py-3 shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex items-center gap-3">
            <div className="w-10 h-10 bg-ihbs-bg rounded-lg flex items-center justify-center">
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
      </div>

      {/* ── Vision & Mission ── */}
      <div className="px-6 lg:px-16 py-14 lg:py-16 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Vision */}
          <div className="vm-card opacity-0 bg-gradient-to-br from-navy to-[#152d5a] rounded-2xl px-7 py-8 lg:px-9 lg:py-10 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3" />
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              </svg>
            </div>
            <h3 className="font-heading text-[20px] font-extrabold mb-3 tracking-tight">Our Vision</h3>
            <p className="text-[14px] text-white/75 leading-[1.75]">
              To be the UAE's most trusted and innovative PRO services partner — empowering every
              business, from startups to enterprises, to operate seamlessly and thrive in one of
              the world's fastest-growing economies.
            </p>
          </div>

          {/* Mission */}
          <div className="vm-card opacity-0 bg-white rounded-2xl px-7 py-8 lg:px-9 lg:py-10 border border-ihbs-border shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="w-12 h-12 bg-ihbs-bg rounded-xl flex items-center justify-center mb-5">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="font-heading text-[20px] font-extrabold text-navy mb-3 tracking-tight">Our Mission</h3>
            <p className="text-[14px] text-ihbs-muted leading-[1.75]">
              To deliver end-to-end PRO solutions — trade licensing, visa processing, document
              clearing, and government liaison — with unmatched speed, full transparency, and
              personalized care, so our clients can focus on building their business.
            </p>
          </div>
        </div>
      </div>

      {/* ── Core Values ── */}
      <div className="bg-ihbs-bg py-14 lg:py-16 px-6 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <h3 className="text-center font-heading text-[clamp(18px,2.2vw,26px)] font-extrabold text-navy mb-10 flex items-center justify-center gap-3">
            <span className="hidden sm:inline-block w-8 h-0.5 bg-blue" />
            Our Core Values
            <span className="hidden sm:inline-block w-8 h-0.5 bg-blue" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="value-item opacity-0 bg-white rounded-xl px-6 py-7 text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-ihbs-border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="w-11 h-11 bg-ihbs-bg rounded-xl mx-auto mb-4 flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="font-heading text-[14px] font-bold text-navy mb-1.5">
                  {val.title}
                </h4>
                <p className="text-[13px] text-ihbs-muted leading-[1.6]">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
