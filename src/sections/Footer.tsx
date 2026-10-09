import { Link } from 'react-router';

const footerLinks = {
  services: [
    { label: 'Trade License Services', href: '/services' },
    { label: 'Visa & Immigration', href: '/services' },
    { label: 'Document Clearing', href: '/services' },
    { label: 'WPS Registration', href: '/services' },
    { label: 'Emirates ID Services', href: '/services' },
    { label: 'Government Liaison', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about', isRoute: true },
    { label: 'Why Choose IHBS', href: '/#why-choose' },
    { label: 'Our Services', href: '/services', isRoute: true },
    { label: 'Careers', href: 'https://app.notion.com/p/Job-Listing-Template-e32efd052ec2481b99ffed24d9dbc29e' },
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'PRO Guide UAE', href: '#' },
    { label: 'Visa Requirements', href: '#' },
    { label: 'FAQs', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* ── Main Footer Content ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-5">
              <img
                src="/images/ihbs_logo.png"
                alt="IHBS – Insight Hub Business Services"
                width={50}
                height={50}
                className="w-[50px] h-[50px] object-contain"
              />
              <div className="leading-[1.15]">
                <strong className="block font-heading text-lg font-black tracking-[4px] text-white">
                  IHBS
                </strong>
                <span className="block text-[8px] font-semibold tracking-[1.5px] uppercase text-blue">
                  Insight Hub Business Services
                </span>
              </div>
            </Link>
            <p className="text-[13px] text-white/50 leading-[1.7] mb-5 max-w-[260px]">
              Your trusted PRO partner in the UAE. We simplify trade licensing, visa processing,
              document clearing, and government compliance — so you can focus on growing your
              business.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/ihbs-uae/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IHBS on LinkedIn"
                className="w-9 h-9 bg-white/[0.06] border border-white/[0.1] rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue/20 hover:border-blue/40"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/60">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/ihbsuae"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IHBS on Facebook"
                className="w-9 h-9 bg-white/[0.06] border border-white/[0.1] rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue/20 hover:border-blue/40"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/60">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ihbs_uae/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IHBS on Instagram"
                className="w-9 h-9 bg-white/[0.06] border border-white/[0.1] rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-blue/20 hover:border-blue/40"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/60">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading text-[13px] font-bold tracking-[1px] uppercase text-white mb-5">
              Our Services
            </h4>
            <ul className="space-y-3 list-none p-0">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-white/50 no-underline transition-colors duration-200 hover:text-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-heading text-[13px] font-bold tracking-[1px] uppercase text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3 list-none p-0">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-[13px] text-white/50 no-underline transition-colors duration-200 hover:text-blue"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[13px] text-white/50 no-underline transition-colors duration-200 hover:text-blue"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading text-[13px] font-bold tracking-[1px] uppercase text-white mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4 list-none p-0">
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 stroke-blue fill-none flex-shrink-0" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[13px] text-white/50 leading-[1.6]">
                  Business Bay, Dubai, UAE
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 stroke-blue fill-none flex-shrink-0" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+971561796442" className="text-[13px] text-white/50 no-underline transition-colors duration-200 hover:text-blue">
                  +971 56 179 6442
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 stroke-blue fill-none flex-shrink-0" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@ihbusinessservices.com" className="text-[13px] text-white/50 no-underline transition-colors duration-200 hover:text-blue">
                  info@ihbusinessservices.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 stroke-blue fill-none flex-shrink-0" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[13px] text-white/50 leading-[1.6]">
                  Sun – Thu: 9:00 AM – 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/40 tracking-[0.3px]">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-blue/70">IHBS – Insight Hub Business Services</span>.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-[12px] text-white/40 no-underline transition-colors duration-200 hover:text-white/60">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link to="/terms-of-service" className="text-[12px] text-white/40 no-underline transition-colors duration-200 hover:text-white/60">
              Terms of Service
            </Link>
            <span className="text-white/20">·</span>
            <span className="text-[12px] text-white/40 tracking-[0.3px]">
              We Register, You Prosper
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
