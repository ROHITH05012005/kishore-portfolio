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
    aspect: 'aspect-[1563/1006]',
  },
  {
    src: '/judge-feature.jpeg',
    alt: 'Kishore Nayak - Judge & Model',
    aspect: 'aspect-[1280/885]',
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
    <section className="bg-black py-16 md:py-28 overflow-hidden flex flex-col gap-12 md:gap-20 justify-center items-center px-4 md:px-8">
      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            containerRefs.current[index] = el;
          }}
          className={`relative w-full max-w-6xl ${img.aspect} bg-zinc-950 overflow-hidden shadow-2xl rounded-sm`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
            priority={index === 0}
          />
        </div>
      ))}
    </section>
  );
}
