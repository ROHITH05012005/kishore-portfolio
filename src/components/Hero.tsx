'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import StaggerText from './animations/StaggerText';
import MagneticButton from './animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Reveal animation (syncs after preloader roughly, or could use context, but delay works for now)
    const tl = gsap.timeline({ delay: 3.5 }); // Preloader takes ~3s

    tl.fromTo(imageRef.current,
      { scale: 1.2, filter: 'brightness(0)' },
      { scale: 1, filter: 'brightness(0.6)', duration: 2, ease: 'power3.out' }
    )
      .fromTo(buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.6"
      );

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Subtle continuous rotation & pulse on the X
    if (xRef.current) {
      gsap.to(xRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 8,
        ease: 'none',
      });
      gsap.to(xRef.current, {
        scale: 1.25,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    }

  }, []);

  return (
    <section ref={heroRef} id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <Image
          ref={imageRef}
          src="/hero-bg.jpeg"
          alt="Kishore Nayak"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center h-full text-white text-center">
        <div className="overflow-hidden mb-[-1vw]">
          <h1 className="text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter">
            <StaggerText text="Where Art" delay={4.0} />
          </h1>
        </div>
        <div className="overflow-hidden pt-4 md:pt-8 pb-4 md:pb-8 pr-4">
          <h1 className="text-[12vw] md:text-[8vw] font-serif uppercase leading-none tracking-tighter text-gold italic">
            <StaggerText text="Meets Leadership" delay={4.3} />
          </h1>
        </div>

        <div ref={buttonsRef} className="mt-12 flex flex-col items-center gap-4 opacity-0">
          <MagneticButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-cursor="hover"
              className="group relative pl-8 pr-2 py-2 bg-white rounded-full flex items-center gap-6 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 text-black font-semibold uppercase tracking-widest text-xs">
                Contact
              </span>
              <div className="relative z-10 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </MagneticButton>
          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold tracking-[0.25em] md:tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFE899] via-[#E5C158] to-[#D4AF37] drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
              AI TRAINER
            </span>
            <span
              ref={xRef}
              className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border border-yellow-400/60 bg-yellow-400/15 text-yellow-300 text-xs sm:text-sm md:text-base font-bold shadow-[0_0_18px_rgba(250,204,21,0.6)] select-none"
            >
              ✕
            </span>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold tracking-[0.25em] md:tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#FFE899] drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
              FITNESS MODEL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
