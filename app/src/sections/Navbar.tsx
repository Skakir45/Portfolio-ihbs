import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'About Us', href: '#who-we-are' },
  { label: 'Our Services', href: '#services' },
  { label: 'Careers', href: 'https://app.notion.com/p/Job-Listing-Template-e32efd052ec2481b99ffed24d9dbc29e'},
  { label: 'Why Us', href: '#why-choose' },
  { label: 'Resources', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[100] bg-white border-b border-ihbs-border transition-shadow duration-200 ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      <div className="flex items-center justify-between h-[100px] lg:h-[130px] px-5 lg:px-10">
        {/* Brand */}
        <a href="#" className="flex items-center gap-1 no-underline">
          <div className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] flex-shrink-0 flex items-center justify-center">
            <img
              src="/images/ihbs_logo.png"
              alt="IHBS Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-[1.15] pl-0.5">
            <strong className="block font-heading text-xl lg:text-[28px] font-black tracking-[6px] brand-gradient-text">
              IHBS
            </strong>
            <span className="block text-[9px] lg:text-[10.5px] font-semibold tracking-[2px] uppercase text-blue mt-0.5">
              Insight Hub Business Services
            </span>
            <span className="block text-[7px] lg:text-[8.5px] font-medium tracking-[2px] uppercase text-ihbs-muted mt-0.5">
              We Register, You Prosper
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-[13.5px] font-medium transition-colors duration-200 no-underline ${
                  link.active
                    ? 'text-blue border-b-2 border-blue pb-0.5'
                    : 'text-ihbs-text hover:text-blue'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden lg:inline-block bg-navy text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-lg no-underline transition-colors duration-200 hover:bg-blue"
        >
          Get Started
        </a>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-navy transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-navy transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-ihbs-border px-5 pb-5">
          <ul className="flex flex-col gap-4 pt-4 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm font-medium no-underline ${
                    link.active ? 'text-blue' : 'text-ihbs-text'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="inline-block bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-lg no-underline"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
