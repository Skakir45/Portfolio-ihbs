import { useEffect } from 'react';
import { Link } from 'react-router';

const SITE_URL = 'https://ihbsproservices.com';
const TERMS_URL = `${SITE_URL}/terms-of-service`;
const LAST_UPDATED = 'October 9, 2026';

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'These Terms of Service ("Terms") govern your access to and use of the website ihbsproservices.com and the PRO, business set-up, licensing, visa, document clearing, and government liaison services provided by IHBS – Insight Hub Business Services ("IHBS", "we", "us", or "our").',
      },
      {
        type: 'p',
        text: 'By accessing our website, submitting an enquiry, or engaging us to provide services, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our website or services. If you are engaging us on behalf of a company, you confirm that you are authorised to accept these Terms for that company.',
      },
    ],
  },
  {
    id: 'services',
    title: '2. About Us and the Services We Provide',
    blocks: [
      {
        type: 'p',
        text: 'IHBS is a business services provider based in Dubai, United Arab Emirates. We act as your representative and facilitator in dealings with UAE government departments and other authorities. The services we provide include:',
      },
      {
        type: 'list',
        items: [
          'Trade licence registration, renewal, amendment, and activity additions for mainland, free zone, and offshore entities.',
          'Visa and immigration processing, including employment, investor, partner, and family sponsorship applications.',
          'Document clearing, attestation, legalisation, translation, and notarisation support.',
          'WPS registration and payroll compliance support.',
          'Emirates ID and medical fitness coordination.',
          'Government liaison and general PRO support.',
        ],
      },
      {
        type: 'p',
        text: 'Service descriptions on our website are indicative. The specific scope of any engagement is the scope we confirm with you in writing — by email, WhatsApp, or a signed proposal or service order — for that engagement.',
      },
    ],
  },
  {
    id: 'eligibility',
    title: '3. Eligibility and Authority',
    blocks: [
      {
        type: 'p',
        text: 'Our services are intended for businesses and individuals who are legally able to enter into binding contracts and who are at least 18 years of age. You agree to provide accurate, current, and complete information about yourself and your business, and to keep that information up to date for as long as we act on your behalf.',
      },
    ],
  },
  {
    id: 'quotations',
    title: '4. Quotations, Engagements, and Fees',
    blocks: [
      {
        type: 'p',
        text: 'Quotations are based on the information you provide and on the government fees, professional fees, and third-party charges applicable at the time. We may revise a quotation if your instructions change, if the information you provided was incomplete or inaccurate, or if a government authority changes its requirements or fees.',
      },
      {
        type: 'p',
        text: 'Unless we state otherwise in writing, government fees and third-party charges are passed on to you at cost and are payable in advance. Our professional fees cover the work we perform and are separate from those government and third-party charges.',
      },
      {
        type: 'p',
        text: 'An engagement begins when you instruct us to proceed and, where we request it, pay the applicable advance. We reserve the right to decline any engagement.',
      },
    ],
  },
  {
    id: 'client-obligations',
    title: '5. Your Obligations and Document Responsibilities',
    blocks: [
      { type: 'p', text: 'To allow us to deliver the services you have engaged us for, you agree to:' },
      {
        type: 'list',
        items: [
          'Provide complete, accurate, and genuine documents and information when we request them, and cooperate with any request for clarification or additional supporting documents.',
          'Ensure that any document you provide is valid, unexpired, and lawfully obtained, and that you have the right to share it with us.',
          'Inform us promptly of any change to your contact details, company structure, immigration status, or the circumstances relevant to your application.',
          'Review drafts and applications we share with you and confirm them before submission.',
          'Comply with all applicable UAE laws, regulations, and the requirements of the relevant authorities.',
        ],
      },
      {
        type: 'p',
        text: 'We are not responsible for delays, rejections, fines, or losses caused by incomplete, inaccurate, fraudulent, or late information or documents, or by your failure to respond to the authority or to us within a required deadline. Where we incur additional work or cost because of such issues, we may charge for it and pass on any resulting government charges.',
      },
    ],
  },
  {
    id: 'government-approvals',
    title: '6. Government Approvals Are Outside Our Control',
    blocks: [
      {
        type: 'p',
        text: 'Approval, rejection, and timing decisions rest solely with the relevant government departments, free zone authorities, immigration offices, and other third parties. While we prepare and present your applications professionally and follow up diligently, we cannot guarantee that any application, licence, visa, or approval will be granted, or that it will be granted within a particular time.',
      },
      {
        type: 'p',
        text: 'Processing times we quote are good-faith estimates based on our experience and on current practice. They are not commitments, and they may change without notice due to policy changes, system downtime, public holidays, or the volume of applications being handled by the authority.',
      },
    ],
  },
  {
    id: 'payment',
    title: '7. Payment Terms',
    blocks: [
      {
        type: 'p',
        text: 'Invoices are payable within the period stated on the invoice, and in any event before the related submission is made unless we agree otherwise in writing. Payments may be made by the methods we confirm to you, including bank transfer and the payment links we provide. Bank charges and transfer fees are your responsibility.',
      },
      {
        type: 'p',
        text: 'Where an invoice remains unpaid beyond its due date, we may suspend work on your matter, withhold documents we are holding on your behalf, and charge reasonable interest or administrative charges permitted by applicable law. You remain responsible for the fees for work already carried out and for charges already incurred with authorities.',
      },
    ],
  },
  {
    id: 'refunds',
    title: '8. Cancellations and Refunds',
    blocks: [
      {
        type: 'p',
        text: 'If you cancel an engagement, we will calculate the fees fairly having regard to the work carried out, the time spent, and any non-refundable charges already paid or committed to third parties.',
      },
      {
        type: 'list',
        items: [
          'Government fees, free zone fees, typing centre charges, translation costs, and similar third-party charges are generally non-refundable once paid or committed, because those authorities do not refund them to us.',
          'Amounts already applied to work performed, including applications prepared and submitted, are not refundable.',
          'Any balance of advance payments that has not been applied to work performed or to non-refundable charges will be returned to you.',
          'If an application is rejected by the authority and we can remedy the matter, we will do so; if it cannot be remedied, we will advise you of your options. Government fees already incurred are not refunded by us.',
        ],
      },
      {
        type: 'p',
        text: 'Approved refunds are processed to the original method of payment within a reasonable period, typically within 30 days of approval.',
      },
    ],
  },
  {
    id: 'no-advice',
    title: '9. No Legal, Tax, or Immigration Advice',
    blocks: [
      {
        type: 'p',
        text: 'We provide administrative, procedural, and liaison services. Unless we expressly agree otherwise in writing, we do not provide legal, tax, accounting, or formal immigration advice, and nothing on our website or in our communications should be relied on as such advice. Where a matter requires it, you should consult a qualified lawyer, tax adviser, or other licensed professional.',
      },
    ],
  },
  {
    id: 'confidentiality',
    title: '10. Confidentiality and Data Protection',
    blocks: [
      {
        type: 'p',
        text: 'We treat the documents and information you share with us as confidential and use them only to deliver the services you have engaged us for, to comply with our legal obligations, and to maintain proper business records. We disclose them only to the authorities and service providers who need them for that purpose, or where the law requires it.',
      },
      {
        type: 'p',
        text: 'Our handling of personal data — including data you share with us through our website, our social media pages, and Meta platforms such as Facebook, Instagram, Messenger, and WhatsApp — is described in our Privacy Policy. Please read it together with these Terms.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: '11. Intellectual Property',
    blocks: [
      {
        type: 'p',
        text: 'All content on our website — including text, layout, graphics, logos, and the IHBS name and branding — is owned by us or licensed to us and is protected by applicable intellectual property laws. You may view and print pages for your own reference. You may not copy, reproduce, republish, sell, or use our content for commercial purposes without our prior written consent.',
      },
      {
        type: 'p',
        text: 'Documents you provide to us remain yours. We use them only as permitted by these Terms.',
      },
    ],
  },
  {
    id: 'acceptable-use',
    title: '12. Acceptable Use of Our Website',
    blocks: [
      { type: 'p', text: 'When using our website, you agree not to:' },
      {
        type: 'list',
        items: [
          'Submit false, misleading, or fraudulent information, or impersonate another person or business.',
          'Attempt to gain unauthorised access to our website, systems, or data, or interfere with its normal operation.',
          'Introduce viruses, malware, or any other harmful code.',
          'Scrape, harvest, or systematically extract content or contact details from our website.',
          'Use our website or services for any unlawful purpose or in breach of applicable UAE law.',
        ],
      },
    ],
  },
  {
    id: 'third-party-links',
    title: '13. Third-Party Links and Services',
    blocks: [
      {
        type: 'p',
        text: 'Our website may link to third-party websites, portals, and platforms, including government systems and our social media pages. Those services are governed by their own terms and privacy practices, which we do not control. We provide such links for convenience and are not responsible for their content, availability, or practices.',
      },
    ],
  },
  {
    id: 'liability',
    title: '14. Limitation of Liability',
    blocks: [
      {
        type: 'p',
        text: 'To the fullest extent permitted by applicable law, we are not liable for indirect, incidental, special, consequential, or punitive losses, or for loss of profit, revenue, business opportunity, or goodwill, arising out of or in connection with our services or your use of our website.',
      },
      {
        type: 'p',
        text: 'Our total aggregate liability in respect of any engagement is limited to the professional fees we actually received from you for that engagement, excluding government and third-party charges. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under UAE law.',
      },
    ],
  },
  {
    id: 'indemnity',
    title: '15. Indemnity',
    blocks: [
      {
        type: 'p',
        text: 'You agree to indemnify and hold IHBS, its directors, employees, and agents harmless against any claims, fines, penalties, losses, and reasonable costs arising from information or documents you provided that were false, misleading, or unlawfully obtained, from your breach of these Terms, or from your breach of applicable law.',
      },
    ],
  },
  {
    id: 'termination',
    title: '16. Suspension and Termination',
    blocks: [
      {
        type: 'p',
        text: 'We may suspend or terminate our services if you fail to provide required documents or information, fail to pay amounts due, ask us to act unlawfully, or breach these Terms. You may end an engagement by written notice, subject to settlement of fees and charges incurred up to that point and to the cancellation provisions in section 8.',
      },
      {
        type: 'p',
        text: 'Where we continue to hold your documents after an engagement ends, you may collect them from our office during our business hours, or ask us to return them by courier at your cost. We may retain copies where the law or our record-keeping obligations require it.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: '17. Governing Law and Dispute Resolution',
    blocks: [
      {
        type: 'p',
        text: 'These Terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have exclusive jurisdiction over any dispute arising out of or in connection with these Terms or our services, unless a mandatory provision of applicable law provides otherwise.',
      },
      {
        type: 'p',
        text: 'Before starting proceedings, we ask that you contact us so we can try to resolve the matter amicably.',
      },
    ],
  },
  {
    id: 'changes',
    title: '18. Changes to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'We may update these Terms from time to time to reflect changes in our services, technology, or legal requirements. The revised Terms will be posted on this page with a new "Last updated" date. Changes apply from the date they are posted, and your continued use of our website or services after that date means you accept the revised Terms. The Terms in force when you engaged us continue to apply to that engagement unless we agree otherwise in writing.',
      },
    ],
  },
  {
    id: 'contact',
    title: '19. Contact Us',
    blocks: [
      {
        type: 'p',
        text: 'If you have any questions about these Terms of Service, or wish to raise a concern about our services, please contact:',
      },
      {
        type: 'contact',
        lines: [
          'IHBS – Insight Hub Business Services',
          'Tanvi Hub Business Center, Deira, Dubai',
          'Email: info@ihbusinessservices.com',
          'Phone: +971 56 179 6442',
          'Website: https://ihbsproservices.com',
        ],
      },
    ],
  },
];

export default function TermsOfServicePage() {
  useEffect(() => {
    document.title = 'Terms of Service | IHBS – Insight Hub Business Services';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the IHBS Terms of Service covering our PRO, licensing, visa and document clearing services, fees, cancellations, liability, and governing law in the UAE.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', TERMS_URL);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', TERMS_URL);
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
            Terms of Service
          </h1>
          <p className="text-[15px] text-white/70 leading-[1.75] max-w-[620px]">
            These terms set out the basis on which IHBS – Insight Hub Business Services provides its
            PRO, licensing, visa, and government liaison services, and the rules for using our
            website.
          </p>
          <p className="text-[12px] text-white/40 tracking-[0.5px] mt-6">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ── Terms Body ── */}
      <section className="py-14 lg:py-20 px-6 lg:px-16">
        <div className="max-w-[900px] mx-auto">
          {/* Intro */}
          <p className="text-[15px] text-ihbs-muted leading-[1.8] mb-4">
            <strong className="text-navy">IHBS – Insight Hub Business Services</strong> ("IHBS", "we",
            "us", or "our") provides PRO and business support services in the United Arab Emirates.
            These Terms of Service apply when you visit{' '}
            <a href={SITE_URL} className="text-blue no-underline hover:underline">
              ihbsproservices.com
            </a>
            , when you contact us through our website, email, phone, or social media channels
            including Facebook, Instagram, Messenger, and WhatsApp, and when you engage us to
            provide services.
          </p>
          <p className="text-[15px] text-ihbs-muted leading-[1.8] mb-12">
            Please read them carefully, along with our{' '}
            <Link to="/privacy-policy" className="text-blue no-underline hover:underline">
              Privacy Policy
            </Link>
            , before engaging our services.
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
              Questions about these terms?
            </h2>
            <p className="text-[14.5px] text-ihbs-muted leading-[1.75] mb-6">
              Our team is happy to explain how they apply to your engagement.
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
