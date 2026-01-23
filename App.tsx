import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Menu,
  X,
  Play,
  Pause,
  ArrowRight,
  ListMusic,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  History,
  Star,
  Award,
  Trophy,
  Medal,
  CheckCircle2,
  Crown,
  Mail,
  Phone,
  Globe,
  SkipBack,
  SkipForward,
  Volume2,
  Hand
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIO_STAGES, DISCOGRAPHY, BOOK_HIGHLIGHTS, TOP_SONGS, HISTORICAL_GALLERY_IMAGES, ACHIEVEMENTS, LEGEND_STATS, BOOK_STORE_LINKS, BOOK_IMAGE_URL } from './constants';
import { BioStage, Disc } from './types';
import { RetroGrid } from './components/ui/retro-grid';
import { ThreeDMarquee } from './components/ui/3d-marquee';
import { CinematicTimeline } from './components/ui/cinematic-timeline';
import { DiscographyCarousel } from './components/ui/discography-carousel';


const CHRONO_VIDEO_URL = "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/jho.mp4";
const LOGO_URL = "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/logoelbravo.png";

interface NavItem {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

const navLinks: NavItem[] = [
  { name: 'Inicio', href: '#inicio' },
  {
    name: 'El Legado',
    submenu: [
      { name: 'Biografía', href: '#biografia' },
      { name: 'Hitos', href: '#hitos' },
      { name: 'Estadísticas', href: '#stats' },
      { name: 'Discografía', href: '#discografia' },
    ]
  },
  { name: 'El Libro', href: '#libro' },
  { name: 'Contacto', href: '#contacto' },
];

const letterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  }
};

const AnimatedWord = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay
          }
        }
      }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState<BioStage | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<Disc | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll when menu or modals are open
  useEffect(() => {
    if (isMenuOpen || activeStage || activeAlbum) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [isMenuOpen, activeStage, activeAlbum]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const song = TOP_SONGS[currentSongIndex];
      if (song && song.url) {
        audioRef.current.src = song.url;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
      }
    }
  }, [currentSongIndex]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleNext = () => setCurrentSongIndex((prev) => (prev + 1) % TOP_SONGS.length);
  const handlePrev = () => setCurrentSongIndex((prev) => (prev - 1 + TOP_SONGS.length) % TOP_SONGS.length);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * audioRef.current.duration;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' });
    }
  };

  const Logo = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center group cursor-pointer ${className}`}>
      <img
        src={LOGO_URL}
        alt="Johnny El Bravo López Logo Oficial - El Trombón de Oro de la Salsa"
        className="h-14 md:h-20 lg:h-24 w-auto object-contain transition-all duration-500 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]"
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden" role="main">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNext}
      />

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[190] bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-md z-[200] bg-zinc-950 border-l border-[#c5a059]/20 flex flex-col p-10 shadow-2xl overflow-hidden"
              role="dialog"
              aria-label="Menú principal Johnny El Bravo"
            >
              <div className="flex justify-between items-center mb-16">
                <Logo className="scale-75 origin-left" />
                <button onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú principal" className="text-[#c5a059] p-2 hover:rotate-90 transition-transform duration-300">
                  <X size={36} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 w-full">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col gap-4">
                    {link.href ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href!)}
                        className="text-3xl font-serif italic text-white hover:text-[#c5a059] transition-colors uppercase tracking-widest block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <>
                        <button
                          onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === link.name ? null : link.name)}
                          className="text-3xl font-serif italic text-[#c5a059] flex items-center justify-between w-full uppercase tracking-widest"
                        >
                          {link.name}
                          <ChevronDown size={24} className={`transition-transform duration-500 ${mobileSubmenuOpen === link.name ? 'rotate-180 text-white' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenuOpen === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="flex flex-col gap-5 pl-6 border-l border-[#c5a059]/30 overflow-hidden"
                            >
                              {link.submenu?.map(sub => (
                                <a
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={(e) => handleLinkClick(e, sub.href)}
                                  className="text-lg font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                                >
                                  {sub.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-6">
                <a
                  href="#libro"
                  onClick={(e) => handleLinkClick(e, '#libro')}
                  className="bg-[#c5a059] text-black px-8 py-5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-center shadow-lg active:scale-95 transition-all"
                >
                  Edición Coleccionista
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Audio Player Moderno - "The Golden Capsule" */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] w-[95%] max-w-[500px] md:left-auto md:translate-x-0 md:right-10">
        <AnimatePresence>
          {isPlaylistOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="absolute bottom-full left-0 w-full mb-4 bg-black/80 backdrop-blur-2xl border border-[#c5a059]/30 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">Selección de Oro</span>
                </div>
                <button onClick={() => setIsPlaylistOpen(false)} className="text-white/40 hover:text-white transition-colors p-2"><X size={16} /></button>
              </div>
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                {TOP_SONGS.map((song, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentSongIndex(i); setIsPlaying(true); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all group ${currentSongIndex === i ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20' : 'hover:bg-white/10 text-white'}`}
                  >
                    <span className={`text-[10px] font-mono ${currentSongIndex === i ? 'text-black/60' : 'text-white/30 group-hover:text-[#c5a059]'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-[11px] font-bold uppercase tracking-tight ${currentSongIndex === i ? 'text-black' : 'text-white'}`}>{song.title}</p>
                      <p className={`text-[9px] uppercase font-bold tracking-widest truncate ${currentSongIndex === i ? 'text-black/60' : 'text-[#c5a059]/60'}`}>{song.album}</p>
                    </div>
                    {currentSongIndex === i && isPlaying && (
                      <div className="flex gap-1 items-end h-3">
                        <div className="w-1 bg-black animate-[bounce_1s_infinite] h-full"></div>
                        <div className="w-1 bg-black animate-[bounce_1.2s_infinite] h-2"></div>
                        <div className="w-1 bg-black animate-[bounce_0.8s_infinite] h-3"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>

          <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 pr-6 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Background Grain/Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>

            {/* Vinyl / Cover Art */}
            <div className="relative shrink-0">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                className={`w-14 h-14 rounded-full border-2 border-[#c5a059]/20 bg-black flex items-center justify-center shadow-2xl relative z-10 overflow-hidden ${!isPlaying && 'grayscale opacity-80'}`}
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              >
                <img
                  src="https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Diseno-sin-titulo-20.png"
                  alt="Disco de Vinilo Personalizado de Johnny El Bravo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Needle/Brazo (Decoration) */}
              <div className={`absolute -top-1 -right-1 w-6 h-6 z-20 transition-transform duration-500 origin-top-right ${isPlaying ? 'rotate-0' : '-rotate-45'}`}>
                <div className="w-1 h-4 bg-white/40 rotate-12 absolute right-2 top-0"></div>
              </div>
            </div>

            {/* Song Info & Controls */}
            <div className="flex-1 min-w-0 py-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-[12px] font-black uppercase tracking-tight truncate flex items-center gap-2">
                    {TOP_SONGS[currentSongIndex].title}
                    {isPlaying && (
                      <span className="flex gap-0.5 h-2 items-end opacity-60">
                        <span className="w-0.5 bg-[#c5a059] animate-[ping_1.5s_infinite]"></span>
                      </span>
                    )}
                  </span>
                  <span className="text-[#c5a059] text-[9px] font-bold uppercase tracking-[0.2em] truncate opacity-70 hover:opacity-100 transition-opacity">{TOP_SONGS[currentSongIndex].album}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={handlePrev} className="p-2 text-white/40 hover:text-white transition-colors active:scale-95"><SkipBack size={14} /></button>
                  <button
                    onClick={togglePlayback}
                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#c5a059] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
                  </button>
                  <button onClick={handleNext} className="p-2 text-white/40 hover:text-white transition-colors active:scale-95"><SkipForward size={14} /></button>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="group/progress relative h-1.5 w-full bg-white/5 rounded-full cursor-pointer overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c5a059] to-amber-200"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  layoutId="progress"
                />
                <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover/progress:opacity-30 bg-white/10 transition-opacity"></div>
              </div>
            </div>

            {/* Playlist Toggle */}
            <button
              onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
              className={`p-3 rounded-full transition-all ${isPlaylistOpen ? 'bg-[#c5a059]/20 text-[#c5a059]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <ListMusic size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Desktop */}
      <nav className={`fixed top-0 w-full z-[140] transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-[#c5a059]/20 shadow-xl' : 'bg-black/10 backdrop-blur-[2px] py-8 md:py-10'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#inicio" onClick={(e) => handleLinkClick(e, '#inicio')} aria-label="Ir a la parte superior"><Logo /></a>
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.href ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href!)}
                    className="text-[10px] uppercase tracking-[0.5em] font-bold hover:text-[#c5a059] transition-colors text-white/60 py-2 block"
                  >
                    {link.name}
                  </a>
                ) : (
                  <>
                    <button className="text-[10px] uppercase tracking-[0.5em] font-bold group-hover:text-[#c5a059] transition-colors text-white/60 flex items-center gap-2 py-2" aria-haspopup="true">
                      {link.name} <ChevronDown size={10} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-black/95 backdrop-blur-xl border border-[#c5a059]/20 p-6 min-w-[220px] shadow-2xl rounded-sm">
                        <div className="flex flex-col gap-4">
                          {link.submenu?.map(sub => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={(e) => handleLinkClick(e, sub.href)}
                              className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/60 hover:text-[#c5a059] transition-colors flex items-center justify-between group/sub"
                            >
                              {sub.name} <ChevronRight size={10} className="opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <a href="#libro" onClick={(e) => handleLinkClick(e, '#libro')} className="border border-[#c5a059] text-[#c5a059] px-6 py-3 rounded-full text-[9px] font-bold tracking-[0.3em] uppercase hover:bg-[#c5a059] hover:text-black transition-all">Próximamente</a>
          </div>
          <button className="lg:hidden p-2 text-[#c5a059] active:scale-90 transition-transform" aria-label="Abrir menú de navegación móvil" onClick={() => setIsMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="inicio" className="relative h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <video src={CHRONO_VIDEO_URL} autoPlay loop muted playsInline className="w-full h-full object-cover object-top opacity-40 filter grayscale scale-105" aria-hidden="true" />
          <div className="absolute inset-0 z-0"><RetroGrid className="opacity-30" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full animate-fade pt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#c5a059]"></div>
            <span className="text-[#c5a059] text-[10px] tracking-[0.8em] uppercase font-black flex items-center gap-3">
              <Crown size={12} /> Leyenda Viva de la Salsa Brava
            </span>
          </div>

          <h1 className="flex flex-col mb-12 drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <AnimatedWord text="Johnny" className="text-7xl md:text-[14rem] font-serif leading-[1.1] text-white uppercase tracking-tighter mb-4" />
            <div className="flex flex-wrap items-center mt-2 ml-1 md:ml-3">
              <AnimatedWord text="El Bravo" delay={0.6} className="text-2xl md:text-5xl lg:text-6xl font-serif italic font-light text-[#c5a059] uppercase tracking-[0.25em]" />
              <span className="text-white/20 px-2 md:px-4 text-2xl md:text-5xl lg:text-6xl font-serif">-</span>
              <AnimatedWord text="Leyenda" delay={1.8} className="text-2xl md:text-5xl lg:text-6xl font-serif italic font-light text-[#c5a059] uppercase tracking-[0.25em]" />
            </div>
          </h1>

          <p className="text-white/60 text-xl md:text-4xl max-w-4xl mb-14 font-light italic leading-relaxed">
            "Seis décadas de sabor, fe y el sonido rítmico y auténtico que definió la salsa brava para el mundo."
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <a href="#libro" onClick={(e) => handleLinkClick(e, '#libro')} className="group relative bg-[#c5a059] text-black px-16 py-8 font-bold tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_20px_60px_rgba(197,160,89,0.4)] uppercase text-center overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-3"><BookOpen size={18} /> Próximamente</span>
            </a>
            <a href="#biografia" onClick={(e) => handleLinkClick(e, '#biografia')} className="border border-white/10 text-white px-16 py-8 font-bold tracking-[0.4em] text-xs hover:border-[#c5a059] hover:text-[#c5a059] transition-all uppercase text-center backdrop-blur-sm">Ver Cronología</a>
          </div>
        </div>
      </header>

      {/* Hall of Fame Stats */}
      <section id="stats" className="py-40 bg-[#080808] relative" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Estadísticas de la Trayectoria de Johnny El Bravo</h2>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
            {LEGEND_STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-white/10 group-hover:text-[#c5a059]/10 transition-colors mb-[-2rem] md:mb-[-4rem] flex justify-center">
                  <Star size={120} className="scale-150" aria-hidden="true" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-6xl md:text-8xl font-serif italic font-bold text-[#c5a059] mb-4">
                    {stat.value}<span className="text-3xl md:text-5xl not-italic">{stat.suffix}</span>
                  </h3>
                  <p className="text-white/40 text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cronología Cinematográfica */}
      <section id="biografia" className="relative" aria-label="Biografía interactiva de la leyenda">
        <CinematicTimeline stages={BIO_STAGES} onExplore={setActiveStage} />
      </section>

      {/* Hitos de una Leyenda */}
      <section id="hitos" className="py-20 md:py-40 bg-black border-t border-white/5 relative overflow-hidden" aria-labelledby="hitos-heading">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#c5a059] text-[10px] tracking-[0.8em] uppercase font-black mb-4 block">Gabinete de Trofeos</span>
            <h2 id="hitos-heading" className="text-4xl md:text-8xl font-serif italic text-white uppercase tracking-tighter">Reconocimientos <br /><span className="text-[#c5a059]">Históricos</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className="group p-10 bg-zinc-900/30 border border-white/5 hover:border-[#c5a059]/40 transition-all duration-700 relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 text-white/[0.02] group-hover:text-[#c5a059]/[0.05] transition-colors" aria-hidden="true">
                  <Trophy size={160} />
                </div>
                <div className="relative z-10">
                  <span className="text-[#c5a059] font-serif italic text-4xl mb-6 block">{ach.year}</span>
                  <h3 className="text-white text-lg font-bold uppercase tracking-widest leading-relaxed mb-6 group-hover:text-[#c5a059] transition-colors">
                    {ach.title}
                  </h3>
                  <div className="h-px w-12 bg-white/20 group-hover:w-full group-hover:bg-[#c5a059]/40 transition-all duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discografía Inmortal */}
      <section id="discografia" aria-label="Catálogo discográfico oficial">
        <DiscographyCarousel discs={DISCOGRAPHY} />
      </section>

      {/* Galería Archivo */}
      <section id="galeria" className="bg-black py-48 overflow-hidden border-t border-white/5" aria-labelledby="galeria-heading">
        <div className="max-w-7xl mx-auto px-6 mb-32 text-center">
          <h2 id="galeria-heading" className="text-6xl md:text-[10rem] font-serif italic text-white uppercase tracking-tighter leading-[0.9] mb-6">Archivo <span className="text-[#c5a059]">Bravo</span></h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-20 bg-[#c5a059]/30"></div>
            <p className="text-gray-500 tracking-[0.6em] uppercase text-[10px] font-black">Un legado en blanco y negro de Johnny López «El Bravo» Leyenda</p>
            <div className="h-px w-20 bg-[#c5a059]/30"></div>
          </div>
        </div>
        <ThreeDMarquee images={HISTORICAL_GALLERY_IMAGES} />
      </section>

      {/* El Libro - Edición Legendaria */}
      <section id="libro" className="relative min-h-[110vh] flex items-center bg-black overflow-hidden group" aria-labelledby="libro-heading">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={BOOK_IMAGE_URL}
            className="w-full h-full object-cover opacity-60 transition-transform duration-[10s] ease-out group-hover:scale-110"
            alt="Fondo de la portada del libro biográfico 'Una leyenda viva de la salsa y miles de historias' de Johnny El Bravo López"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30 lg:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-left animate-fade">
              <div className="flex items-center gap-4 mb-8">
                <CheckCircle2 className="text-[#c5a059]" size={20} />
                <span className="text-[#c5a059] text-[10px] tracking-[0.8em] font-black uppercase block">Obra Literaria Oficial de Johnny El Bravo</span>
              </div>

              <h2 id="libro-heading" className="text-4xl md:text-[6.5rem] font-serif italic text-white mb-8 leading-[1.05] tracking-tight uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
                Una leyenda viva <br />
                <span className="text-[#c5a059] not-italic">de la salsa</span>
              </h2>

              <div className="inline-block px-4 py-2 border-l-2 border-[#c5a059] mb-12 bg-black/40 backdrop-blur-sm">
                <p className="text-[12px] uppercase tracking-[0.5em] text-white font-black">Editado por: Fabio Araque Guzmán</p>
              </div>

              <p className="text-2xl md:text-3xl text-gray-400 mb-14 italic font-light leading-relaxed max-w-2xl">
                "La crónica real de un sobreviviente de la salsa dura. Desde los callejones de Puerta de Tierra hasta los escenarios más grandes del mundo."
              </p>

              <div className="space-y-8 mb-16">
                {BOOK_HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="flex gap-6 items-start group/item">
                    <div className="w-12 h-12 shrink-0 border border-[#c5a059]/30 rounded-full flex items-center justify-center text-[#c5a059] font-serif italic text-lg group-hover/item:bg-[#c5a059] group-hover/item:text-black transition-all duration-500 shadow-xl">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.4em] mb-2 group-hover/item:text-[#c5a059] transition-colors">{h.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed max-w-md font-medium tracking-wide">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-center">
                <div className="relative group/btn">
                  <div className="absolute -inset-1 bg-[#c5a059] blur opacity-25 group-hover/btn:opacity-60 transition duration-1000 group-hover/btn:duration-200"></div>
                  <div className="relative bg-[#c5a059]/40 text-black/60 cursor-not-allowed px-16 py-8 font-bold tracking-[0.5em] text-xs shadow-2xl uppercase flex items-center gap-4 transition-all">
                    Próximamente <ArrowRight size={18} />
                  </div>
                </div>

                <div className="text-left px-10 py-6 border-l-2 border-[#c5a059]/40 bg-white/[0.02] backdrop-blur-md">
                  <p className="text-white/30 text-[9px] uppercase tracking-[0.5em] font-black mb-1">Lanzamiento Global</p>
                  <p className="text-white font-serif italic text-3xl tracking-widest uppercase">Muy Pronto</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-end items-center">
              <div className="relative group/badge">
                <div className="absolute -inset-10 bg-[#c5a059]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative w-64 h-64 border border-[#c5a059]/30 rounded-full flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-xl rotate-12 group-hover/badge:rotate-0 transition-transform duration-700">
                  <Star size={32} className="text-[#c5a059] mb-4 animate-spin-slow" aria-hidden="true" />
                  <span className="text-white text-[12px] font-black uppercase tracking-[0.5em] mb-2">Edición</span>
                  <span className="text-[#c5a059] font-serif italic text-4xl leading-none">Limitada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Informacional */}
      <footer id="contacto" className="py-40 bg-black border-t border-white/5 relative overflow-hidden" role="contentinfo">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c5a059]"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Logo className="justify-center mb-20 scale-150" />

          <div className="flex justify-center gap-16 mb-24">
            <a href="https://instagram.com/johnnyelbravo" target="_blank" rel="noopener noreferrer" aria-label="Ver Instagram de Johnny El Bravo" className="text-white/30 hover:text-[#c5a059] transition-all hover:scale-110"><Instagram size={36} /></a>
            <a href="https://facebook.com/johnnyelbravo" target="_blank" rel="noopener noreferrer" aria-label="Ver Facebook de Johnny El Bravo" className="text-white/30 hover:text-[#c5a059] transition-all hover:scale-110"><Facebook size={36} /></a>
            <a href="https://youtube.com/@johnnyelbravo" target="_blank" rel="noopener noreferrer" aria-label="Ver Youtube de Johnny El Bravo" className="text-white/30 hover:text-[#c5a059] transition-all hover:scale-110"><Youtube size={36} /></a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center mb-32">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail size={14} className="text-[#c5a059]" />
                <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-[0.4em]">Booking Global de Johnny El Bravo</p>
              </div>
              <p className="text-lg md:text-xl italic font-serif text-white/80 break-all">booking@johnnyelbravoleyenda.com</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone size={14} className="text-[#c5a059]" />
                <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-[0.4em]">Oficina Puerto Rico</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-base italic font-serif text-white/80">Grace M Lopez-Williams <br /> <span className="text-lg md:text-xl">+1 (678) 517-4422</span></p>
                <p className="text-sm md:text-base italic font-serif text-white/80">Johnny El Bravo López <br /> <span className="text-lg md:text-xl">+1 (787) 319-2826</span></p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone size={14} className="text-[#c5a059]" />
                <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-[0.4em]">Oficina Colombia</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-base italic font-serif text-white/80">Armando Ovalle Jácome <br /> <span className="text-lg md:text-xl">+57 (305) 2891719</span></p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe size={14} className="text-[#c5a059]" />
                <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-[0.4em]">Administración Colombia</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-base italic font-serif text-white/80">Fabio Araque Guzmán <br /> <span className="text-lg md:text-xl">+57 (313) 4144273</span></p>
              </div>
            </div>
          </div>

          <p className="text-gray-800 text-[10px] tracking-[0.8em] uppercase font-bold">© 2026 JOHNNY EL BRAVO LÓPEZ | LA LEYENDA VIVA DE LA SALSA</p>
        </div>
      </footer>



      {/* Modal Detalle Biográfico */}
      {activeStage && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl animate-fade" role="dialog" aria-modal="true">
          <div className="bg-[#0f0f0f] border border-[#c5a059]/30 max-w-6xl w-full p-8 md:p-24 relative shadow-[0_50px_200px_rgba(0,0,0,1)] overflow-y-auto max-h-[95vh] custom-scrollbar">
            <button onClick={() => setActiveStage(null)} aria-label="Cerrar modal de biografía" className="absolute top-10 right-10 text-[#c5a059] hover:rotate-90 transition-all duration-500"><X size={48} /></button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="relative group">
                <div className="absolute -inset-2 bg-[#c5a059]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img src={activeStage.image} className="relative w-full grayscale border border-white/5 shadow-2xl sepia-img" alt={`Momento histórico de Johnny El Bravo en ${activeStage.year}: ${activeStage.title}`} />
                <div className="mt-10 flex items-center gap-6">
                  <span className="text-[#c5a059] font-serif italic text-4xl">{activeStage.year}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#c5a059]/40 to-transparent"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.6em] mb-10 block">Documento Histórico Recuperado</span>
                <h2 className="text-5xl md:text-8xl font-serif italic text-white mb-12 leading-[1.05] tracking-tighter uppercase">{activeStage.title}</h2>
                <p className="text-gray-400 text-xl md:text-3xl font-light leading-relaxed italic mb-16 border-l-4 border-[#c5a059]/30 pl-8">{activeStage.longText}</p>
                <p className="text-white/20 text-[9px] uppercase tracking-widest leading-relaxed">Relato extraído del libro oficial "Una leyenda viva de la salsa".</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;