
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  className?: string;
  onCtaClick?: () => void;
}

// Added explicit semicolon for type consistency and ensuring children is recognized
const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="mt-8 px-10 py-4 rounded-full bg-[#c5a059] text-black font-bold tracking-[0.2em] text-xs shadow-2xl transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:ring-opacity-75 uppercase"
  >
    {children}
  </motion.button>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
  onCtaClick,
}) => {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div
      className={cn(
        "relative w-full min-h-[90vh] overflow-hidden bg-black flex flex-col items-center justify-center text-center px-4 py-20",
        className
      )}
    >
      <div className="z-20 flex flex-col items-center max-w-4xl">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-6 inline-block rounded-full border border-[#c5a059]/30 bg-black/50 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a059] backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="text-5xl md:text-8xl font-serif italic text-white leading-tight drop-shadow-2xl"
        >
           {title}
        </motion.div>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl text-lg text-gray-400 font-light leading-relaxed italic"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.7 }}
        >
          {/* Use explicit children prop to resolve potential TS mismatch in certain environments */}
          <ActionButton onClick={onCtaClick} children={ctaText} />
        </motion.div>
      </div>

      {/* Animated Image Marquee - Refleja la estética Salsa Baúl */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_70%,transparent)] opacity-40 pointer-events-none">
        <motion.div
          className="flex gap-6 py-10"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 60,
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-48 md:h-72 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -3 : 3)}deg`,
              }}
            >
              <img
                src={src}
                alt={`Historia ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-2xl border border-white/10 sepia-img grayscale hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-[#c5a059]/10 rounded-xl mix-blend-overlay"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
