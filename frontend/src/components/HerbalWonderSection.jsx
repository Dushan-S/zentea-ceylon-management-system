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
            <div className="rounded-2xl md:rounded-[32px] bg-white px-4 py-4 md:px-10 md:py-8 shadow-lg relative">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <img
                  src="/images/herbal-wonder-product.jpg"
                  alt="Herbal tea product"
                  className="h-20 md:h-32 w-auto object-contain flex-shrink-0"
                />
                <div className="space-y-2 md:space-y-3 text-[#0b6b3c] text-center md:text-left">
                  <h3 className="text-base md:text-xl font-semibold">We blend the finest organic herbs,</h3>
                  <p className="text-xs md:text-sm leading-relaxed text-[#0b6b3c]/80">
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
          <div className="relative">
            {/* Main large image */}
            <div className="relative">
              <img
                src="/images/herbal-wonder-bloom.jpg"
                alt="Herbal blossoms"
                className="h-[32rem] w-full rounded-[32px] object-cover shadow-2xl"
              />
            </div>
            
            {/* Overlapping smaller image */}
            <div className="absolute -bottom-12 -left-12 z-10">
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
