import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef();
    const titleRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText(".title", {
            type: "chars, words",
        });

        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });

        // Apply text-gradient class once before animating
        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        // ScrollTrigger animation for the title
        gsap.to(titleRef.current, {
            y: -100, // Move up by 100px
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true, // Smooth scrubbing effect
            }
        });

    }, []);

    useEffect(() => {
        gsap.from('.hero-text', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3
        });
    }, []);

    return (
        <>
            <section ref={heroRef} id="hero" className="relative min-h-screen w-full overflow-hidden">
                {/* Background image */}
                <img
                    src="/images/hero1.png"
                    alt="ZenTea Hero"
                    className="absolute inset-0 w-full h-full object-cover z-[-1]"
                />


                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                    <h1 ref={titleRef} className="title hero-text">ZenTea</h1>

                    <div className="content text-center mt-6">
                        <p className="subtitle hero-text text-xl md:text-3xl font-bold">Finest Ceylon Tea</p>
                        <p className="subtitle mt-4 max-w-xl hero-text font-medium text-white/90">
                           Summer is one of our favourite seasons and we are bringing you a collection
                            of the finest Ceylon Tea to keep you cool and refreshed all Summer long!
                        </p>
                        <div className="flex justify-center mt-3 hero-text">
                            <Link
                                to="/shop"
                                className="group flex items-center gap-2 px-5 py-2 bg-white text-black font-bold rounded-full hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 uppercase tracking-widest text-[10px]"
                            >
                                Shop Now
                                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;