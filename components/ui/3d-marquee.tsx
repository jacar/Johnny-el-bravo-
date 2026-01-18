
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  // Dividimos las imágenes en 3 columnas para un efecto más denso
  const column1 = images.slice(0, Math.ceil(images.length / 3));
  const column2 = images.slice(Math.ceil(images.length / 3), Math.ceil((images.length / 3) * 2));
  const column3 = images.slice(Math.ceil((images.length / 3) * 2));

  return (
    <div
      className={cn(
        "relative h-[1000px] md:h-[1300px] w-full overflow-hidden bg-black/50 [perspective:2500px]",
        className
      )}
    >
      <div className="flex h-full w-full justify-center gap-10 md:gap-20 [transform:rotateX(20deg)_rotateZ(-10deg)]">
        {/* Duraciones aumentadas para un movimiento mucho más lento (120s, 160s, 140s) */}
        <MarqueeColumn images={column1} duration={120} />
        <MarqueeColumn images={column2} duration={160} reverse />
        <MarqueeColumn images={column3} duration={140} />
      </div>

      {/* Gradientes para suavizar los bordes superior e inferior */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
    </div>
  );
}

function MarqueeColumn({ 
  images, 
  duration, 
  reverse = false 
}: { 
  images: string[]; 
  duration: number; 
  reverse?: boolean 
}) {
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="flex flex-col gap-6 md:gap-12 overflow-hidden">
      <motion.div
        initial={{ y: reverse ? "-50%" : "0%" }}
        animate={{ y: reverse ? "0%" : "-50%" }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-8 md:gap-16"
      >
        {duplicatedImages.map((src, idx) => (
          <div
            key={idx}
            className="group relative h-[400px] w-[300px] md:h-[750px] md:w-[580px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-700 hover:scale-105 hover:border-[#c5a059]/60 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
          >
            <img
              src={src}
              alt={`Galeria ${idx}`}
              className="h-full w-full object-cover sepia-img grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:sepia-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Overlay sutil para realzar el efecto Baúl */}
            <div className="absolute inset-0 bg-[#c5a059]/5 mix-blend-overlay opacity-50 pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
