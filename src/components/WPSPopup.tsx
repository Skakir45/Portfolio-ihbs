import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface WPSPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WPSPopup({ isOpen, onClose }: WPSPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // GSAP entrance / exit
  useGSAP(() => {
    if (!isOpen || !overlayRef.current || !modalRef.current) return;

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(modalRef.current, { scale: 0.9, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)', delay: 0.1 });
  }, { dependencies: [isOpen] });

  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current) return;
    gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        onClose();
        setFormData({ name: '', mobile: '', email: '' });
        setSubmitted(false);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with actual API call
    console.log('WPS Registration Inquiry:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="relative bg-navy px-7 pt-7 pb-6 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue/15 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-sky/10 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
            aria-label="Close popup"
          >
            <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="12" y2="12" />
              <line x1="12" y1="2" x2="2" y2="12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="w-12 h-12 bg-blue/20 rounded-xl flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-sky fill-none" strokeWidth="1.8">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
              <circle cx="17" cy="15" r="2" />
            </svg>
          </div>

          <h3 className="font-heading text-[20px] font-bold text-white leading-tight mb-1">
            WPS Registration
          </h3>
          <p className="text-[13px] text-white/60 leading-[1.5]">
            Register for the UAE's Wage Protection System — fast, compliant, hassle-free.
          </p>
        </div>

        {/* ── Body ── */}
        <div className="px-7 py-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="wps-name" className="block text-[12px] font-semibold text-navy mb-1.5">
                  Full Name
                </label>
                <input
                  id="wps-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Smith"
                  className="w-full px-4 py-3 rounded-lg border border-ihbs-border bg-ihbs-bg text-[13.5px] text-ihbs-text placeholder:text-ihbs-muted/60 outline-none transition-colors duration-200 focus:border-blue focus:ring-2 focus:ring-blue/15"
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="wps-mobile" className="block text-[12px] font-semibold text-navy mb-1.5">
                  Mobile Number
                </label>
                <input
                  id="wps-mobile"
                  name="mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. +971 50 123 4567"
                  className="w-full px-4 py-3 rounded-lg border border-ihbs-border bg-ihbs-bg text-[13.5px] text-ihbs-text placeholder:text-ihbs-muted/60 outline-none transition-colors duration-200 focus:border-blue focus:ring-2 focus:ring-blue/15"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="wps-email" className="block text-[12px] font-semibold text-navy mb-1.5">
                  Email Address
                </label>
                <input
                  id="wps-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-ihbs-border bg-ihbs-bg text-[13.5px] text-ihbs-text placeholder:text-ihbs-muted/60 outline-none transition-colors duration-200 focus:border-blue focus:ring-2 focus:ring-blue/15"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue text-white py-3.5 rounded-lg text-[14px] font-semibold transition-all duration-200 hover:bg-blue/90 hover:-translate-y-0.5 active:translate-y-0 mt-2"
              >
                Submit Inquiry
              </button>

              <p className="text-[11px] text-ihbs-muted text-center leading-[1.5]">
                We'll get back to you within 24 hours. No spam, ever.
              </p>
            </form>
          ) : (
            /* ── Success State ── */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-green-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="5 12 10 17 20 7" />
                </svg>
              </div>
              <h4 className="font-heading text-[17px] font-bold text-navy mb-1.5">
                Thank You!
              </h4>
              <p className="text-[13px] text-ihbs-muted leading-[1.6] mb-5">
                Your WPS registration inquiry has been received. Our team will contact you shortly.
              </p>
              <button
                onClick={handleClose}
                className="bg-navy text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold transition-colors duration-200 hover:bg-blue"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
