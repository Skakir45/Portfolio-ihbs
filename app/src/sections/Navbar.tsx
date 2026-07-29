import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'About Us', href: '#who-we-are' },
  { label: 'Our Services', href: '#services' },
  { label: 'Why Us', href: '#why-choose' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav
      className={`sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-ihbs-border transition-all duration-300 ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      <div className="flex items-center justify-between h-[80px] lg:h-[90px] px-5 lg:px-10 max-w-[1440px] mx-auto">
        {/* Brand */}
        <a href="#" className="flex items-center gap-1.5 no-underline group">
          <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/ihbs_logo.png"
              alt="IHBS Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-[1.15] pl-0.5">
            <strong className="block font-heading text-lg lg:text-[24px] font-black tracking-[5px] brand-gradient-text">
              IHBS
            </strong>
            <span className="block text-[8px] lg:text-[10px] font-semibold tracking-[1.5px] uppercase text-blue mt-0.5">
              Insight Hub Business Services
            </span>
            <span className="block text-[7px] lg:text-[8px] font-medium tracking-[1.5px] uppercase text-ihbs-muted mt-0.5">
              We Register, You Prosper
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                className={`relative text-[13px] font-medium px-3.5 py-2 rounded-md transition-all duration-200 no-underline ${
                  activeLink === link.label
                    ? 'text-blue bg-blue/5'
                    : 'text-ihbs-text/80 hover:text-blue hover:bg-ihbs-light'
                }`}
              >
                {link.label}
                {activeLink === link.label && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg no-underline transition-all duration-200 hover:bg-blue hover:-translate-y-0.5 active:translate-y-0"
        >
          Get Started
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="7" x2="12" y2="7" />
            <polyline points="8,3 12,7 8,11" />
          </svg>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden relative z-[102] flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-[2px] bg-navy rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-navy rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-navy rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[101] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 z-[102] h-full w-[280px] bg-white shadow-2xl lg:hidden transform transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-ihbs-border">
          <strong className="font-heading text-lg font-black tracking-[3px] brand-gradient-text">
            IHBS
          </strong>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-md hover:bg-ihbs-light transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-4 pt-5 pb-6 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium no-underline transition-all duration-200 ${
                  activeLink === link.label
                    ? 'text-blue bg-blue/5'
                    : 'text-ihbs-text/80 hover:text-blue hover:bg-ihbs-light'
                }`}
                onClick={() => {
                  setActiveLink(link.label);
                  setMobileOpen(false);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-4 pt-4 border-t border-ihbs-border">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-3 rounded-lg no-underline transition-all duration-200 hover:bg-blue mx-3"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="7" x2="12" y2="7" />
                <polyline points="8,3 12,7 8,11" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
