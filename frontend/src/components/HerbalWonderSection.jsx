import React from "react";
import { Link } from "react-router-dom";

const HerbalWonderSection = () => {
  return (
    <section className="bg-[#ECF9F1] py-12 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.4em] text-[#0b6b3c]">herbal blends</p>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-[#0b6b3c]">
                discover a blend
                <br />
                of herbal wonder
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#0b6b3c]/80 max-w-md">
                We bring the wonder of nature to everyday moments through delicious herbal tea blends.
              </p>
              <Link
                to="/shop"
                className="inline-flex w-fit items-center rounded-full border border-[#0b6b3c] px-5 py-2 md:px-7 md:py-3 text-xs md:text-sm font-semibold text-[#0b6b3c] transition-colors duration-200 hover:bg-[#0b6b3c] hover:text-white"
              >
                learn more
              </Link>
            </div>

            {/* Bottom Card */}
            <div className="rounded-2xl md:rounded-[32px] bg-white px-6 py-6 md:px-10 md:py-8 shadow-lg relative">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <img
                  src="/images/herbal-wonder-product.jpg"
                  alt="Herbal tea product"
                  className="hidden md:block h-32 w-auto object-contain flex-shrink-0"
                />
                <div className="space-y-3 md:space-y-3 text-[#0b6b3c] text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug">We blend the finest organic herbs,</h3>
                  <p className="text-sm md:text-sm leading-relaxed text-[#0b6b3c]/80">
                    using a mastery of science and traditional wisdom, to create a herbal symphony that nurtures with every delicious sip.
                  </p>
                </div>
              </div>
              {/* Decorative fruit element */}
              <img
                src="/images/herbal-wonder-fruit.png"
                alt="Herbal garnish"
                className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-12 md:w-20 drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main large image */}
            <div className="relative group">
              <img
                src="/images/herbal-wonder-bloom.jpg"
                alt="Herbal blossoms"
                className="h-64 md:h-[32rem] w-full rounded-2xl md:rounded-[32px] object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Mobile-only decorative overlay elements */}
              <div className="md:hidden absolute inset-0 pointer-events-none">
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                
                {/* Organic badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#0b6b3c]/10">
                  <p className="text-[#0b6b3c] text-xs font-semibold tracking-wide">ORGANIC</p>
                </div>
                
                {/* Premium Ceylon tag */}
                <div className="absolute bottom-4 right-4 bg-[#0b6b3c]/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-white text-xs font-semibold">Premium Ceylon</p>
                </div>
              </div>
            </div>
            
            {/* Additional mobile image grid - only visible on mobile */}
            <div className="md:hidden grid grid-cols-2 gap-3 mt-4">
              {/* Image card */}
              <div className="relative h-40 rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="/images/herbal-wonder-mood.jpg"
                  alt="Tea experience"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-semibold drop-shadow-lg">Pure Bliss</p>
                </div>
              </div>
              
              {/* Info card with natural texture */}
              <div className="relative h-40 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-[#ECF9F1] to-[#d4f1e0] p-4 flex flex-col justify-between">
                {/* Decorative circles in background */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#0b6b3c]/5 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#0b6b3c]/5 rounded-full -ml-8 -mb-8"></div>
                
                <div className="relative z-10">
                  <div className="w-8 h-8 mb-2 rounded-full bg-[#0b6b3c]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0b6b3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-[#0b6b3c] text-sm font-bold leading-tight">Handpicked</p>
                  <p className="text-[#0b6b3c]/70 text-xs mt-1">From highland gardens</p>
                </div>
                
                <div className="relative z-10 text-[#0b6b3c]/40 text-xs font-medium">
                  Est. 1867
                </div>
              </div>
            </div>
            
            {/* Overlapping smaller image - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-12 -left-12 z-10">
              <img
                src="/images/herbal-wonder-mood.jpg"
                alt="Tea lover smiling"
                className="h-64 w-48 rounded-[24px] object-cover shadow-2xl"
              />
              <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0b6b3c] text-white text-lg shadow-xl">
                ☘️
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerbalWonderSection;
