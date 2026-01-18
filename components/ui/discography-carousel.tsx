import React from 'react';
import { motion } from 'framer-motion';
import { Disc } from '../../types';
import { cn } from '../../lib/utils';
import { Disc as DiscIcon } from 'lucide-react';

interface DiscographyCarouselProps {
  discs: Disc[];
  className?: string;
}

export function DiscographyCarousel({ discs, className }: DiscographyCarouselProps) {
  // Duplicamos la lista para un efecto de carrusel infinito suave
  const duplicatedDiscs = [...discs, ...discs, ...discs];

  return (
    <div className={cn("relative w-full py-20 bg-black border-y border-white/5 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-8 bg-[#c5a059]"></div>
            <span className="text-[#c5a059] text-[9px] tracking-[0.6em] uppercase font-black">Registro Histórico</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif italic text-white uppercase tracking-tighter leading-none">
            Discografía <span className="text-[#c5a059]">Completa</span>
          </h2>
        </div>
        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold max-w-xs md:text-right">
          Siete décadas de grabaciones maestras que definieron el sonido del trombón.
        </p>
      </div>

      <div className="relative flex items-center overflow-hidden py-10">
        <motion.div 
          className="flex gap-16 px-6"
          animate={{
            x: ["0%", "-33.33%"]
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity
          }}
        >
          {duplicatedDiscs.map((disc, idx) => (
            <div 
              key={`${disc.title}-${idx}`} 
              className="group relative flex-shrink-0 flex items-center gap-6"
            >
              {/* Year/Index Bubble */}
              <div className="flex flex-col items-center">
                 <span className="text-[#c5a059] font-serif italic text-3xl md:text-4xl">{disc.year}</span>
                 <div className="w-px h-8 bg-gradient-to-b from-[#c5a059]/40 to-transparent mt-2"></div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col min-w-[200px] md:min-w-[300px]">
                <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-widest group-hover:text-[#c5a059] transition-colors duration-500 whitespace-nowrap">
                  {disc.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <DiscIcon size={12} className="text-[#c5a059]/40" />
                  <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-medium">{disc.label}</span>
                </div>
              </div>

              {/* Separator icon */}
              <div className="mx-4 opacity-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>
    </div>
  );
}