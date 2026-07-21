import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    stat: '100%',
    title: 'COMPLIANCE FOCUSED',
    desc: 'We ensure your business stays fully compliant with UAE regulations.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-blue fill-none" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    stat: 'FAST &',
    statSize: 'text-[24px] pt-1',
    title: 'EFFICIENT',
    desc: 'We value your time and deliver results with speed and accuracy.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-blue fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    stat: 'EXPERT',
    statSize: 'text-[22px] pt-1.5',
    title: 'TEAM',
    desc: 'Experienced professionals with in-depth knowledge of UAE government procedures.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-blue fill-none" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    stat: 'CLIENT',
    statSize: 'text-[22px] pt-1.5',
    title: 'FIRST',
    desc: 'Personalized service and dedicated support at every step of your journey.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-blue fill-none" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.why-card');
    gsap.fromTo(
      items,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="why-choose" className="bg-ihbs-light py-16 lg:py-20 px-6 lg:px-[60px]">
      {/* Header */}
      <h2 className="text-center font-heading text-[clamp(18px,2.5vw,28px)] font-extrabold text-navy mb-10 lg:mb-12 flex items-center justify-center gap-3">
        <span className="hidden sm:inline-block w-9 h-0.5 bg-blue" />
        WHY BUSINESSES CHOOSE IHBS
        <span className="hidden sm:inline-block w-9 h-0.5 bg-blue" />
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
        {cards.map((card) => (
          <div
            key={card.title}
            className="why-card opacity-0 bg-white rounded-xl px-6 py-8 lg:px-7 lg:py-9 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="w-[52px] h-[52px] bg-ihbs-light rounded-xl mx-auto mb-4 flex items-center justify-center">
              {card.icon}
            </div>
            <div className={`font-heading font-black text-blue mb-1 ${card.statSize || 'text-[32px]'}`}>
              {card.stat}
            </div>
            <h4 className="text-xs font-bold uppercase tracking-[1px] text-navy mb-2.5">
              {card.title}
            </h4>
            <p className="text-[13px] text-ihbs-muted leading-[1.6]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

