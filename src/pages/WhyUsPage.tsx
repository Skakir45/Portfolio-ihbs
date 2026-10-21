import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '10+', label: 'Years in the UAE Market' },
  { number: '500+', label: 'Businesses Served' },
  { number: '7', label: 'Emirates Covered' },
  { number: '24–48h', label: 'Typical Turnaround' },
];

const differentiators = [
  {
    title: 'A Single Point of Contact',
    desc: 'Every client is assigned a named account manager who knows your file. No call centres, no repeating your story to a new person every time.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Fixed, Transparent Pricing',
    desc: 'You receive an itemised written quote before any work starts. Government fees are shown separately from our service fee — and nothing is added later.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Deep Regulatory Expertise',
    desc: 'Our team works daily with MOHRE, Dubai Economy & Tourism, GDRFA, ICP, DLD and MOFA — so your file follows the route that actually gets approved.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Speed That Holds Up',
    desc: 'Pre-verified document packs mean fewer rejections and resubmissions. Most routine transactions are completed within 24–48 working hours.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'End-to-End, Not Piecemeal',
    desc: 'Formation, licensing, visas, Emirates ID, WPS payroll, attestation, renewals and liquidations — handled by one team instead of five vendors.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Documents Treated as Confidential',
    desc: 'Passports, contracts and financial records are logged, tracked and stored under strict internal confidentiality controls — and returned in full.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-blue fill-none" strokeWidth="1.8">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const comparison = [
  {
    point: 'Quotation',
    typical: 'Verbal estimate that creeps up with "extra fees" mid-process.',
    ihbs: 'Written, itemised quote separating government fees from our service fee.',
  },
  {
    point: 'Communication',
    typical: 'You chase them for every update.',
    ihbs: 'A named account manager and proactive WhatsApp or email updates.',
  },
  {
    point: 'Turnaround',
    typical: 'Open-ended — no committed timeline.',
    ihbs: 'A committed delivery window, with early warning if an authority delays anything.',
  },
  {
    point: 'Coverage',
    typical: 'Dubai-only, and out of their depth beyond it.',
    ihbs: 'All seven emirates, including free zone and mainland jurisdictions.',
  },
  {
    point: 'Paper Trail',
    typical: 'Cash errands, no receipts, no record of what was submitted.',
    ihbs: 'Documented submissions, receipts and a status report on every transaction.',
  },
  {
    point: 'After the Task',
    typical: 'Relationship ends when the license is issued.',
    ihbs: 'Renewal reminders, compliance calendars and ongoing advisory.',
  },
];

const guarantees = [
  {
    title: 'Compliance Guarantee',
    desc: 'We never recommend a shortcut that puts your license, your visa quota or your standing with an authority at risk. If a route is not compliant, we say so.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white fill-none" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11.5 14.5 15.5 9.5" />
      </svg>
    ),
  },
  {
    title: 'Price Guarantee',
    desc: 'The figure we quote is the figure you pay for our scope of work. If a government fee changes, we show you the official reference before passing it on.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M9.5 10.5h4a1.75 1.75 0 0 1 0 3.5h-4" />
      </svg>
    ),
  },
  {
    title: 'Deadline Guarantee',
    desc: 'We only commit to timelines we can hold. When an authority queue moves, you hear it from us first — with a revised date, not an excuse.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white fill-none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </svg>
    ),
  },
];

const industries = [
  { name: 'Trading & Retail', note: 'Import/export codes, customs, product registration' },
  { name: 'Food & Beverage', note: 'Municipality approvals, food safety permits' },
  { name: 'Construction & Contracting', note: 'Grading, engineer cards, permits' },
  { name: 'Technology & Startups', note: 'Free zone formation, investor visas, IP support' },
  { name: 'Logistics & Shipping', note: 'Freight licensing, customs registration' },
  { name: 'Healthcare & Clinics', note: 'DHA licensing, professional visas' },
  { name: 'Professional & Consulting', note: 'Service licensing, partner visas' },
  { name: 'Real Estate', note: 'RERA registration, brokerage permits' },
];

const engagementModels = [
  {
    step: '01',
    title: 'Task-by-Task',
    desc: 'You bring us a single transaction — a renewal, an attestation, a visa. Fixed quote, delivered, done.',
    best: 'Best for established businesses with occasional PRO needs.',
  },
  {
    step: '02',
    title: 'Company Setup Project',
    desc: 'End-to-end formation: name reservation, initial approval, licensing, establishment card, visas and bank account support.',
    best: 'Best for founders entering the UAE market.',
  },
  {
    step: '03',
    title: 'Monthly PRO Retainer',
    desc: 'A dedicated share of your account manager\'s time each month for renewals, visas, WPS and day-to-day government work.',
    best: 'Best for teams with 10+ staff or multiple licenses.',
  },
];

const faqs = [
  {
    q: 'What exactly does a PRO services company do in the UAE?',
    a: 'A PRO (Public Relations Officer) company acts as your authorised representative with UAE government departments. That covers trade license applications and renewals, employment and investor visas, Emirates ID processing, establishment cards, labour contracts, WPS payroll registration, document attestation with MOFA and embassies, municipality permits, and day-to-day submissions with authorities such as MOHRE, GDRFA, ICP and Dubai Economy & Tourism. In short: everything that requires standing in line at a government counter, we handle on your behalf.',
  },
  {
    q: 'How long does it take to set up a company in Dubai?',
    a: 'A free zone licence is commonly issued within 3–7 working days once your documents and trade name are approved, and a mainland licence typically takes 5–10 working days depending on the activity and any external approvals it needs. Certain regulated activities — healthcare, education, food, financial services — require additional authority approvals that extend the timeline. We give you a written estimate before we begin.',
  },
  {
    q: 'Do you only work with businesses in Dubai?',
    a: 'No. We are based in Deira, Dubai, but we handle transactions in all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain — including mainland, free zone and offshore jurisdictions.',
  },
  {
    q: 'How do your fees work?',
    a: 'Our service fee is agreed with you in writing before work starts. Government fees, typing fees, translation costs and any third-party charges are listed separately on the same quote, so you always know what is ours and what belongs to an authority. There are no success fees added at the end.',
  },
  {
    q: 'We already have a PRO provider. Can you take over?',
    a: 'Yes. Share your current license, establishment card, visa list and any open applications, and we will audit the file, flag anything that needs attention, and map out the transition. Most handovers are completed without interrupting renewals already in progress.',
  },
  {
    q: 'What do you need from us to get started?',
    a: 'For a first consultation: a short description of what you need, your trade licence if you already have one, and any previous correspondence with an authority. We then send a document checklist specific to your case, a fixed quote, and a delivery window.',
  },
];

export default function WhyUsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Why Us | IHBS – Insight Hub Business Services | PRO Services in UAE';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Why businesses across the UAE choose IHBS: fixed transparent pricing, a named account manager, 24–48 hour turnaround, deep expertise with MOHRE, DED, GDRFA, ICP and MOFA, and full coverage across all seven emirates.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://ihbs.ae/why-us');
    }
  }, []);

  useGSAP(() => {
    if (!pageRef.current) return;

    const heroEls = pageRef.current.querySelectorAll('.why-hero-animate');
    if (heroEls.length) {
      gsap.fromTo(
        heroEls,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15, delay: 0.15 }
      );
    }

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

    const diffCards = pageRef.current.querySelectorAll('.diff-card');
    if (diffCards.length) {
      gsap.fromTo(
        diffCards,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: diffCards[0], start: 'top 82%', once: true },
        }
      );
    }

    const compRows = pageRef.current.querySelectorAll('.comp-row');
    if (compRows.length) {
      gsap.fromTo(
        compRows,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: pageRef.current.querySelector('.comp-table'), start: 'top 80%', once: true },
        }
      );
    }

    const guaranteeCards = pageRef.current.querySelectorAll('.guarantee-card');
    if (guaranteeCards.length) {
      gsap.fromTo(
        guaranteeCards,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: 'back.out(1.3)',
          stagger: 0.1,
          scrollTrigger: { trigger: guaranteeCards[0], start: 'top 85%', once: true },
        }
      );
    }

    const industryCards = pageRef.current.querySelectorAll('.industry-card');
    if (industryCards.length) {
      gsap.fromTo(
        industryCards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: industryCards[0], start: 'top 85%', once: true },
        }
      );
    }

    const modelCards = pageRef.current.querySelectorAll('.model-card');
    if (modelCards.length) {
      gsap.fromTo(
        modelCards,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: modelCards[0], start: 'top 82%', once: true },
        }
      );
    }

    const faqItems = pageRef.current.querySelectorAll('.faq-item');
    if (faqItems.length) {
      gsap.fromTo(
        faqItems,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: faqItems[0], start: 'top 88%', once: true },
        }
      );
    }

    const cta = pageRef.current.querySelector('.cta-section');
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
      {/* ── FAQ Schema (JSON-LD) ── */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        })}
      </script>

      {/* ── Page Hero ── */}
      <section className="relative bg-navy pt-24 pb-16 lg:pt-32 lg:pb-20 px-6 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 35%, rgba(59,130,246,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147,197,253,0.25) 0%, transparent 45%)',
          }}
        />
        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="why-hero-animate opacity-0 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue mb-6">
            <span className="block w-5 h-0.5 bg-blue" />
            Why IHBS
            <span className="block w-5 h-0.5 bg-blue" />
          </div>
          <h1 className="why-hero-animate opacity-0 font-heading text-[clamp(32px,5vw,52px)] font-black leading-[1.1] text-white mb-5 tracking-tight">
            The PRO Partner Businesses{' '}
            <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
              Keep Coming Back To
            </span>
          </h1>
          <p className="why-hero-animate opacity-0 text-[15px] lg:text-[16px] text-white/70 leading-[1.75] max-w-[640px] mx-auto">
            Anyone can stand in a government queue. What sets IHBS apart is what happens around it —
            fixed pricing agreed in writing, one accountable account manager, and a compliance-first
            approach that protects your licence as your business grows.
          </p>
          <div className="why-hero-animate opacity-0 mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Book a Free Consultation
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
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-md font-body text-[13px] font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/50 no-underline"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white -mt-8 relative z-10 mx-4 lg:mx-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item opacity-0 py-8 px-6 text-center ${i < stats.length - 1 ? 'border-r border-ihbs-border' : ''}`}
            >
              <div className="font-heading text-[clamp(24px,3vw,34px)] font-black text-blue mb-1">
                {stat.number}
              </div>
              <div className="text-[12px] font-semibold tracking-[0.5px] uppercase text-ihbs-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Differentiators ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">What Makes Us Different</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              Six Reasons Clients Stay With IHBS
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[560px] mx-auto">
              These are the practical differences our clients tell us they notice within the first
              month of working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="diff-card opacity-0 bg-white rounded-2xl px-7 py-8 border border-ihbs-border shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(13,27,62,0.10)] hover:border-blue/25"
              >
                <div className="w-12 h-12 bg-ihbs-bg rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-heading text-[16px] font-bold text-navy mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[13.5px] text-ihbs-muted leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Side by Side</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              The Difference You Actually Feel
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[540px] mx-auto">
              A comparison based on what clients describe about their previous PRO arrangements.
            </p>
          </div>

          <div className="comp-table bg-white rounded-2xl border border-ihbs-border overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            {/* Header row */}
            <div className="hidden md:grid md:grid-cols-[0.9fr_1fr_1fr] bg-navy">
              <div className="px-6 py-4 text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">
                What Clients Compare
              </div>
              <div className="px-6 py-4 text-[11px] font-bold uppercase tracking-[1.5px] text-white/50 border-l border-white/10">
                The Usual Experience
              </div>
              <div className="px-6 py-4 text-[11px] font-bold uppercase tracking-[1.5px] text-blue border-l border-white/10">
                With IHBS
              </div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.point}
                className={`comp-row opacity-0 grid grid-cols-1 md:grid-cols-[0.9fr_1fr_1fr] ${i < comparison.length - 1 ? 'border-b border-ihbs-border' : ''}`}
              >
                <div className="px-6 pt-5 pb-2 md:py-6 font-heading text-[14px] font-bold text-navy">
                  {row.point}
                </div>
                <div className="px-6 py-3 md:py-6 md:border-l border-ihbs-border">
                  <span className="md:hidden block text-[10px] font-bold uppercase tracking-[1.5px] text-ihbs-muted mb-1">
                    Usual experience
                  </span>
                  <p className="text-[13px] text-ihbs-muted leading-[1.65]">{row.typical}</p>
                </div>
                <div className="px-6 pb-5 pt-3 md:py-6 md:border-l border-ihbs-border bg-blue/[0.03]">
                  <span className="md:hidden block text-[10px] font-bold uppercase tracking-[1.5px] text-blue mb-1">
                    With IHBS
                  </span>
                  <p className="text-[13px] text-navy leading-[1.65] flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-blue fill-none" strokeWidth="2">
                      <polyline points="3.5 8 7 11.5 12.5 5" />
                    </svg>
                    <span>{row.ihbs}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantees ── */}
      <section className="bg-navy py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-sky mb-4">
              <span className="block w-5 h-0.5 bg-sky" />
              Our Commitments
              <span className="block w-5 h-0.5 bg-sky" />
            </div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-white mb-4">
              Three Promises We Put in Writing
            </h2>
            <p className="text-[14.5px] text-white/65 leading-[1.7] max-w-[560px] mx-auto">
              Every engagement with IHBS is governed by these commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="guarantee-card opacity-0 bg-white/[0.06] border border-white/[0.12] rounded-2xl px-7 py-8 transition-all duration-200 hover:bg-white/[0.1] hover:border-blue/40"
              >
                <div className="w-12 h-12 bg-blue/15 rounded-xl flex items-center justify-center mb-5">
                  {g.icon}
                </div>
                <h3 className="font-heading text-[16px] font-bold text-white mb-2.5">{g.title}</h3>
                <p className="text-[13px] text-white/60 leading-[1.7]">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Who We Work With</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              Industries We Know Inside Out
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[560px] mx-auto">
              Regulated activities come with their own approvals. We have handled them across these
              sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="industry-card opacity-0 bg-ihbs-bg border border-ihbs-border rounded-xl px-5 py-6 transition-all duration-200 hover:bg-white hover:shadow-[0_8px_22px_rgba(13,27,62,0.08)] hover:border-blue/25"
              >
                <h3 className="font-heading text-[14px] font-bold text-navy mb-1.5">
                  {industry.name}
                </h3>
                <p className="text-[12.5px] text-ihbs-muted leading-[1.6]">{industry.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Models ── */}
      <section className="bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Ways to Work With Us</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              Choose the Level of Support You Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div
                key={model.step}
                className="model-card opacity-0 bg-white rounded-2xl px-7 py-8 border border-ihbs-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col"
              >
                <div className="font-heading text-[13px] font-black text-blue tracking-[2px] mb-4">
                  {model.step}
                </div>
                <h3 className="font-heading text-[17px] font-bold text-navy mb-3">{model.title}</h3>
                <p className="text-[13.5px] text-ihbs-muted leading-[1.7] mb-5 flex-1">
                  {model.desc}
                </p>
                <p className="text-[12px] font-semibold text-navy bg-ihbs-bg rounded-lg px-4 py-3 leading-[1.6]">
                  {model.best}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Common Questions</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              Questions We Answer Every Week
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className={`faq-item opacity-0 bg-white rounded-xl border transition-colors duration-200 ${
                    isOpen ? 'border-blue/30 shadow-[0_6px_20px_rgba(13,27,62,0.07)]' : 'border-ihbs-border'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-heading text-[14.5px] font-bold text-navy leading-[1.5]">
                      {faq.q}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-4 h-4 mt-1 flex-shrink-0 stroke-blue fill-none transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-6 text-[13.5px] text-ihbs-muted leading-[1.75]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section opacity-0 bg-navy py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-white mb-4">
            Still Weighing Up Your Options?
          </h2>
          <p className="text-[14.5px] text-white/65 leading-[1.75] mb-8 max-w-[520px] mx-auto">
            Send us the details of what you need. You will get a straight answer, a fixed quote and a
            realistic timeline — with no obligation to proceed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Talk to Our Team
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
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-md font-body text-[13px] font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/50 no-underline"
            >
              Browse Free Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
