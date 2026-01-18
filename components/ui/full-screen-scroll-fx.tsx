
import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;
  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  showProgress?: boolean;
  onIndexChange?: (index: number) => void;
  colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,
      header,
      footer,
      showProgress = true,
      onIndexChange,
      colors = {
        text: "#c5a059",
        overlay: "rgba(0,0,0,0.85)",
        pageBg: "#0a0a0a",
        stageBg: "#000",
      },
      apiRef,
    },
    ref
  ) => {
    const total = sections.length;
    const [index, setIndex] = useState(0);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);
    const trackLeftRef = useRef<HTMLDivElement | null>(null);
    const trackRightRef = useRef<HTMLDivElement | null>(null);
    const bgRefs = useRef<Array<HTMLElement | null>>([]);
    
    const backgrounds = useMemo(() => sections.map(s => s.background), [sections]);

    useLayoutEffect(() => {
      if (typeof window === "undefined" || !fixedSectionRef.current) return;

      const fs = fixedSectionRef.current;
      const pinned = fixedRef.current;

      const masterST = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: `+=${total * 80}%`, // Reducido ligeramente para un scroll más ágil
        pin: pinned,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const i = clamp(Math.round(self.progress * (total - 1)), 0, total - 1);
          if (i !== index) {
            setIndex(i);
            onIndexChange?.(i);
          }
        }
      });

      const refreshAll = () => ScrollTrigger.refresh();
      window.addEventListener('resize', refreshAll);
      const timer = setTimeout(refreshAll, 300);

      return () => {
        masterST.kill();
        window.removeEventListener('resize', refreshAll);
        clearTimeout(timer);
      };
    }, [total]);

    useEffect(() => {
      const D = 0.6;
      const ease = "power3.out";

      const moveTrack = (track: HTMLDivElement | null) => {
        if (!track) return;
        const activeItem = track.children[index] as HTMLElement;
        if (!activeItem) return;
        
        const offsetTop = activeItem.offsetTop;
        const itemHeight = activeItem.offsetHeight;
        const containerHeight = track.parentElement?.offsetHeight || 0;
        const targetY = (containerHeight / 2) - (itemHeight / 2) - offsetTop;

        gsap.to(track, {
          y: targetY,
          duration: D,
          ease: ease
        });
      };

      moveTrack(trackLeftRef.current);
      moveTrack(trackRightRef.current);

      backgrounds.forEach((_, i) => {
        const isActive = i === index;
        if (bgRefs.current[i]) {
          gsap.to(bgRefs.current[i], {
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 1.1,
            duration: 1,
            ease: "power2.inOut",
            zIndex: isActive ? 5 : 1
          });
        }
      });

    }, [index, backgrounds]);

    const goTo = (to: number) => {
      const fs = fixedSectionRef.current;
      if (!fs) return;
      const progress = to / (total - 1 || 1);
      const scrollPos = fs.offsetTop + (progress * (total * 80 * (window.innerHeight / 100)));
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    };

    useImperativeHandle(apiRef, () => ({
      next: () => goTo(index + 1),
      prev: () => goTo(index - 1),
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    return (
      <div
        ref={ref}
        className={`fx-root ${className || ""}`}
        style={{
          "--fx-text": colors.text,
          "--fx-overlay": colors.overlay,
          "--fx-page-bg": colors.pageBg,
          "--fx-stage-bg": colors.stageBg,
          ...style
        } as CSSProperties}
      >
        <div className="fx-fs-trigger" ref={fixedSectionRef}>
          <div className="fx-pinned-wrapper" ref={fixedRef}>
            
            <div className="fx-background-stack">
              {backgrounds.map((url, i) => (
                <div key={i} className="fx-bg-layer" style={{ opacity: i === 0 ? 1 : 0 }}>
                  <img 
                    // Fixed: Wrapped assignment in braces to ensure the ref callback returns void
                    ref={(el) => { bgRefs.current[i] = el; }}
                    src={url} alt="" 
                    className="fx-asset"
                  />
                  <div className="fx-asset-overlay" />
                </div>
              ))}
            </div>

            <div className="fx-main-grid">
              {header && <div className="fx-grid-header">{header}</div>}
              <div className="fx-layout">
                <div className="fx-column fx-left-col">
                  <div className="fx-track-mask">
                    <div className="fx-track" ref={trackLeftRef}>
                      {sections.map((s, i) => (
                        <div key={`l-${i}`} className={`fx-label-year ${i === index ? 'active' : ''}`} onClick={() => goTo(i)}>
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="fx-column fx-center-col">
                   <div className="fx-title-container">
                      {sections.map((s, i) => (
                        <div key={`c-${i}`} className={`fx-title-slide ${i === index ? 'active' : ''}`}>
                           <h3 className="fx-title-text">{s.title}</h3>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="fx-column fx-right-col">
                  <div className="fx-track-mask">
                    <div className="fx-track" ref={trackRightRef}>
                      {sections.map((s, i) => (
                        <div key={`r-${i}`} className={`fx-label-summary ${i === index ? 'active' : ''}`} onClick={() => goTo(i)}>
                          <div className="pointer-events-auto">{s.rightLabel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="fx-grid-footer">
                 <div className="fx-footer-content">
                    <span className="fx-footer-text">{footer}</span>
                    {showProgress && (
                      <div className="fx-progress-nav">
                        <span className="fx-current-idx">{String(index + 1).padStart(2, '0')}</span>
                        <div className="fx-progress-line">
                           <div className="fx-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
                        </div>
                        <span className="fx-total-idx">{String(total).padStart(2, '0')}</span>
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .fx-root { position: relative; width: 100%; background: var(--fx-page-bg); color: white; text-transform: uppercase; }
          .fx-fs-trigger { position: relative; width: 100%; }
          .fx-pinned-wrapper { position: relative; height: 100vh; width: 100%; overflow: hidden; }
          .fx-background-stack { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
          .fx-bg-layer { position: absolute; inset: 0; transition: opacity 1s ease; overflow: hidden; }
          .fx-asset { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .fx-asset-overlay { position: absolute; inset: 0; background: var(--fx-overlay); backdrop-filter: blur(4px); }
          .fx-main-grid { position: relative; z-index: 10; height: 100%; display: grid; grid-template-rows: auto 1fr auto; padding: 5vh 5vw; }
          .fx-grid-header { text-align: center; color: var(--fx-text); opacity: 0.6; letter-spacing: 0.8em; font-size: 0.7rem; font-weight: bold; }
          .fx-layout { display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; gap: 4vw; height: 100%; }
          .fx-column { height: 100%; position: relative; display: flex; align-items: center; }
          .fx-track-mask { width: 100%; height: 100%; overflow: hidden; position: relative; }
          .fx-track { will-change: transform; display: flex; flex-direction: column; align-items: center; gap: 6rem; width: 100%; }
          .fx-label-year { font-size: clamp(2rem, 6vw, 6rem); font-family: 'Playfair Display', serif; font-style: italic; color: var(--fx-text); opacity: 0.15; transition: all 0.4s ease; cursor: pointer; user-select: none; text-align: center; width: 100%; }
          .fx-label-year.active { opacity: 1; transform: scale(1.1); color: white; }
          .fx-title-container { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; }
          .fx-title-slide { position: absolute; opacity: 0; visibility: hidden; transform: translateY(-30px); transition: all 0.6s ease; width: 100%; }
          .fx-title-slide.active { opacity: 1; visibility: visible; transform: translateY(0); }
          .fx-title-text { font-size: clamp(1.2rem, 3.5vw, 4rem); font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; line-height: 1.2; text-shadow: 0 10px 40px rgba(0,0,0,0.8); }
          .fx-label-summary { opacity: 0; visibility: hidden; transform: translateX(30px); transition: all 0.5s ease; cursor: pointer; width: 100%; }
          .fx-label-summary.active { opacity: 1; visibility: visible; transform: translateX(0); pointer-events: auto; }
          .fx-grid-footer { display: flex; justify-content: center; padding-bottom: 2vh; }
          .fx-footer-content { display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; max-width: 400px; }
          .fx-footer-text { color: var(--fx-text); font-size: 0.6rem; letter-spacing: 0.4em; font-weight: 900; opacity: 0.5; }
          .fx-progress-nav { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
          .fx-progress-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); position: relative; }
          .fx-fill { position: absolute; left: 0; top: 0; height: 100%; background: var(--fx-text); transition: width 0.4s ease; }
          .fx-current-idx, .fx-total-idx { font-size: 0.7rem; font-weight: bold; color: var(--fx-text); }
          @media (max-width: 1024px) {
            .fx-layout { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; gap: 2vh; }
            .fx-track { gap: 2rem; }
            .fx-label-year { font-size: 3rem; }
            .fx-title-text { font-size: 1.5rem; }
            .fx-right-col { display: flex; justify-content: center; align-items: flex-start; }
            .fx-label-summary { transform: none; text-align: center; padding: 0 20px; }
          }
        ` }} />
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
