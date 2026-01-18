import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BioStage } from "../../types";
import { History } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicTimelineProps {
  stages: BioStage[];
  onExplore: (stage: BioStage) => void;
}

export const CinematicTimeline: React.FC<CinematicTimelineProps> = ({ stages, onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!triggerRef.current || !containerRef.current) return;

    const totalStages = stages.length;

    // Animación de paralaje para los elementos individuales basada en el progreso del scroll
    const masterST = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: `+=${totalStages * 100}%`,
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.min(
          Math.floor(progress * totalStages),
          totalStages - 1
        );

        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }

        // Aplicar transformaciones de paralaje
        // El fondo se mueve más lento, el año intermedio, la imagen rápido
        gsap.to(".parallax-bg-img", {
          y: -progress * 300,
          ease: "power1.out",
          overwrite: "auto"
        });

        gsap.to(".parallax-year-text", {
          y: -progress * 150,
          ease: "power1.out",
          overwrite: "auto"
        });

        gsap.to(".parallax-framed-img", {
          y: progress * 80,
          rotate: progress * 2,
          ease: "power1.out",
          overwrite: "auto"
        });
      }
    });

    return () => {
      masterST.kill();
    };
  }, [stages.length, activeIndex]);

  return (
    <div ref={triggerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Grano de película y ruido ambiental */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[60] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Capa de Fondo Parallax: Imágenes borrosas de la época */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {stages.map((stage, idx) => (
          <div
            key={`bg-parallax-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeIndex ? "opacity-20" : "opacity-0"}`}
          >
            <img
              src={stage.image}
              className="parallax-bg-img w-full h-full object-cover scale-110 blur-2xl grayscale"
              alt=""
            />
          </div>
        ))}
      </div>

      <div ref={containerRef} className="relative w-full h-full flex items-center px-6 md:px-24">

        {/* Capa Media: Año Gigante (Paralaje) */}
        <div className="absolute inset-0 select-none pointer-events-none z-10 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {stages.map((stage, idx) => (
              <span
                key={`year-${idx}`}
                className={`parallax-year-text absolute text-[35vw] md:text-[50vw] font-serif font-bold italic leading-none transition-all duration-1000 ease-in-out ${idx === activeIndex
                    ? "opacity-10 blur-0 scale-100"
                    : "opacity-0 blur-3xl scale-90"
                  }`}
                style={{ color: "#c5a059" }}
              >
                {stage.year}
              </span>
            ))}
          </div>
        </div>

        {/* Contenido Principal (Foreground) */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full max-w-7xl mx-auto">

          {/* Columna Izquierda: Información Narrativa */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[450px] relative">
            {stages.map((stage, idx) => (
              <div
                key={`content-${idx}`}
                className={`transition-all duration-1000 absolute w-full ${idx === activeIndex
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-20 pointer-events-none"
                  }`}
              >
                <div className="flex items-center gap-10 mb-12">
                  <div className="flex flex-col">
                    <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-[0.4em] mb-3">Capítulo</span>
                    <span className="text-white font-serif italic text-4xl leading-none">{String(idx + 1).padStart(1, '0')}</span>
                  </div>
                  <div className="h-10 w-px bg-[#c5a059]/30"></div>
                  <div className="flex flex-col">
                    <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-[0.4em] mb-3">Cronología</span>
                    <span className="text-[#c5a059] font-serif italic text-4xl leading-none">{stage.year}</span>
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-10 leading-[1.05] uppercase tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
                  {stage.title}
                </h3>

                <p className="text-gray-300 text-lg md:text-2xl lg:text-3xl italic mb-14 max-w-2xl leading-relaxed font-light drop-shadow-lg">
                  "{stage.description}"
                </p>

                <button
                  onClick={() => onExplore(stage)}
                  className="group flex items-center gap-6 active:scale-95 transition-transform"
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-2xl group-hover:bg-[#c5a059] group-hover:scale-110 transition-all duration-500">
                    <History size={24} />
                  </div>
                  <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase border-b border-[#c5a059] pb-1 group-hover:text-[#c5a059] transition-colors">
                    Explorar Archivo Histórico
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Columna Derecha: Imagen Enmarcada con Paralaje de Profundidad */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative aspect-[3/4.5] w-full max-w-[420px] ml-auto">
              {stages.map((stage, idx) => (
                <div
                  key={`img-${idx}`}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === activeIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                    }`}
                >
                  <div className="parallax-framed-img relative w-full h-full p-5 bg-[#0a0a0a] border border-[#c5a059]/20 shadow-[0_80px_150px_rgba(0,0,0,1)] group">
                    <div className="absolute inset-0 border border-white/5 m-3 pointer-events-none"></div>
                    <div className="w-full h-full overflow-hidden relative">
                      <img
                        src={stage.image}
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                        alt={stage.title}
                      />
                      <div className="absolute inset-0 bg-[#c5a059]/5 mix-blend-overlay"></div>
                    </div>

                    <div className="absolute bottom-10 left-10 text-left">
                      <p className="text-[#c5a059] font-serif italic text-3xl mb-1">{stage.year}</p>
                      <p className="text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-60">Legacy Archive</p>
                    </div>
                  </div>
                  <div className="absolute -inset-16 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.08)_0%,transparent_70%)] -z-10 blur-3xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guía Visual de Interacción */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-pulse opacity-40 z-[70]">
          <div className="w-6 h-10 border-2 border-[#c5a059] rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#c5a059] rounded-full animate-bounce"></div>
          </div>
          <span className="text-[7px] text-[#c5a059] uppercase font-black tracking-[0.5em]">Desliza para viajar</span>
        </div>

        {/* Barra de Progreso Vertical */}
        <div className="absolute right-8 md:right-12 bottom-0 top-0 flex flex-col items-center justify-center gap-6 opacity-20 z-[70]">
          <span className="text-[9px] font-black tracking-[0.5em] uppercase vertical-text mb-4">La Historia</span>
          <div className="h-48 w-px bg-white/10 relative">
            <div
              className="absolute top-0 left-0 w-full bg-[#c5a059] transition-all duration-500 shadow-[0_0_10px_#c5a059]"
              style={{ height: `${((activeIndex + 1) / stages.length) * 100}%` }}
            ></div>
          </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
      `}} />
    </div>
  );
};