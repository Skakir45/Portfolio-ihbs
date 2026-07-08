import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  {
    name: 'DUBAI DET',
    svg: (
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="24" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fill="#FFFFFF" letterSpacing="1">DUBAI</text>
        <rect x="4" y="27" width="68" height="2" rx="1" fill="#C8102E" />
        <text x="4" y="34" fontFamily="Arial, sans-serif" fontSize="7" fill="rgba(255,255,255,0.55)" letterSpacing="0.5">Economy &amp; Tourism</text>
      </svg>
    ),
  },
  {
    name: 'DIFC',
    svg: (
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,18 18,8 26,18 18,28" fill="none" stroke="#C8A96E" strokeWidth="1.8" />
        <polygon points="13,18 18,11 23,18 18,25" fill="#C8A96E" opacity="0.4" />
        <text x="32" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="800" fill="#FFFFFF" letterSpacing="1">DIFC</text>
      </svg>
    ),
  },
  {
    name: 'MEYDAN',
    svg: (
      <svg width="90" height="36" viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 26 Q8 10 18 10 Q22 10 22 18 Q22 10 28 10 Q34 10 34 18 Q34 10 38 10 Q48 10 48 26" stroke="#C8A96E" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <text x="4" y="35" fontFamily="Georgia, serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.9)" letterSpacing="3">MEYDAN</text>
      </svg>
    ),
  },
  {
    name: 'DMCC',
    svg: (
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,6 20,2 28,6 28,14 20,18 12,14" fill="none" stroke="#00A8E0" strokeWidth="1.6" />
        <polygon points="15,8 20,5 25,8 25,13 20,16 15,13" fill="#00A8E0" opacity="0.3" />
        <text x="34" y="14" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">DMCC</text>
        <text x="34" y="25" fontFamily="Arial, sans-serif" fontSize="7" fill="rgba(255,255,255,0.5)" letterSpacing="0.3">Free Zone Authority</text>
      </svg>
    ),
  },
  {
    name: 'JAFZA',
    svg: (
      <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="16" height="3" rx="1.5" fill="#00833E" />
        <rect x="14" y="4" width="3" height="18" rx="1.5" fill="#00833E" />
        <path d="M6 22 Q6 28 14 28 Q22 28 22 22" stroke="#00833E" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="30" y="20" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">JAFZA</text>
        <text x="30" y="30" fontFamily="Arial, sans-serif" fontSize="7" fill="rgba(255,255,255,0.5)">Jebel Ali Free Zone</text>
      </svg>
    ),
  },
  {
    name: 'RAKEZ',
    svg: (
      <svg width="86" height="36" viewBox="0 0 86 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="14,26 22,8 30,26" fill="none" stroke="#E63946" strokeWidth="1.8" />
        <polygon points="18,26 22,14 26,26" fill="#E63946" opacity="0.5" />
        <text x="36" y="20" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">RAKEZ</text>
        <text x="36" y="30" fontFamily="Arial, sans-serif" fontSize="7" fill="rgba(255,255,255,0.5)">Ras Al Khaimah EZ</text>
      </svg>
    ),
  },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.trust-card');
    gsap.fromTo(
      items,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-navy py-12 lg:py-14 px-6 lg:px-[60px]">
      {/* Header */}
      <h3 className="text-center text-[17px] font-semibold text-white/75 tracking-[0.5px] mb-10 lg:mb-11 flex items-center justify-center gap-3">
        <span className="hidden sm:inline-block w-10 h-px bg-blue/50" />
        Thousands of Businesses Trust Us
        <span className="hidden sm:inline-block w-10 h-px bg-blue/50" />
      </h3>

      {/* Logo Cards */}
      <div className="flex flex-wrap items-stretch justify-center gap-5">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="trust-card opacity-0 bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-4 lg:px-6 lg:py-4.5 flex flex-col items-center justify-center gap-2.5 min-w-[130px] transition-all duration-200 hover:bg-white/[0.12] hover:border-blue/50 hover:-translate-y-0.5 cursor-default"
          >
            <div className="flex items-center justify-center">{logo.svg}</div>
            <span className="text-[11px] font-semibold text-white/50 tracking-[1.5px] uppercase text-center">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
