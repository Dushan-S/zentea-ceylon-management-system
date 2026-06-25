import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative text-white py-4 md:py-8 px-4 md:px-8"
      style={{
        backgroundImage: "url('images/footer-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Logo Section - Centered on mobile */}
        <div className="text-center mb-8 md:mb-0">
          <img src="images/ceylon-logo.png" alt="Ceylon Tea" className="w-24 md:w-28 mb-3 mx-auto" />
          <p className="text-sm font-medium">Symbol of Quality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {/* Links Section - 4 important links in horizontal layout */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-emerald-300 transition-colors">Shop</Link>
              <Link to="/Ourstory" className="hover:text-emerald-300 transition-colors">Our Story</Link>
              <Link to="/contact-us" className="hover:text-emerald-300 transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Social Media - Centered on mobile */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 text-base">Follow Us</h3>
            <div className="flex gap-5 justify-center md:justify-start text-xl">
              <a href="#" className="hover:text-emerald-300 transition-colors" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-emerald-300 transition-colors" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-emerald-300 transition-colors" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-emerald-300 transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 max-w-7xl mx-auto mt-6 md:mt-6 pt-4 md:pt-4 border-t border-white/20 text-center">
        <p className="text-xs md:text-xs text-white/80">
          © {new Date().getFullYear()} ZenTea Ceylon. All rights reserved.
        </p>
      </div>

      {/* Leaf Illustration - hide on mobile for cleaner look */}
      <img
        src="/leaf-illustration.png"
        alt="Tea Leaf"
        className="hidden md:block absolute right-8 bottom-0 w-32 lg:w-40 opacity-90"
      />
    </footer>
  );
}
