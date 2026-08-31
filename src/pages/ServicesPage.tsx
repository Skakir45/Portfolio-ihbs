import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Trade License Services',
    desc: 'Hassle-free company setup and licensing for mainland, free zone, and offshore entities in the UAE. We handle everything from application to approval.',
    features: [
      'Mainland trade license registration',
      'Free zone company formation',
      'Offshore company setup',
      'License renewal & amendments',
      'Activity additions & modifications',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue fill-none" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Visa & Immigration Services',
    desc: 'End-to-end visa solutions for you and your team — from employment visas to investor visas and family sponsorship.',
    features: [
      'Employment visa processing',
      'Investor & partner visas',
      'Family & dependent sponsorship',
      'Visit & tourist visa services',
      'Visa status change & renewal',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Document Clearing Services',
    desc: 'Fast and efficient government document processing, attestation, and legalization for all types of business and personal documents.',
    features: [
      'Document attestation & legalization',
      'MOFA attestation',
      'Embassy attestation',
      'Document translation & notarization',
      'Commercial document processing',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Government Liaison Services',
    desc: 'Strong connections with UAE government bodies for smoother, faster approvals. We act as your bridge to official authorities.',
    features: [
      'DLD &DED liaison',
      'Ministry approvals & NOCs',
      'Municipality coordination',
      'Customs & import clearances',
      'Authority representation',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Emirates ID Services',
    desc: 'Complete support for Emirates ID applications, renewals, and amendments — ensuring compliance with UAE identity regulations.',
    features: [
      'New Emirates ID application',
      'ID renewal processing',
      'Address & status amendments',
      'Biometric appointment booking',
      'Expedited processing options',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Other PRO Services',
    desc: 'Comprehensive PRO support for your business including labor cards, WPS registration, and ongoing compliance management.',
    features: [
      'Labor card & work permit processing',
      'WPS registration & support',
      'Company PRO retainer services',
      'Annual compliance management',
      'Regulatory advisory & consulting',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue fill-none" strokeWidth="1.8">
        <polyline points="3 9 12 2 21 9" />
        <path d="M9 22V12h6v10" />
        <rect x="3" y="9" width="18" height="13" rx="1" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    desc: 'We assess your business needs and recommend the best path forward.',
  },
  {
    step: '02',
    title: 'Documentation',
    desc: 'Our team prepares and reviews all required documents for accuracy.',
  },
  {
    step: '03',
    title: 'Processing',
    desc: 'We handle all government submissions, follow-ups, and approvals.',
  },
  {
    step: '04',
    title: 'Delivery',
    desc: 'Your completed documents and licenses are delivered promptly.',
  },
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Hero fade-in
    const heroEls = pageRef.current.querySelectorAll('.svc-hero-animate');
    gsap.fromTo(
      heroEls,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15, delay: 0.2 }
    );

    // Service cards stagger
    const cards = pageRef.current.querySelectorAll('.svc-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: pageRef.current.querySelector('.svc-cards-grid'), start: 'top 80%', once: true },
      }
    );

    // Process steps stagger
    const steps = pageRef.current.querySelectorAll('.svc-step');
    gsap.fromTo(
      steps,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: pageRef.current.querySelector('.svc-process-grid'), start: 'top 80%', once: true },
      }
    );

    // CTA animation
    const cta = pageRef.current.querySelector('.svc-cta');
    if (cta) {
      gsap.fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: cta, start: 'top 85%', once: true } }
      );
    }
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      {/* ── Service Schema (JSON-LD) ── */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'IHBS PRO Services',
          description: 'Comprehensive PRO solutions for businesses in the UAE including trade licensing, visa processing, document clearing, and government liaison.',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: s.title,
              description: s.desc,
              provider: {
                '@type': 'LocalBusiness',
                name: 'IHBS – Insight Hub Business Services',
                url: 'https://ihbs.ae/',
              },
              areaServed: {
                '@type': 'Country',
                name: 'United Arab Emirates',
              },
            },
          }))}
        )}
      </script>

      {/* ── Hero Banner ── */}
      <section className="relative bg-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59,130,246,0.2) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-[1] px-6 lg:px-[60px] py-16 lg:py-24 max-w-[800px]">
          <div className="svc-hero-animate opacity-0 section-eyebrow text-sky! before:bg-sky!">
            Our Services
          </div>
          <h1 className="svc-hero-animate opacity-0 font-heading text-[clamp(30px,4.5vw,50px)] font-black leading-[1.1] text-white mb-4 tracking-tight">
            Comprehensive PRO Solutions{' '}
            <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
              for Your Business
            </span>
          </h1>
          <p className="svc-hero-animate opacity-0 text-[15px] md:text-[16px] text-white/70 leading-[1.75] max-w-[540px]">
            From trade licensing to visa processing, IHBS delivers end-to-end PRO services
            that keep your business compliant and thriving in the UAE.
          </p>
        </div>
      </section>

      {/* ── Service Detail Cards ── */}
      <section className="svc-cards-grid bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-[60px]">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-14">
            <h2 className="font-heading text-[clamp(20px,2.5vw,30px)] font-extrabold text-navy mb-3">
              What We Offer
            </h2>
            <p className="text-[14px] text-ihbs-muted max-w-[520px] mx-auto leading-[1.7]">
              Each service is tailored to meet the unique requirements of businesses operating in the UAE.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="svc-card opacity-0 bg-white rounded-xl p-7 lg:p-8 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover group"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-ihbs-light rounded-xl mb-5 flex items-center justify-center transition-colors duration-200 group-hover:bg-blue/10">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-[16px] font-bold text-navy mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[13.5px] text-ihbs-muted leading-[1.65] mb-5">
                  {service.desc}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[12.5px] text-ihbs-text leading-[1.5]">
                      <svg
                        viewBox="0 0 16 16"
                        className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-blue fill-none"
                        strokeWidth="2"
                      >
                        <polyline points="3.5 8 7 11.5 12.5 5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works / Process ── */}
      <section className="bg-white py-16 lg:py-20 px-6 lg:px-[60px]">
        <div className="max-w-[1000px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-14">
            <h2 className="font-heading text-[clamp(20px,2.5vw,30px)] font-extrabold text-navy mb-3">
              How It Works
            </h2>
            <p className="text-[14px] text-ihbs-muted max-w-[460px] mx-auto leading-[1.7]">
              A simple, streamlined process from start to finish.
            </p>
          </div>

          {/* Process Steps */}
          <div className="svc-process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.step} className="svc-step opacity-0 text-center relative">
                {/* Connector line (hidden on last item) */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-px bg-ihbs-border" />
                )}

                {/* Step number */}
                <div className="w-14 h-14 rounded-full bg-blue text-white font-heading text-[18px] font-bold flex items-center justify-center mx-auto mb-4 relative z-[1]">
                  {step.step}
                </div>

                <h4 className="text-[14px] font-bold text-navy mb-1.5">
                  {step.title}
                </h4>
                <p className="text-[13px] text-ihbs-muted leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="svc-cta opacity-0 bg-navy py-16 lg:py-20 px-6 lg:px-[60px]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[14.5px] text-white/65 leading-[1.7] mb-8 max-w-[480px] mx-auto">
            Let our experts handle the paperwork while you focus on growing your business.
            Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue text-white px-8 py-3.5 rounded-md font-body text-[13.5px] font-semibold transition-all duration-200 hover:bg-blue/90 hover:-translate-y-0.5"
            >
              Contact Us
              <svg
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <line x1="2" y1="7" x2="12" y2="7" />
                <polyline points="8,3 12,7 8,11" />
              </svg>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3 rounded-md font-body text-[13px] font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
