import { useEffect } from 'react';

const SITE_URL = 'https://ihbsproservices.com';
const POLICY_URL = `${SITE_URL}/privacy-policy`;
const LAST_UPDATED = 'October 8, 2026';

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    blocks: [
      {
        type: 'p',
        text: 'We collect information that you provide to us directly, information we receive from Meta Platforms when you interact with our Facebook page, Instagram profile, or other Meta services, and information collected automatically when you use our website.',
      },
      {
        type: 'h3',
        text: 'Information you provide to us',
        items: [
          'Identity and contact details such as your name, email address, telephone number, company name, and job title.',
          'Business and regulatory documents you share with us so we can deliver PRO services, such as trade licence copies, Emirates ID or passport copies, visa documents, and powers of attorney.',
          'Messages, enquiries, and service details you submit through our contact forms, by email, by phone, or through social media.',
          'Billing information needed to raise invoices and process payments.',
        ],
      },
      {
        type: 'h3',
        text: 'Information we receive from Meta Platforms',
        items: [
          'When you contact us through our Facebook page, Instagram profile, Messenger, or WhatsApp Business account, we receive your public profile name, profile identifier, and the content of the messages you send us.',
          'When you submit a lead form, advertisement enquiry, or similar Meta-hosted form, we receive the fields you chose to share, typically your name, email address, and telephone number.',
          'When you connect with us through Meta login or an integration authorised by you, we receive only the permissions and data you explicitly consent to share.',
          'We do not receive your Meta password, and we do not access private message threads, friend lists, or profile content that you have not shared with us.',
        ],
      },
      {
        type: 'h3',
        text: 'Information collected automatically',
        items: [
          'Technical data such as IP address, browser type and version, device type, operating system, referring URL, and approximate location derived from your IP address.',
          'Usage data such as the pages you visit, the time spent on them, and the links you click.',
          'Cookie and pixel data described in section 4 below.',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    blocks: [
      { type: 'p', text: 'We use the information we collect to:' },
      {
        type: 'list',
        items: [
          'Provide, administer, and deliver the PRO services you request, including trade licence applications, visa processing, document clearing, WPS registration, Emirates ID support, and government liaison.',
          'Communicate with you about your enquiries, applications, and ongoing services.',
          'Respond to messages you send us on our website, by email, or through Meta platforms such as Facebook, Instagram, Messenger, and WhatsApp.',
          'Comply with legal, regulatory, and licensing obligations, and respond to lawful requests from UAE government authorities.',
          'Operate, maintain, and improve our website and services.',
          'Send you service updates and, where permitted, marketing communications about our services. You can opt out at any time.',
          'Detect, prevent, and address fraud, abuse, or security incidents.',
        ],
      },
    ],
  },
  {
    id: 'legal-basis',
    title: '3. Legal Basis for Processing',
    blocks: [
      {
        type: 'p',
        text: 'We process personal data on one or more of the following bases: your consent, the performance of a contract or the steps needed to enter into one, our obligation to comply with applicable law (including UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection), and our legitimate interests in running and improving our business in a way that does not override your rights.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies and Tracking Technologies',
    blocks: [
      {
        type: 'p',
        text: 'Our website uses cookies and similar technologies to keep the site working, remember your preferences, and understand how visitors use the site. We use Google Tag Manager and Google Analytics for measurement, and we may use the Meta Pixel to measure and improve the performance of our advertising on Meta platforms.',
      },
      {
        type: 'p',
        text: 'You can control or delete cookies through your browser settings. Blocking some cookies may affect how the website functions. Where required by law, we ask for your consent before setting non-essential cookies.',
      },
    ],
  },
  {
    id: 'sharing',
    title: '5. How We Share Information',
    blocks: [
      { type: 'p', text: 'We do not sell your personal data. We share information only as follows:' },
      {
        type: 'list',
        items: [
          'With government authorities and regulators in the UAE, to the extent necessary to complete the applications and filings you have asked us to handle.',
          'With trusted service providers who support our operations, such as hosting, analytics, IT, and payment providers, under confidentiality obligations and only as needed to perform their services.',
          'With Meta Platforms where you have chosen to engage with us through a Meta product, and where such sharing is necessary to respond to your enquiry.',
          'With our professional advisers, such as auditors and lawyers, where necessary.',
          'Where required by law, regulation, court order, or to protect our legal rights.',
          'In connection with a business sale, merger, or restructuring, in which case your data may be transferred as part of the business assets.',
        ],
      },
    ],
  },
  {
    id: 'transfers',
    title: '6. International Data Transfers',
    blocks: [
      {
        type: 'p',
        text: 'Some of our service providers store or process data outside the UAE. When we transfer personal data internationally, we take reasonable measures to ensure it remains protected in accordance with applicable law, including through contractual safeguards with the recipient.',
      },
    ],
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    blocks: [
      {
        type: 'p',
        text: 'We retain personal data only for as long as necessary to fulfil the purposes described in this policy, to satisfy our legal and regulatory obligations in the UAE, to maintain business records, and to resolve disputes. Records relating to government filings are kept for the period required by the relevant authorities. When data is no longer needed, we securely delete or anonymise it.',
      },
    ],
  },
  {
    id: 'security',
    title: '8. Data Security',
    blocks: [
      {
        type: 'p',
        text: 'We use administrative, organisational, and technical safeguards designed to protect personal data against unauthorised access, loss, misuse, or alteration. Access to personal data is limited to staff and service providers who need it to perform their duties. No method of transmitting or storing data is completely secure, so we cannot guarantee absolute security.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: '9. Your Rights',
    blocks: [
      {
        type: 'p',
        text: 'Subject to applicable law, you have the right to:',
      },
      {
        type: 'list',
        items: [
          'Request access to the personal data we hold about you.',
          'Request correction of inaccurate or incomplete personal data.',
          'Request deletion of your personal data, where we are not required to keep it.',
          'Object to or restrict certain processing, including direct marketing.',
          'Withdraw consent at any time, where we rely on consent as the legal basis.',
          'Lodge a complaint with the relevant supervisory authority.',
        ],
      },
      {
        type: 'p',
        text: 'To exercise any of these rights, contact us using the details in section 14 below. We aim to respond within 30 days.',
      },
    ],
  },
  {
    id: 'data-deletion',
    title: '10. Data Deletion Instructions',
    blocks: [
      {
        type: 'p',
        text: 'If you would like us to delete the personal data we hold about you — including data you shared with us through a Meta platform such as Facebook, Instagram, Messenger, or WhatsApp — you can request deletion in any of the following ways:',
      },
      {
        type: 'list',
        items: [
          'Email info@ihbusinessservices.com with the subject line "Data Deletion Request" from the email address associated with your enquiry.',
          'Call or message us on +971 56 179 6442 with your deletion request.',
          'Where you connected through a Meta login or application, you can also remove our application from your Facebook account under Settings & Privacy → Settings → Apps and Websites, and submit a deletion request to us as described above.',
        ],
      },
      {
        type: 'p',
        text: 'On receiving a valid request, we will confirm it, delete the personal data covered by the request from our active systems, and instruct our service providers to do the same, except where we are legally required or permitted to retain it. We will respond within 30 days.',
      },
    ],
  },
  {
    id: 'children',
    title: '11. Children\u2019s Privacy',
    blocks: [
      {
        type: 'p',
        text: 'Our services are intended for businesses and adults. We do not knowingly collect personal data from children under the age of 16. If you believe a child has provided us with personal data, please contact us and we will delete it.',
      },
    ],
  },
  {
    id: 'third-party-links',
    title: '12. Third-Party Links',
    blocks: [
      {
        type: 'p',
        text: 'Our website may contain links to third-party websites and platforms, including our social media pages. We are not responsible for the privacy practices of those third parties, and we encourage you to read their privacy policies before providing any personal data.',
      },
    ],
  },
  {
    id: 'changes',
    title: '13. Changes to This Policy',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The revised policy will be posted on this page with a new "Last updated" date. We encourage you to review this page periodically.',
      },
    ],
  },
  {
    id: 'contact',
    title: '14. Contact Us',
    blocks: [
      {
        type: 'p',
        text: 'If you have any questions about this Privacy Policy or how we handle your personal data, please contact:',
      },
      {
        type: 'contact',
        lines: [
          'IHBS – Insight Hub Business Services',
          'Tanvi Hub Business, Deira, Dubai',
          'Email: info@ihbusinessservices.com',
          'Phone: +971 56 179 6442',
          'Website: https://ihbsproservices.com',
        ],
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | IHBS – Insight Hub Business Services';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the IHBS Privacy Policy to learn what personal data we collect, how we use and protect it, and how to request access or deletion of your information.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', POLICY_URL);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', POLICY_URL);
    }
  }, []);

  return (
    <div>
      {/* ── Page Hero ── */}
      <section className="relative bg-navy pt-24 pb-14 lg:pt-32 lg:pb-16 px-6 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147,197,253,0.2) 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-[900px] mx-auto">
          <div className="hero-eyebrow">Legal</div>
          <h1 className="font-heading text-[clamp(30px,4.5vw,46px)] font-black leading-[1.15] text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[15px] text-white/70 leading-[1.75] max-w-[620px]">
            This policy explains what personal data IHBS – Insight Hub Business Services collects,
            how we use it, and the choices and rights you have.
          </p>
          <p className="text-[12px] text-white/40 tracking-[0.5px] mt-6">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ── Policy Body ── */}
      <section className="py-14 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[900px] mx-auto">
          {/* Intro */}
          <p className="text-[15px] text-ihbs-muted leading-[1.8] mb-4">
            <strong className="text-navy">IHBS – Insight Hub Business Services</strong> ("IHBS", "we",
            "us", or "our") respects your privacy. This Privacy Policy describes how we collect, use,
            disclose, and safeguard personal data when you visit{' '}
            <a
              href={SITE_URL}
              className="text-blue no-underline hover:underline"
            >
              ihbsproservices.com
            </a>
            , when you engage with us through our social media pages and messaging channels,
            including Facebook, Instagram, Messenger, and WhatsApp, and when you use our PRO
            services.
          </p>
          <p className="text-[15px] text-ihbs-muted leading-[1.8] mb-12">
            By using our website or services, or by contacting us through a Meta platform, you agree
            to the practices described in this policy.
          </p>

          {sections.map((section) => (
            <div key={section.id} id={section.id} className="mb-12 last:mb-0">
              <h2 className="font-heading text-[clamp(19px,2.4vw,24px)] font-extrabold text-navy mb-5 leading-[1.3]">
                {section.title}
              </h2>

              {section.blocks.map((block, i) => {
                if (block.type === 'p') {
                  return (
                    <p key={i} className="text-[14.5px] text-ihbs-muted leading-[1.8] mb-4">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'h3') {
                  return (
                    <div key={i} className="mb-5">
                      <h3 className="font-heading text-[15.5px] font-bold text-navy mb-3">
                        {block.text}
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {block.items?.map((item) => (
                          <li
                            key={item}
                            className="text-[14.5px] text-ihbs-muted leading-[1.75] marker:text-blue"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-2 mb-4">
                      {block.items?.map((item) => (
                        <li
                          key={item}
                          className="text-[14.5px] text-ihbs-muted leading-[1.75] marker:text-blue"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === 'contact') {
                  return (
                    <div
                      key={i}
                      className="bg-ihbs-bg border border-ihbs-border rounded-xl px-6 py-5 space-y-1.5"
                    >
                      {block.lines?.map((line) => (
                        <p key={line} className="text-[14.5px] text-navy leading-[1.7] m-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-14 pt-10 border-t border-ihbs-border">
            <h2 className="font-heading text-[19px] font-extrabold text-navy mb-3">
              Questions about your data?
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.75] mb-6">
              Our team is happy to help with access, correction, or deletion requests.
            </p>
            <a href="mailto:info@ihbusinessservices.com" className="btn-primary">
              Email info@ihbusinessservices.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
