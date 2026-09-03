'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: '/tilted-image.jpeg',
    alt: 'Featured Show - Runway & Models',
  },
  {
    src: '/publicjudge-feature.jpeg.png',
    alt: 'Kishore Nayak - Judge & Model',
  },
];

export default function FeaturedImage() {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    containerRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 120,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-black py-16 md:py-28 overflow-hidden flex flex-col gap-12 md:gap-20 justify-center items-center">
      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            containerRefs.current[index] = el;
          }}
          className="relative w-[95%] md:w-[90%] aspect-[16/9] md:aspect-[21/9] bg-zinc-900 overflow-hidden shadow-2xl"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
            priority={index === 0}
          />
        </div>
      ))}
    </section>
  );
}
