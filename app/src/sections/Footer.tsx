import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#who-we-are' },
  { label: 'Our Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-choose' },
  { label: 'Contact Us', href: '#contact' },
];

const services = [
  { label: 'Trade License', href: '#services' },
  { label: 'Visa Services', href: '#services' },
  { label: 'Document Clearing', href: '#services' },
  { label: 'Government Liaison', href: '#services' },
  { label: 'Emirates ID', href: '#services' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;
    const cols = footerRef.current.querySelectorAll('.footer-col');
    gsap.fromTo(
      cols,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-ihbs-footer">
      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="footer-col opacity-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center">
                <img
                  src="/images/ihbs_logo.png"
                  alt="IHBS Logo"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div>
                <strong className="block font-heading text-xl font-black tracking-[4px] text-white">
                  IHBS
                </strong>
                <span className="block text-[9px] font-semibold tracking-[1.5px] uppercase text-blue/80">
                  Insight Hub Business Services
                </span>
              </div>
            </div>
            <p className="text-[13px] text-white/45 leading-[1.7] mb-5 max-w-[260px]">
              We Register, You Prosper. Comprehensive PRO solutions to help businesses start, stay compliant, and grow with confidence in the UAE.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { name: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                { name: 'Instagram', path: 'M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-all duration-200 hover:bg-blue hover:border-blue hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 stroke-white/70 fill-none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col opacity-0">
            <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white/90 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-white/45 transition-all duration-200 hover:text-blue hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col opacity-0">
            <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white/90 mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-[13px] text-white/45 transition-all duration-200 hover:text-blue hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col opacity-0">
            <h4 className="text-[13px] font-bold uppercase tracking-[1.5px] text-white/90 mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-blue flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[13px] text-white/45">
                  Dubai, United Arab Emirates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-blue flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-[13px] text-white/45">
                  +971 4 123 4567
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-blue flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="text-[13px] text-white/45">
                  info@ihbs.ae
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-blue flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span className="text-[13px] text-white/45">
                  Sat - Thu: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/35 tracking-[0.3px]">
            &copy; {new Date().getFullYear()} <span className="text-blue">IHBS</span> — Insight Hub Business Services. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[12px] text-white/35 hover:text-white/60 transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-white/15">|</span>
            <a href="#" className="text-[12px] text-white/35 hover:text-white/60 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
