import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'info@ihbusinessservices.com';

const featuredGuides = [
  {
    category: 'Company Setup',
    readTime: '8 min read',
    title: 'Mainland, Free Zone or Offshore: Choosing the Right Licence',
    intro:
      'The jurisdiction you choose decides who you can sell to, how many visas you can hold, and how much your licence costs every year. Getting it wrong is expensive to undo.',
    points: [
      'Mainland licences let you trade anywhere in the UAE and bid for government work',
      'Free zone licences give you 100% ownership and fast setup, but restrict mainland trading',
      'Offshore structures suit holding companies and international invoicing, not local trade',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    category: 'Visas & Immigration',
    readTime: '6 min read',
    title: 'UAE Visa Types: Which One Fits Your Role in the Business',
    intro:
      'A licence alone does not let you live or work here. The visa you hold determines whether you can sponsor staff, sign contracts and open a bank account.',
    points: [
      'Investor and partner visas are tied to your shareholding in the licensed entity',
      'Employment visas depend on your establishment card and available visa quota',
      'Dependent and family visas require minimum salary and attested documents',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    category: 'Payroll & Compliance',
    readTime: '5 min read',
    title: 'WPS Explained: Why Payroll Compliance Cannot Wait',
    intro:
      'The Wage Protection System requires salaries to be paid through an approved channel on time. Lapses are one of the fastest routes to a blocked file.',
    points: [
      'Every registered employee must be paid through your WPS-linked bank channel',
      'Late or short payments trigger automatic flags with MOHRE',
      'A blocked file stops visa issuance, renewals and new labour approvals',
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue fill-none" strokeWidth="1.8">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const checklists = [
  {
    title: 'New Company Setup',
    count: 11,
    desc: 'From name reservation and initial approval through to bank account opening.',
  },
  {
    title: 'Trade Licence Renewal',
    count: 8,
    desc: 'What to clear, what to pay and what to check before the expiry date passes.',
  },
  {
    title: 'Employment Visa Processing',
    count: 9,
    desc: 'Quota, offer letter, MOHRE contract, medical, Emirates ID and stamping.',
  },
  {
    title: 'Document Attestation',
    count: 7,
    desc: 'The full chain: notary, ministry of foreign affairs, UAE embassy and MOFA.',
  },
  {
    title: 'Emirates ID & Residency',
    count: 6,
    desc: 'Biometrics, application tracking and what to do when a card is delayed.',
  },
  {
    title: 'Company Liquidation',
    count: 10,
    desc: 'Cancelling visas, clearing dues and closing the licence without leaving liabilities.',
  },
];

const guides = [
  {
    title: 'Mainland vs Free Zone vs Offshore: which licence fits your business',
    summary:
      'A practical breakdown of ownership, trading scope, visa capacity, office requirements and annual cost for each jurisdiction.',
    body: [
      'A mainland licence is issued by the emirate\'s economic department and lets your company trade freely across the UAE, invoice local clients, and take on government or semi-government contracts. It normally requires a physical office address — a shared or flexi-desk arrangement is often enough — and ownership of certain activities may need a local shareholder depending on the structure you choose. Annual costs are driven by the premises, the activity list and the number of visas you hold.',
      'A free zone licence is issued by one of the UAE\'s many free zones and generally allows full foreign ownership, faster processing and a bundled package of registration, premises and a visa allocation. The trade-off is market access: a free zone company usually needs an additional arrangement to invoice mainland clients directly, and some activities simply are not permitted outside the zone.',
      'An offshore company is registered in a jurisdiction such as JAFZA Offshore or RAK ICC. It is designed for holding assets, international invoicing and structuring ownership — not for trading inside the UAE. An offshore entity cannot rent an office, sponsor local staff or hold a UAE residence visa on its own; it still needs a mainland or free zone vehicle for that.',
      'The right answer usually comes down to three questions: who are your customers, will you sponsor staff, and do you need to hold assets or raise finance later. Answer those honestly and the jurisdiction almost selects itself. If you are unsure, tell us your activity and target clients and we will map the options with pricing side by side.',
    ],
  },
  {
    title: 'How UAE visa quotas actually work',
    summary:
      'Why you cannot sponsor staff the day your licence is issued, and how the establishment card and quota system fit together.',
    body: [
      'Two things sit between your trade licence and your first employee visa: the establishment card (or e-channel registration) and your visa quota. The establishment card opens your company\'s file with the immigration authority. The quota is the number of employment visas the authorities will allow you to sponsor — it is assessed against your legal form, office size, activity and paid-up capital.',
      'That is why a new company cannot always sponsor ten employees on day one. Quotas are granted incrementally and can be increased by uploading the evidence authorities ask for, such as an Ejari tenancy contract, company profile or audited financials. Applications that arrive without that evidence are commonly rejected.',
      'Once quota is in place, each employment visa runs through the same sequence: offer letter, entry permit, medical testing, Emirates ID application, MOHRE labour contract, visa stamping and — for staff who will actually work from the premises — the WPS payroll registration that ties their salary to a bank channel.',
      'The practical advice: start the quota and establishment card work while you are still finalising your premises, not afterwards. Sequenced correctly, a company can have its first employee visa in progress within days of the licence being issued.',
    ],
  },
  {
    title: 'Trade licence renewal: dates, penalties and staying ahead',
    summary:
      'Renewal surprises are almost always document problems. Here is what to clear before your expiry date.',
    body: [
      'UAE trade licences run for one year (a few jurisdictions offer multi-year terms). Renewal is not simply a payment — the authority checks that everything attached to the licence is still valid. Outstanding tenancy contracts, unpaid municipality fees, lapsed insurance and dormant visa files are the usual causes of delay.',
      'For a mainland licence, you will typically need a valid Ejari or tenancy contract, paid utilities and municipality charges, updated financial or VAT documents where applicable, and clearance for any visas linked to the licence. Free zone licences have their own requirements — often a renewed lease or flexi-desk package alongside updated incorporation documents.',
      'Overdue renewals attract late fees that grow with time, and an expired licence blocks visa renewals, bank account maintenance and new hire approvals. In the worst case the licence can be suspended or cancelled, which turns a routine renewal into a full re-application.',
      'The straightforward fix is a renewal calendar: start the file 30–45 days before expiry, confirm every supporting document is valid, and keep a copy of each renewal receipt. If you would like us to audit an existing licence before its due date, send it over and we will flag what needs clearing.',
    ],
  },
  {
    title: 'Document attestation: the full chain explained',
    summary:
      'Why a degree certificate or marriage certificate from abroad cannot be used in the UAE until it has been through four steps.',
    body: [
      'Documents issued outside the UAE are not recognised by local authorities until they have been attested. The chain generally runs: certification by the issuing authority in the country of origin, attestation by that country\'s Ministry of Foreign Affairs, attestation by the UAE embassy or consulate covering that country, and finally legalisation by the UAE Ministry of Foreign Affairs (MOFA) once the document is here.',
      'Not every document needs every step. Educational certificates for visa or professional licensing purposes follow the full chain. Commercial documents such as invoices and certificates of origin often go through the chamber of commerce in the country of origin first. Personal documents such as birth or marriage certificates must be translated into Arabic before the final UAE legalisation stage.',
      'The two mistakes that cause most delays are photocopies (originals are required at every stage) and translations done after attestation rather than before the final step. Arabic translation must be carried out by a certified legal translator, and the translation itself is stamped by the Ministry of Justice.',
      'Because the sequence is country-specific, the fastest route is to send us the document and tell us what it is for. We will confirm exactly which stamps it needs, in which order, and how long each stage takes.',
    ],
  },
  {
    title: 'Opening a UAE corporate bank account: what banks ask for',
    summary:
      'The compliance file matters more than the licence. Here is how to prepare for it.',
    body: [
      'Bank onboarding in the UAE is a compliance exercise, not a formality. Banks assess the substance of your business: who the owners are, where the money comes from, who your customers and suppliers are, and whether the activity on your licence matches the transactions you expect to make.',
      'A typical corporate file includes the trade licence, memorandum and articles of association, share certificates, passport and visa copies of shareholders and signatories, an establishment card, proof of address (Ejari or a utility bill), and — importantly — a written business profile describing your products, target markets, expected turnover and main counterparties.',
      'Applications stall most often for three reasons: an activity description that is too vague, unclear source of funds, or a business model that reads as high-risk to the compliance team (crypto, cash-intensive trading, or forex-style activity, for example). Each of those is manageable, but they need to be explained up front rather than discovered mid-application.',
      'Bank processing commonly takes two to six weeks after the file is complete, and different banks apply different risk appetites to the same business. We prepare the document pack and, where needed, coordinate introductions so you are not re-submitting the same paperwork to several institutions.',
    ],
  },
];

const glossary = [
  {
    term: 'PRO',
    def: 'Public Relations Officer — an authorised representative who handles government transactions on behalf of your company.',
  },
  {
    term: 'Trade Licence',
    def: 'The permit that allows a company to carry out a specific set of commercial, professional or industrial activities in the UAE.',
  },
  {
    term: 'Establishment Card',
    def: 'The immigration file opened for your company; a prerequisite for sponsoring employee visas and MOHRE labour contracts.',
  },
  {
    term: 'Visa Quota',
    def: 'The number of employment visas the authorities will allow a company to sponsor, based on its size, premises and activity.',
  },
  {
    term: 'MOHRE',
    def: 'Ministry of Human Resources and Emiratisation — regulates labour contracts, work permits and the Wage Protection System.',
  },
  {
    term: 'GDRFA',
    def: 'General Directorate of Residency and Foreigners Affairs — the Dubai immigration authority handling entry permits and residence visas.',
  },
  {
    term: 'ICP',
    def: 'Federal Authority for Identity, Citizenship, Customs and Port Security — issues Emirates IDs and handles federal residency matters.',
  },
  {
    term: 'WPS',
    def: 'Wage Protection System — the electronic payroll channel through which registered employees must be paid on time.',
  },
  {
    term: 'Ejari',
    def: 'The official registration of a tenancy contract in Dubai, required for licence renewal and many visa applications.',
  },
  {
    term: 'MOFA',
    def: 'Ministry of Foreign Affairs — carries out the final legalisation step for documents attested abroad.',
  },
  {
    term: 'Initial Approval',
    def: 'The preliminary clearance issued by an economic department allowing you to proceed with leasing and registration.',
  },
  {
    term: 'NOC',
    def: 'No Objection Certificate — a letter from an authority, landlord, or sponsor waiving an objection to a specific transaction.',
  },
];

const authorities = [
  { name: 'UAE Government Portal', desc: 'Central hub for all federal services', url: 'https://u.ae/en' },
  { name: 'Dubai Economy & Tourism', desc: 'Issues mainland trade licences in Dubai', url: 'https://www.dubaidet.gov.ae' },
  { name: 'Invest in Dubai', desc: 'DET platform for business setup and activity search', url: 'https://www.investindubai.gov.ae' },
  { name: 'MOHRE', desc: 'Labour contracts, work permits and WPS', url: 'https://www.mohre.gov.ae' },
  { name: 'GDRFA Dubai', desc: 'Entry permits and Dubai residence visas', url: 'https://www.gdrfad.gov.ae' },
  { name: 'ICP', desc: 'Emirates ID and federal residency services', url: 'https://icp.gov.ae' },
  { name: 'Ministry of Foreign Affairs', desc: 'Document legalisation and embassy services', url: 'https://www.mofa.gov.ae' },
  { name: 'Ministry of Economy', desc: 'Federal commercial regulation and trademarks', url: 'https://www.moet.gov.ae' },
  { name: 'Dubai Municipality', desc: 'Permits, food safety and health approvals', url: 'https://www.dm.gov.ae' },
  { name: 'Dubai Health Authority', desc: 'Healthcare licensing, medical tests and clinics', url: 'https://www.dha.gov.ae' },
  { name: 'TAMM — Abu Dhabi', desc: 'Abu Dhabi government services in one platform', url: 'https://www.tamm.abudhabi' },
  { name: 'Dubai Chamber of Commerce', desc: 'Membership and attestation of commercial documents', url: 'https://www.dubaichamber.com' },
];

const faqs = [
  {
    q: 'Are these resources free to use?',
    a: 'Yes. The guides on this page are written by our own PRO team and are free to read and share. Checklists are sent by email on request at no cost, and there is no obligation to engage us afterwards.',
  },
  {
    q: 'Can I get a checklist sent to me?',
    a: 'Yes. Click the request button on any checklist and it will open an email to our team with the checklist name already filled in. We normally reply the same working day with the checklist attached.',
  },
  {
    q: 'The rules change often — how current is this information?',
    a: 'Our team works with these authorities daily and we review these guides regularly, but government fees and requirements do change without long notice. Treat the pages here as a starting point and confirm the specifics of your case with us before you act on them.',
  },
  {
    q: 'Do you handle cases outside Dubai?',
    a: 'Yes. We work across all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain — including mainland, free zone and offshore jurisdictions.',
  },
];

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openGuide, setOpenGuide] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Resources | UAE Business Guides & Checklists | IHBS';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free UAE business resources from IHBS: in-depth guides on company setup, visas, licence renewal and attestation, downloadable checklists, a glossary of PRO terms, and links to official government portals.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://ihbs.ae/resources');
    }
  }, []);

  useGSAP(() => {
    if (!pageRef.current) return;

    const heroEls = pageRef.current.querySelectorAll('.res-hero-animate');
    if (heroEls.length) {
      gsap.fromTo(
        heroEls,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15, delay: 0.15 }
      );
    }

    const animateIn = (selector: string, vars: gsap.TweenVars, stagger = 0.1) => {
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
          ...vars,
        }
      );
    };

    animateIn('.featured-card', {}, 0.12);
    animateIn('.checklist-card', {}, 0.07);
    animateIn('.guide-item', {}, 0.06);
    animateIn('.glossary-card', {}, 0.04);
    animateIn('.authority-card', {}, 0.04);
    animateIn('.faq-item', {}, 0.06);

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
              'radial-gradient(circle at 20% 60%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 78% 25%, rgba(147,197,253,0.22) 0%, transparent 42%)',
          }}
        />
        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="res-hero-animate opacity-0 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue mb-6">
            <span className="block w-5 h-0.5 bg-blue" />
            Resources
            <span className="block w-5 h-0.5 bg-blue" />
          </div>
          <h1 className="res-hero-animate opacity-0 font-heading text-[clamp(32px,5vw,52px)] font-black leading-[1.1] text-white mb-5 tracking-tight">
            UAE Business Guides,{' '}
            <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
              Checklists & Answers
            </span>
          </h1>
          <p className="res-hero-animate opacity-0 text-[15px] lg:text-[16px] text-white/70 leading-[1.75] max-w-[640px] mx-auto">
            Everything we wish every founder in the UAE was told on day one — written by the PRO team
            that deals with these authorities every week. Free to read, no forms required.
          </p>
        </div>
      </section>

      {/* ── Featured Guides ── */}
      <section id="guides" className="bg-white -mt-8 relative z-10 mx-4 lg:mx-12 scroll-mt-[120px] lg:scroll-mt-[160px]">
        <div className="max-w-[1150px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <div
                key={guide.title}
                className="featured-card opacity-0 bg-white rounded-2xl border border-ihbs-border px-7 py-8 shadow-[0_8px_26px_rgba(13,27,62,0.08)] flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(13,27,62,0.12)]"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-ihbs-bg rounded-xl flex items-center justify-center">
                    {guide.icon}
                  </div>
                  <span className="text-[10.5px] font-bold uppercase tracking-[1.5px] text-blue bg-blue/[0.07] rounded-full px-3 py-1.5">
                    {guide.category}
                  </span>
                </div>
                <h2 className="font-heading text-[16.5px] font-bold text-navy leading-[1.35] mb-3">
                  {guide.title}
                </h2>
                <p className="text-[13.5px] text-ihbs-muted leading-[1.7] mb-5">{guide.intro}</p>
                <ul className="space-y-2.5 mt-auto pt-5 border-t border-ihbs-border">
                  {guide.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[12.5px] text-ihbs-text leading-[1.6]">
                      <svg viewBox="0 0 16 16" className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-blue fill-none" strokeWidth="2">
                        <polyline points="3.5 8 7 11.5 12.5 5" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-[11px] font-semibold tracking-[1px] uppercase text-ihbs-muted">
                  {guide.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In-depth Guides ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">In-Depth Guides</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              The PRO Guide to the UAE
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[580px] mx-auto">
              Five walkthroughs covering the questions we are asked most often. Open any guide to read
              the full explanation.
            </p>
          </div>

          <div className="space-y-3">
            {guides.map((guide, i) => {
              const isOpen = openGuide === i;
              return (
                <div
                  key={guide.title}
                  className={`guide-item opacity-0 bg-white rounded-xl border transition-colors duration-200 ${
                    isOpen ? 'border-blue/30 shadow-[0_6px_20px_rgba(13,27,62,0.07)]' : 'border-ihbs-border'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenGuide(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 lg:px-7 py-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading text-[15.5px] lg:text-[17px] font-bold text-navy leading-[1.4]">
                        {guide.title}
                      </h3>
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-4 h-4 mt-1.5 flex-shrink-0 stroke-blue fill-none transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    {!isOpen && (
                      <p className="text-[13.5px] text-ihbs-muted leading-[1.7] mt-2.5">
                        {guide.summary}
                      </p>
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 lg:px-7 pb-7">
                      <div className="space-y-4 text-[14px] text-ihbs-muted leading-[1.85]">
                        {guide.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                      <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-blue no-underline transition-opacity duration-200 hover:opacity-75"
                      >
                        Ask us about your case
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
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Checklists ── */}
      <section id="checklists" className="bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-16 scroll-mt-[120px] lg:scroll-mt-[160px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Free Checklists</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              Document Checklists We Use Internally
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[560px] mx-auto">
              The same step-by-step lists our team works from. Request any checklist and we will email
              it to you — free, with no obligation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {checklists.map((checklist) => (
              <div
                key={checklist.title}
                className="checklist-card opacity-0 bg-white rounded-xl border border-ihbs-border px-6 py-7 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(13,27,62,0.09)] hover:border-blue/25"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-blue fill-none" strokeWidth="1.9">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[1.2px] text-ihbs-muted">
                    {checklist.count} step checklist
                  </span>
                </div>
                <h3 className="font-heading text-[15px] font-bold text-navy mb-2">
                  {checklist.title}
                </h3>
                <p className="text-[13px] text-ihbs-muted leading-[1.7] mb-5 flex-1">
                  {checklist.desc}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    `Checklist request: ${checklist.title}`
                  )}&body=${encodeURIComponent(
                    `Please send me the "${checklist.title}" checklist.\n\nBusiness name: \nActivity: \nPhone: \n`
                  )}`}
                  className="inline-flex items-center justify-center gap-2 border border-blue/30 text-blue rounded-lg px-4 py-2.5 text-[12.5px] font-semibold no-underline transition-all duration-200 hover:bg-blue hover:text-white hover:border-blue"
                >
                  Request by email
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
            ))}
          </div>
        </div>
      </section>

      {/* ── Glossary ── */}
      <section id="glossary" className="py-16 lg:py-20 px-6 lg:px-16 scroll-mt-[120px] lg:scroll-mt-[160px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Speak the Language</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              UAE Business & PRO Glossary
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.7] max-w-[560px] mx-auto">
              The acronyms you will meet during setup and renewal, in plain English.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossary.map((entry) => (
              <div
                key={entry.term}
                className="glossary-card opacity-0 bg-ihbs-bg border border-ihbs-border rounded-xl px-5 py-5 transition-colors duration-200 hover:bg-white hover:border-blue/25"
              >
                <h3 className="font-heading text-[13.5px] font-bold text-navy mb-1.5 uppercase tracking-[0.5px]">
                  {entry.term}
                </h3>
                <p className="text-[12.5px] text-ihbs-muted leading-[1.65]">{entry.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Official Authorities ── */}
      <section id="authorities" className="bg-navy py-16 lg:py-20 px-6 lg:px-16 scroll-mt-[120px] lg:scroll-mt-[160px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-sky mb-4">
              <span className="block w-5 h-0.5 bg-sky" />
              Official Sources
              <span className="block w-5 h-0.5 bg-sky" />
            </div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-white mb-4">
              UAE Government Portals Worth Bookmarking
            </h2>
            <p className="text-[14.5px] text-white/65 leading-[1.7] max-w-[580px] mx-auto">
              Links open the official authorities in a new tab. Fees and requirements on those portals
              are the final word — always check them before acting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {authorities.map((authority) => (
              <a
                key={authority.name}
                href={authority.url}
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card opacity-0 group bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-5 no-underline transition-all duration-200 hover:bg-white/[0.12] hover:border-blue/50 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-[14px] font-bold text-white leading-[1.4]">
                    {authority.name}
                  </h3>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-blue fill-none opacity-70 transition-opacity duration-200 group-hover:opacity-100"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <p className="text-[12.5px] text-white/55 leading-[1.6] mt-2">{authority.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-ihbs-bg py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center mb-4">Good to Know</div>
            <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-navy mb-4">
              About These Resources
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
      <section className="cta-section opacity-0 bg-navy py-16 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-white mb-4">
            Need an Answer for Your Specific Case?
          </h2>
          <p className="text-[14.5px] text-white/65 leading-[1.75] mb-8 max-w-[520px] mx-auto">
            Guides cover the common path. Your situation may have a detail that changes everything —
            send it to us and we will tell you what applies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Ask a Question
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
              to="/why-us"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-md font-body text-[13px] font-semibold transition-all duration-200 hover:bg-white/10 hover:border-white/50 no-underline"
            >
              Why Choose IHBS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
