import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Trade License Services',
    desc: 'Hassle-free company setup and licensing',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Visa & Immigration Services',
    desc: 'End-to-end visa solutions for you and your team',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Document Clearing Services',
    desc: 'Fast & efficient government document processing',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Government Liaison Services',
    desc: 'Strong connections. Smoother approvals.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Emirates ID Services',
    desc: 'New applications, renewals & amendments',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Other PRO Services',
    desc: 'Comprehensive PRO support for your business',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <polyline points="3 9 12 2 21 9" />
        <path d="M9 22V12h6v10" />
        <rect x="3" y="9" width="18" height="13" rx="1" />
      </svg>
    ),
  },
];

export default function ServicesStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stripRef.current) return;
    const items = stripRef.current.querySelectorAll('.service-item');
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: stripRef });

  return (
    <div
      ref={stripRef}
      id="services"
      className="bg-white shadow-strip rounded-xl mx-4 lg:mx-12 -mt-10 relative z-10"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {services.map((service, i) => (
          <div
            key={service.title}
            className={`service-item opacity-0 py-8 px-5 text-center transition-colors duration-200 hover:bg-ihbs-light group cursor-pointer ${
              i < services.length - 1 ? 'border-r border-ihbs-border' : ''
            } ${i < 3 ? 'md:border-b-0' : ''} ${i < 4 ? 'lg:border-b-0' : ''}`}
          >
            <div className="w-12 h-12 mx-auto mb-3.5 bg-ihbs-light rounded-[10px] flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
              {service.icon}
            </div>
            <h4 className="text-[11.5px] font-bold tracking-[0.5px] uppercase text-navy mb-1.5">
              {service.title}
            </h4>
            <p className="text-[11.5px] text-ihbs-muted leading-[1.5]">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

