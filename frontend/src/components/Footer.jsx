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

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Logo Section */}
        <div className="text-center md:text-left">
          <img src="images/ceylon-logo.png" alt="Ceylon Tea" className="w-20 md:w-28 mb-2 md:mb-4 mx-auto md:mx-0" />
          <p className="text-xs md:text-sm">Symbol of Quality</p>
        </div>

        {/* Links - Now with proper routing */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 text-xs md:text-sm">
          <ul className="space-y-1.5 md:space-y-2">
            <li><Link to="/" className="hover:underline hover:text-emerald-300 transition-colors">Home</Link></li>
            <li><Link to="/Ourstory" className="hover:underline hover:text-emerald-300 transition-colors">Our Story</Link></li>
            <li><Link to="/shop" className="hover:underline hover:text-emerald-300 transition-colors">Shop</Link></li>
            <li><Link to="/blog" className="hover:underline hover:text-emerald-300 transition-colors">Blog</Link></li>
          </ul>
          <ul className="space-y-1.5 md:space-y-2">
            <li><Link to="/my-orders" className="hover:underline hover:text-emerald-300 transition-colors">My Orders</Link></li>
            <li><Link to="/cart" className="hover:underline hover:text-emerald-300 transition-colors">Cart</Link></li>
            <li><Link to="/contact-us" className="hover:underline hover:text-emerald-300 transition-colors">Contact Us</Link></li>
            <li><Link to="/account" className="hover:underline hover:text-emerald-300 transition-colors">Account</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Follow Us</h3>
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start text-lg md:text-xl">
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

      {/* Copyright */}
      <div className="relative z-10 max-w-7xl mx-auto mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/20 text-center">
        <p className="text-[10px] md:text-xs text-white/80">
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
