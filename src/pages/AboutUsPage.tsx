import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  {
    title: 'Integrity',
    desc: 'We believe in full transparency in every process. No hidden fees, no surprises — just honest, ethical service you can trust.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards. Every application, every document, every interaction reflects our commitment to quality.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    desc: 'When we commit to a deadline, we deliver. Our clients count on us for consistent, on-time results — every single time.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    desc: 'We continuously improve our processes and leverage technology to make government interactions faster and simpler for you.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Client Success',
    desc: 'Your growth is our mission. We go beyond service delivery to become a genuine partner in your business journey.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Compliance',
    desc: 'We stay ahead of regulatory changes so your business remains fully compliant with UAE laws — always.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const stats = [
  { number: '10+', label: 'Years of Experience' },
  { number: '500+', label: 'Businesses Served' },
  { number: '7', label: 'Emirates Covered' },
  { number: '99%', label: 'Client Satisfaction' },
];

export default function AboutUsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Set page title, meta, and structured data on mount
  useEffect(() => {
    document.title = 'About Us | IHBS – Insight Hub Business Services | PRO Services in UAE';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn about IHBS — UAE\'s trusted PRO services partner. Discover our vision, mission, core values, and the expert team behind trade licensing, visa processing, and document clearing across Dubai and all seven emirates.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://ihbs.ae/about');
    }

    // Add ImageObject structured data for About page images
    const existingSchema = document.getElementById('about-image-schema');
    if (!existingSchema) {
      const script = document.createElement('script');
      script.id = 'about-image-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About IHBS – Insight Hub Business Services',
        description: 'Learn about IHBS — UAE\'s trusted PRO services partner.',
        url: 'https://ihbs.ae/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'IHBS – Insight Hub Business Services',
          image: [
            {
              '@type': 'ImageObject',
              url: 'https://ihbs.ae/images/ihbs-logo.jpg',
              caption: 'IHBS Logo – Insight Hub Business Services',
              description: 'Official logo of IHBS, a leading PRO services provider in the UAE',
              width: 800,
              height: 600,
            },
            {
              '@type': 'ImageObject',
              url: 'https://ihbs.ae/images/office-interior.jpg',
              caption: 'IHBS Office Interior – Professional PRO Services Team in Dubai',
              description: 'Inside the IHBS office in Dubai, UAE — where expert PRO specialists help businesses with trade licensing, visa processing, and document clearing',
              width: 800,
              height: 600,
            },
          ],
        },
      });
      document.head.appendChild(script);
    }

    return () => {
      const schema = document.getElementById('about-image-schema');
      if (schema) schema.remove();
    };
  }, []);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Hero animation
    const heroContent = pageRef.current.querySelector('.about-hero-content');
    if (heroContent) {
      gsap.fromTo(
        heroContent,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }

    // Stats animation
    const statItems = pageRef.current.querySelectorAll('.stat-item');
    if (statItems.length) {
      gsap.fromTo(
        statItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: statItems[0], start: 'top 85%', once: true },
        }
      );
    }

    // Story section
    const storyContent = pageRef.current.querySelector('.story-content');
    if (storyContent) {
      gsap.fromTo(
        storyContent,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: storyContent, start: 'top 80%', once: true },
        }
      );
    }

    // Vision & Mission cards
    const vmCards = pageRef.current.querySelectorAll('.vm-card');
    if (vmCards.length) {
      gsap.fromTo(
        vmCards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: vmCards[0], start: 'top 82%', once: true },
        }
      );
    }

    // Values cards
    const valueCards = pageRef.current.querySelectorAll('.value-card');
    if (valueCards.length) {
      gsap.fromTo(
        valueCards,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: 'back.out(1.3)',
          stagger: 0.08,
          scrollTrigger: { trigger: valueCards[0], start: 'top 85%', once: true },
        }
      );
    }

    // CTA section
    const ctaSection = pageRef.current.querySelector('.cta-section');
    if (ctaSection) {
      gsap.fromTo(
        ctaSection,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaSection, start: 'top 85%', once: true },
        }
      );
    }
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      {/* ── Page Hero ── */}
      <section className="relative bg-navy pt-24 pb-16 lg:pt-32 lg:pb-20 px-6 lg:px-16 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147,197,253,0.2) 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-[900px] mx-auto text-center about-hero-content opacity-0">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue mb-6">
            <span className="block w-5 h-0.5 bg-blue" />
            About IHBS
            <span className="block w-5 h-0.5 bg-blue" />
          </div>
          <h1 className="font-heading text-[clamp(32px,5vw,52px)] font-black leading-[1.1] text-white mb-5 tracking-tight">
            The Team Behind Your{' '}
            <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
              Business Success
            </span>
          </h1>
          <p className="text-[15px] lg:text-[16px] text-white/70 leading-[1.75] max-w-[620px] mx-auto">
            For over a decade, IHBS has been the trusted PRO partner for businesses across the UAE —
            simplifying government processes so you can focus on growth.
          </p>
          {/* SEO-friendly image */}
          <img
            src="/images/ihbs-logo.jpg"
            alt="IHBS – Insight Hub Business Services official logo | PRO services company in Dubai, UAE"
            width={200}
            height={60}
            className="mx-auto mt-8 opacity-80"
            loading="eager"
          />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white -mt-8 relative z-10 mx-4 lg:mx-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item opacity-0 py-8 px-6 text-center ${
                i < stats.length - 1 ? 'border-r border-ihbs-border' : ''
              }`}
            >
              <div className="font-heading text-[clamp(28px,3vw,38px)] font-black text-blue mb-1">
                {stat.number}
              </div>
              <div className="text-[12px] font-semibold tracking-[0.5px] uppercase text-ihbs-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[900px] mx-auto story-content opacity-0">
          <div className="section-eyebrow mb-4">Our Story</div>
          <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-extrabold leading-[1.25] text-navy mb-6">
            Built on Trust, Driven by{' '}
            <span className="text-blue">Purpose</span>
          </h2>
          <div className="space-y-5 text-[15px] text-ihbs-muted leading-[1.8]">
            <p>
              <strong className="text-navy">Integrated Hub Business Services (IHBS)</strong> was
              founded with a clear vision: to make UAE government processes simple, fast, and
              stress-free for businesses of every size. What started as a small PRO services firm in
              Dubai has grown into a full-service business solutions provider trusted by over 500
              companies across all seven emirates.
            </p>
            <p>
              We understand that navigating trade licensing, visa applications, document clearing, and
              government compliance can be overwhelming — especially for entrepreneurs and businesses
              new to the UAE. That's why we built IHBS: to be the reliable bridge between your
              business and the complexities of UAE regulations.
            </p>
            <p>
              Our team of experienced PRO specialists brings deep knowledge of UAE government
              procedures, strong relationships with authorities, and a relentless commitment to
              getting things right the first time. From company formation in Dubai mainland and free
              zones to WPS registration and Emirates ID processing, we handle it all — so you don't
              have to.
            </p>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-center font-heading text-[clamp(20px,2.8vw,30px)] font-extrabold text-navy mb-12 flex items-center justify-center gap-3">
            <span className="hidden sm:inline-block w-8 h-0.5 bg-blue" />
            Vision & Mission
            <span className="hidden sm:inline-block w-8 h-0.5 bg-blue" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision */}
            <div className="vm-card opacity-0 bg-gradient-to-br from-navy to-[#152d5a] rounded-2xl px-8 py-10 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white fill-none" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                </svg>
              </div>
              <h3 className="font-heading text-[22px] font-extrabold mb-4 tracking-tight">Our Vision</h3>
              <p className="text-[14.5px] text-white/75 leading-[1.8]">
                To be the UAE's most trusted and innovative PRO services partner — empowering every
                business, from ambitious startups to established enterprises, to operate seamlessly
                and thrive in one of the world's fastest-growing economies.
              </p>
            </div>

            {/* Mission */}
            <div className="vm-card opacity-0 bg-white rounded-2xl px-8 py-10 border border-ihbs-border shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="w-14 h-14 bg-ihbs-bg rounded-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="font-heading text-[22px] font-extrabold text-navy mb-4 tracking-tight">Our Mission</h3>
              <p className="text-[14.5px] text-ihbs-muted leading-[1.8]">
                To deliver end-to-end PRO solutions — trade licensing, visa processing, document
                clearing, WPS registration, and government liaison — with unmatched speed, full
                transparency, and personalized care, so our clients can focus on building their
                business with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">What We Stand For</div>
            <h2 className="font-heading text-[clamp(20px,2.8vw,30px)] font-extrabold text-navy mb-4">
              Our Core Values
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[520px] mx-auto">
              These principles guide every decision we make and every service we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="value-card opacity-0 bg-white rounded-2xl px-7 py-8 border border-ihbs-border shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-blue/20"
              >
                <div className="w-13 h-13 bg-ihbs-bg rounded-xl flex items-center justify-center mb-5">
                  {val.icon}
                </div>
                <h3 className="font-heading text-[16px] font-bold text-navy mb-2">
                  {val.title}
                </h3>
                <p className="text-[13.5px] text-ihbs-muted leading-[1.65]">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Trust Us ── */}
      <section className="bg-navy py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-heading text-[clamp(20px,2.8vw,30px)] font-extrabold text-white mb-6">
            Why 500+ Businesses Trust IHBS
          </h2>
          <p className="text-[14.5px] text-white/65 leading-[1.8] mb-10 max-w-[620px] mx-auto">
            We don't just process paperwork — we build lasting partnerships. Our clients choose us
            because we combine deep regulatory expertise with genuine care for their success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-6 py-7">
              <div className="font-heading text-[28px] font-black text-blue mb-2">Fast</div>
              <p className="text-[13px] text-white/60 leading-[1.6]">
                Most processes completed within 24–48 hours
              </p>
            </div>
            <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-6 py-7">
              <div className="font-heading text-[28px] font-black text-blue mb-2">Transparent</div>
              <p className="text-[13px] text-white/60 leading-[1.6]">
                Real-time updates and clear pricing at every step
              </p>
            </div>
            <div className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-6 py-7">
              <div className="font-heading text-[28px] font-black text-blue mb-2">Dedicated</div>
              <p className="text-[13px] text-white/60 leading-[1.6]">
                A personal account manager for every client
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16 cta-section opacity-0">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
            Ready to Simplify Your PRO Needs?
          </h2>
          <p className="text-[14.5px] text-ihbs-muted leading-[1.7] mb-8">
            Whether you're setting up a new business or need ongoing PRO support, our team is ready
            to help you navigate UAE regulations with ease.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/services" className="btn-primary">
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
            <a href="mailto:info@ihbs.ae" className="btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
