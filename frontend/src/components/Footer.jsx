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
      className="relative text-white py-12 md:py-20 px-4 md:px-8"
      style={{
        backgroundImage: "url('images/footer-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Logo Section */}
        <div className="text-center md:text-left">
          <img src="images/ceylon-logo.png" alt="Ceylon Tea" className="w-24 md:w-32 mb-4 mx-auto md:mx-0" />
          <p className="text-sm md:text-base">Symbol of Quality</p>
        </div>

        {/* Links - Now with proper routing */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 text-sm md:text-base">
          <ul className="space-y-2 md:space-y-3">
            <li><Link to="/" className="hover:underline hover:text-emerald-300 transition-colors">Home</Link></li>
            <li><Link to="/Ourstory" className="hover:underline hover:text-emerald-300 transition-colors">Our Story</Link></li>
            <li><Link to="/shop" className="hover:underline hover:text-emerald-300 transition-colors">Shop</Link></li>
            <li><Link to="/blog" className="hover:underline hover:text-emerald-300 transition-colors">Blog</Link></li>
          </ul>
          <ul className="space-y-2 md:space-y-3">
            <li><Link to="/my-orders" className="hover:underline hover:text-emerald-300 transition-colors">My Orders</Link></li>
            <li><Link to="/cart" className="hover:underline hover:text-emerald-300 transition-colors">Cart</Link></li>
            <li><Link to="/contact-us" className="hover:underline hover:text-emerald-300 transition-colors">Contact Us</Link></li>
            <li><Link to="/account" className="hover:underline hover:text-emerald-300 transition-colors">Account</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4 text-base md:text-lg">Follow Us</h3>
          <div className="flex gap-4 justify-center md:justify-start text-xl md:text-2xl">
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
      <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20 text-center">
        <p className="text-xs md:text-sm text-white/80">
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
