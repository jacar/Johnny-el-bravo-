
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BioStage } from "../../types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextParallaxChronoProps {
  stages: BioStage[];
  onExplore: (stage: BioStage) => void;
}

export const TextParallaxChrono: React.FC<TextParallaxChronoProps> = ({ stages, onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray(".chrono-section") as HTMLElement[];

    sections.forEach((section) => {
      const year = section.querySelector(".year-bg");
      const content = section.querySelector(".content-box");

      // Efecto de paralaje para el año (se mueve más lento)
      gsap.to(year, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Efecto de entrada para el contenido
      gsap.fromTo(content, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a]">
      {stages.map((stage, idx) => (
        <section 
          key={stage.id} 
          className="chrono-section relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5"
        >
          {/* Año Gigante de Fondo */}
          <div className="year-bg absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[30vw] md:text-[40vw] font-serif italic font-bold text-[#c5a059] leading-none">
              {stage.year}
            </span>
          </div>

          {/* Contenido Central */}
          <div className="content-box relative z-10 max-w-4xl px-6 text-center">
            <span className="text-[#c5a059] font-serif text-3xl md:text-5xl italic mb-4 block">
              {stage.year}
            </span>
            <h3 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight uppercase tracking-tighter">
              {stage.title}
            </h3>
            <p className="text-gray-400 text-lg md:text-2xl italic mb-10 max-w-2xl mx-auto leading-relaxed">
              "{stage.description}"
            </p>
            <button 
              onClick={() => onExplore(stage)}
              className="px-10 py-4 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-500 font-bold uppercase text-xs tracking-[0.3em]"
            >
              Abrir Archivo
            </button>
          </div>

          {/* Decoración lateral - Línea de Tiempo */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 opacity-20">
            <div className="h-20 w-px bg-[#c5a059]"></div>
            <span className="text-[10px] text-[#c5a059] font-bold rotate-90">{String(idx + 1).padStart(2, '0')}</span>
            <div className="h-20 w-px bg-[#c5a059]"></div>
          </div>
        </section>
      ))}
    </div>
  );
};
