import { useRef, useEffect, useState, type FormEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const PHONE_DISPLAY = '+971 56 179 6442';
const PHONE_TEL = '+971561796442';
const EMAIL = 'info@ihbusinessservices.com';
const WHATSAPP = `https://wa.me/971561796442?text=${encodeURIComponent(
  'Hello IHBS, I would like help with a PRO services enquiry.'
)}`;
const ADDRESS = 'Tanvi Hub Business Center, Deira, Dubai';
const MAP_QUERY = encodeURIComponent('Tanvi Hub Business Center, Deira, Dubai');

const serviceOptions = [
  'Trade Licence & Company Setup',
  'Visa & Immigration',
  'Document Clearing & Attestation',
  'Emirates ID Services',
  'WPS & Payroll Compliance',
  'Government Liaison',
  'Something else',
];

const quickContacts = [
  {
    label: 'Call Us',
    value: PHONE_DISPLAY,
    note: 'Mon – Sat, 9:00 AM – 6:00 PM',
    href: `tel:${PHONE_TEL}`,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-blue fill-none" strokeWidth="1.9">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: 'Chat with our team',
    note: 'Fastest route for quick questions',
    href: WHATSAPP,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-blue fill-none" strokeWidth="1.9">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: EMAIL,
    note: 'Replies within one working day',
    href: `mailto:${EMAIL}`,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-blue fill-none" strokeWidth="1.9">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Visit the Office',
    value: ADDRESS,
    note: 'Walk-ins welcome during office hours',
    href: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-blue fill-none" strokeWidth="1.9">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const nextSteps = [
  {
    step: '01',
    title: 'We read your enquiry',
    desc: 'Your message reaches our team directly — not a ticket queue. We review the details you send and identify what applies to your case.',
  },
  {
    step: '02',
    title: 'You get a scoped answer',
    desc: 'Within one working day we come back with the documents required, a fixed quote for our service, the government fees involved, and a realistic timeline.',
  },
  {
    step: '03',
    title: 'You decide, then we move',
    desc: 'Nothing is charged until you approve the quote. Once you approve, your account manager starts the file and keeps you updated at each stage.',
  },
];

const faqs = [
  {
    q: 'How quickly will I hear back?',
    a: 'Emails and form enquiries are answered within one working day, usually the same day. WhatsApp and phone are answered during office hours — Monday to Saturday, 9:00 AM to 6:00 PM.',
  },
  {
    q: 'Do you charge for the first consultation?',
    a: 'No. The initial assessment, the document list and the fixed quote are all free. You only pay once you approve the scope of work.',
  },
  {
    q: 'Can I just walk into your office?',
    a: 'Yes, you are welcome to visit us at Tanvi Hub Business Center in Deira during office hours. If your matter involves specific documents it helps to message us first so the right specialist is available.',
  },
  {
    q: 'Can you work with documents I send electronically?',
    a: 'Yes. Scanned copies are enough for review, quotations and most submissions. Where an authority requires originals — attestation, certain licence applications — we tell you exactly which documents to courier or hand over, and we log everything we receive.',
  },
];

type FormStatus = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Contact Us | IHBS – Insight Hub Business Services | Deira, Dubai';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Contact IHBS in Deira, Dubai for PRO services in the UAE. Call or WhatsApp ${PHONE_DISPLAY}, email ${EMAIL}, or send an enquiry and receive a fixed quote within one working day.`
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://ihbs.ae/contact');
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') ?? ''),
      company: String(formData.get('company') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      service: String(formData.get('service') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    // No form endpoint configured yet: hand the enquiry to the visitor's email client
    // with every field pre-filled, so no enquiry is ever silently lost.
    if (!endpoint) {
      const body = [
        `Name: ${payload.name}`,
        `Company: ${payload.company || '-'}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || '-'}`,
        `Service needed: ${payload.service || '-'}`,
        '',
        payload.message,
      ].join('\n');

      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Website enquiry — ${payload.service || 'PRO services'}`
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Contact form endpoint responded with ${response.status}`);
      }
      form.reset();
      setStatus('sent');
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
    }
  };

  useGSAP(() => {
    if (!pageRef.current) return;

    const heroEls = pageRef.current.querySelectorAll('.contact-hero-animate');
    if (heroEls.length) {
      gsap.fromTo(
        heroEls,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15, delay: 0.15 }
      );
    }

    const animateIn = (selector: string, stagger = 0.1) => {
      const els = pageRef.current!.querySelectorAll(selector);
      if (!els.length) return;
      gsap.fromTo(
        els,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: els[0], start: 'top 85%', once: true },
        }
      );
    };

    animateIn('.quick-card', 0.08);
    animateIn('.contact-panel', 0.15);
    animateIn('.next-step', 0.1);
    animateIn('.faq-item', 0.06);

    const mapBlock = pageRef.current.querySelector('.map-block');
    if (mapBlock) {
      gsap.fromTo(
        mapBlock,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: mapBlock, start: 'top 85%', once: true } }
      );
    }
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      {/* ── ContactPage Schema (JSON-LD) ── */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact IHBS – Insight Hub Business Services',
          url: 'https://ihbs.ae/contact',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: 'IHBS – Insight Hub Business Services',
            telephone: PHONE_TEL,
            email: EMAIL,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Tanvi Hub Business Center, Deira',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                telephone: PHONE_TEL,
                email: EMAIL,
                availableLanguage: ['en', 'ar'],
                areaServed: 'AE',
              },
            ],
          },
        })}
      </script>

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
              'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.32) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147,197,253,0.22) 0%, transparent 45%)',
          }}
        />
        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="contact-hero-animate opacity-0 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue mb-6">
            <span className="block w-5 h-0.5 bg-blue" />
            Contact Us
            <span className="block w-5 h-0.5 bg-blue" />
          </div>
          <h1 className="contact-hero-animate opacity-0 font-heading text-[clamp(32px,5vw,52px)] font-black leading-[1.1] text-white mb-5 tracking-tight">
            Tell Us What You Need.{' '}
            <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
              We Will Handle It.
            </span>
          </h1>
          <p className="contact-hero-animate opacity-0 text-[15px] lg:text-[16px] text-white/70 leading-[1.75] max-w-[620px] mx-auto">
            A licence application, a visa, an attestation, a renewal that is running late — send the
            details and you will get a straight answer with a fixed quote, usually within one working
            day.
          </p>
        </div>
      </section>

      {/* ── Quick Contact Cards ── */}
      <section className="bg-white -mt-8 relative z-10 mx-4 lg:mx-12">
        <div className="max-w-[1150px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickContacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="quick-card opacity-0 bg-white rounded-2xl border border-ihbs-border px-6 py-6 no-underline shadow-[0_8px_26px_rgba(13,27,62,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_14px_34px_rgba(13,27,62,0.12)]"
              >
                <div className="w-11 h-11 bg-ihbs-bg rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-ihbs-muted mb-1.5">
                  {item.label}
                </div>
                <div className="font-heading text-[14px] font-bold text-navy leading-[1.45] mb-2 break-words">
                  {item.value}
                </div>
                <p className="text-[12px] text-ihbs-muted leading-[1.55]">{item.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Office Details ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1150px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10">
          {/* Enquiry Form */}
          <div className="contact-panel opacity-0 bg-white rounded-2xl border border-ihbs-border px-7 py-9 lg:px-10 lg:py-10 shadow-[0_4px_20px_rgba(13,27,62,0.05)]">
            <h2 className="font-heading text-[clamp(20px,2.6vw,28px)] font-extrabold text-navy mb-3">
              Send Us an Enquiry
            </h2>
            <p className="text-[14px] text-ihbs-muted leading-[1.7] mb-8">
              Fields marked with an asterisk are required. The more detail you give us about your
              activity and timeline, the more precise our answer will be.
            </p>

            <form onSubmit={handleSubmit} noValidate={false}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[12.5px] font-semibold text-navy mb-2">
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Ahmed Khan"
                    className="w-full rounded-lg border border-ihbs-border bg-ihbs-bg px-4 py-3 text-[13.5px] text-ihbs-text outline-none transition-colors duration-200 focus:border-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-[12.5px] font-semibold text-navy mb-2">
                    Company / business name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Optional"
                    className="w-full rounded-lg border border-ihbs-border bg-ihbs-bg px-4 py-3 text-[13.5px] text-ihbs-text outline-none transition-colors duration-200 focus:border-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[12.5px] font-semibold text-navy mb-2">
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-ihbs-border bg-ihbs-bg px-4 py-3 text-[13.5px] text-ihbs-text outline-none transition-colors duration-200 focus:border-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[12.5px] font-semibold text-navy mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+971 5X XXX XXXX"
                    className="w-full rounded-lg border border-ihbs-border bg-ihbs-bg px-4 py-3 text-[13.5px] text-ihbs-text outline-none transition-colors duration-200 focus:border-blue focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className="block text-[12.5px] font-semibold text-navy mb-2">
                    What do you need help with? *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-ihbs-border bg-ihbs-bg px-4 py-3 text-[13.5px] text-ihbs-text outline-none transition-colors duration-200 focus:border-blue focus:bg-white"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-[12.5px] font-semibold text-navy mb-2">
                    Details of your enquiry *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your business, the activity, your timeline, and anything a previous provider has already done."
                    className="w-full rounded-lg border border-ihbs-border bg-ihbs-bg px-4 py-3 text-[13.5px] text-ihbs-text leading-[1.65] outline-none transition-colors duration-200 focus:border-blue focus:bg-white resize-y"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-blue text-white px-8 py-3.5 rounded-md font-body text-[13.5px] font-semibold transition-all duration-200 hover:bg-blue/90 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                  {status !== 'sending' && (
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
                  )}
                </button>
                <p className="text-[12px] text-ihbs-muted leading-[1.6] max-w-[280px]">
                  We use your details only to respond to this enquiry. See our{' '}
                  <Link to="/privacy-policy" className="text-blue no-underline hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {status === 'sent' && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-lg border border-blue/25 bg-blue/[0.06] px-5 py-4"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 flex-shrink-0 stroke-blue fill-none" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="text-[13px] text-navy leading-[1.65]">
                    Thank you — your enquiry has been sent. Our team will respond within one working
                    day.
                  </p>
                </div>
              )}

              {status === 'mailto' && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-lg border border-blue/25 bg-blue/[0.06] px-5 py-4"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 flex-shrink-0 stroke-blue fill-none" strokeWidth="1.9">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <p className="text-[13px] text-navy leading-[1.65]">
                    Your email app should have opened with the enquiry pre-filled. If it did not, email
                    us directly at{' '}
                    <a href={`mailto:${EMAIL}`} className="text-blue font-semibold no-underline hover:underline">
                      {EMAIL}
                    </a>{' '}
                    or message us on WhatsApp.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-5 py-4"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 flex-shrink-0 stroke-red-500 fill-none" strokeWidth="1.9">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-[13px] text-navy leading-[1.65]">
                    Something went wrong sending your enquiry. Please email us at{' '}
                    <a href={`mailto:${EMAIL}`} className="text-blue font-semibold no-underline hover:underline">
                      {EMAIL}
                    </a>{' '}
                    or call {PHONE_DISPLAY}.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Office Details */}
          <aside className="contact-panel opacity-0 flex flex-col gap-6">
            <div className="bg-navy rounded-2xl px-7 py-8 text-white">
              <h2 className="font-heading text-[18px] font-extrabold mb-6">Office Details</h2>
              <ul className="space-y-5 list-none p-0">
                <li className="flex items-start gap-3.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mt-1 stroke-blue fill-none flex-shrink-0" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[1.3px] text-white/45 mb-1">
                      Address
                    </div>
                    <p className="text-[13.5px] text-white/80 leading-[1.65]">{ADDRESS}</p>
                    <p className="text-[12.5px] text-white/50 leading-[1.6]">United Arab Emirates</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mt-1 stroke-blue fill-none flex-shrink-0" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[1.3px] text-white/45 mb-1">
                      Office Hours
                    </div>
                    <p className="text-[13.5px] text-white/80 leading-[1.65]">Monday – Saturday</p>
                    <p className="text-[12.5px] text-white/50 leading-[1.6]">
                      9:00 AM – 6:00 PM · Sunday closed
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mt-1 stroke-blue fill-none flex-shrink-0" strokeWidth="1.9">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[1.3px] text-white/45 mb-1">
                      Phone
                    </div>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="text-[13.5px] text-white/80 no-underline transition-colors duration-200 hover:text-blue"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mt-1 stroke-blue fill-none flex-shrink-0" strokeWidth="1.9">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[1.3px] text-white/45 mb-1">
                      Email
                    </div>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-[13px] text-white/80 no-underline transition-colors duration-200 hover:text-blue break-all"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7 pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue text-white rounded-lg px-5 py-3 text-[13px] font-semibold no-underline transition-all duration-200 hover:bg-blue/90 hover:-translate-y-0.5"
                >
                  Message on WhatsApp
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white rounded-lg px-5 py-3 text-[13px] font-semibold no-underline transition-all duration-200 hover:bg-white/10"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="bg-ihbs-bg rounded-2xl border border-ihbs-border px-7 py-7">
              <h3 className="font-heading text-[14.5px] font-bold text-navy mb-4">
                Before You Write to Us
              </h3>
              <ul className="space-y-3 list-none p-0">
                {[
                  'Your trade licence number, if you already have one',
                  'The service you need and your target timeline',
                  'Any application already in progress with an authority',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-ihbs-muted leading-[1.65]">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-blue fill-none" strokeWidth="2">
                      <polyline points="3.5 8 7 11.5 12.5 5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[12.5px] text-ihbs-muted leading-[1.7] mt-4">
                Missing some of this? Send what you have — we will tell you what else we need.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="px-6 lg:px-16 pb-16 lg:pb-20">
        <div className="max-w-[1150px] mx-auto map-block opacity-0">
          <div className="rounded-2xl overflow-hidden border border-ihbs-border shadow-[0_4px_20px_rgba(13,27,62,0.07)] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 lg:px-8 py-5 border-b border-ihbs-border">
              <div>
                <div className="text-[11px] font-semibold tracking-[2px] uppercase text-blue mb-1">
                  Find Us
                </div>
                <h2 className="font-heading text-[15px] lg:text-[18px] font-extrabold text-navy tracking-tight">
                  {ADDRESS}
                </h2>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-blue/30 text-blue rounded-lg px-4 py-2.5 text-[12.5px] font-semibold no-underline transition-all duration-200 hover:bg-blue hover:text-white hover:border-blue"
              >
                Open in Google Maps
                <svg
                  width="13"
                  height="13"
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
            <iframe
              title={`Map showing the IHBS office at ${ADDRESS}`}
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[320px] lg:h-[420px] border-0 block"
            />
          </div>
        </div>
      </section>

      {/* ── What Happens Next ── */}
      <section className="bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">What Happens Next</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              From Enquiry to Clear Answer in Three Steps
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[560px] mx-auto">
              No sales pressure, no vague estimates. Just a scoped answer you can act on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((item) => (
              <div
                key={item.step}
                className="next-step opacity-0 bg-white rounded-2xl border border-ihbs-border px-7 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="font-heading text-[13px] font-black text-blue tracking-[2px] mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-[16px] font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-[13.5px] text-ihbs-muted leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Before You Reach Out</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              Quick Contact Questions
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
                    <p className="px-6 pb-6 text-[13.5px] text-ihbs-muted leading-[1.75]">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-white mb-4">
            Prefer to Speak to Someone First?
          </h2>
          <p className="text-[14.5px] text-white/65 leading-[1.75] mb-8 max-w-[520px] mx-auto">
            Call {PHONE_DISPLAY} during office hours, or explore what we do and how we work before you
            get in touch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${PHONE_TEL}`} className="btn-primary">
              Call {PHONE_DISPLAY}
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-md font-body text-[13px] font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/50 no-underline"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
