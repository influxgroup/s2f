import React, { useState, useEffect, useRef } from 'react';
import { Shield, ArrowRight, Clock, Zap, Layers, ShieldCheck, Users } from 'lucide-react';
import heroExecutiveLead from '../assets/hero_executive_lead.jpg';
import { useCms } from '../context/CmsContext';

/* ─── Animated Counter Hook ─── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─── Cybernetic Matrix Code Stream Background (Enterprise Blue Matrix Rain) ─── */
function MatrixRainBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // High-tech enterprise glyph set (binary, hex, code symbols)
    const characters = '010101010123456789ABCDEF{}[]<>/\\:;*+=~#_$%^&';
    const fontSize = 14;
    let columns = 0;
    let drops = [];

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 800;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -60);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const fps = 26; // Controlled cinematic cadence for smooth elegance
    const interval = 1000 / fps;

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      // Subtle fade trail that creates streaming motion
      ctx.fillStyle = 'rgba(2, 6, 23, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace, sans-serif`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] < 0) {
          drops[i]++;
          continue;
        }

        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading head character: bright electric sky-white
        // Stream body: subtle sapphire and sky blue
        if (Math.random() > 0.88) {
          ctx.fillStyle = 'rgba(186, 230, 253, 0.9)'; // Bright sky/cyan head glyph
        } else {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.38)'; // Sky blue stream body
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.982) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.24] mix-blend-screen"
      style={{
        maskImage: 'radial-gradient(ellipse 95% 80% at 50% 40%, black 40%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse 95% 80% at 50% 40%, black 40%, transparent 95%)'
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default function HeroSection({ setActiveTab, openDiscoveryModal }) {
  const { content } = useCms();
  const hero = content?.hero || {};

  // Determine headline with fallback to modern IT solutions copy
  const isSquadHeadline = !hero.headline || hero.headline.toLowerCase().includes('squad');
  const headline = isSquadHeadline 
    ? 'Premier Enterprise IT Solutions & Custom Software Development.' 
    : hero.headline;
  const headlineHighlight = isSquadHeadline 
    ? 'Custom Software Development.' 
    : (hero.headlineHighlight || 'IT Solutions');

  // Determine subheadline with fallback
  const isSquadSubhead = !hero.subheadline || hero.subheadline.toLowerCase().includes('pre-vetted software engineers');
  const subheadline = isSquadSubhead
    ? 'Sovereign2Fresh Empire delivers world-class IT solutions, bespoke software development, cloud infrastructure, and mission-critical cybersecurity for commercial businesses, government institutions, and private firms.'
    : hero.subheadline;

  return (
    <section className="relative text-white overflow-hidden bg-[#020617] border-b border-blue-900/50 w-full max-w-full flex flex-col justify-between pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
      
      {/* ─── 1. POWERFUL MULTI-STOP ATMOSPHERIC GRADIENT CANVAS ─── */}
      {/* Primary Deep Royal Sapphire & Cobalt Wave */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #020715 0%, #071738 22%, #0d2757 42%, #0a1e45 68%, #030a1c 100%)'
        }}
      />

      {/* Overhead Executive Luminous Dome radiating down */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 70% at 50% -15%, rgba(37, 99, 235, 0.42) 0%, rgba(29, 78, 216, 0.22) 42%, rgba(2, 6, 23, 0) 80%)'
        }}
      />

      {/* Cybernetic Matrix Code Stream Background */}
      <MatrixRainBackground />

      {/* Luminous Cyan/Sky Light Flare behind Right Photo Card */}
      <div 
        className="absolute top-1/4 right-0 w-[550px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(14, 165, 233, 0.22) 0%, rgba(37, 99, 235, 0.12) 45%, transparent 75%)',
          filter: 'blur(30px)'
        }}
      />

      {/* Deep Cobalt Accent Glow behind Left Headline */}
      <div 
        className="absolute top-20 left-0 w-[550px] h-[450px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Precision Technical Architectural Grid with Elliptical Radial Mask */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 35%, transparent 85%)'
        }}
      />

      {/* Subtle Bottom Glowing Horizon Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />

      {/* ─── 2-COLUMN HERO (Left: Executive Value Prop | Right: Framed Engineering Leadership) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">

          {/* LEFT: Headline, Copy, CTAs, Social Proof */}
          <div className="lg:col-span-7 xl:col-span-7 relative z-20 space-y-6 text-center lg:text-left">

            {/* Main Headline - Electric Sky-Blue Accent with Maximum Contrast */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-white tracking-tight leading-[1.12] font-heading break-words max-w-2xl drop-shadow-sm">
              {headline.includes(headlineHighlight) ? (
                <>
                  {headline.split(headlineHighlight)[0]}
                  <span className="text-sky-400 font-extrabold">
                    {headlineHighlight}
                  </span>
                  {headline.split(headlineHighlight)[1]}
                </>
              ) : (
                headline
              )}
            </h1>

            {/* Supporting Copy - Natural, Authoritative Tone */}
            <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed font-normal mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* Action Buttons / CTAs - Clean, Confident Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-1 w-full">
              <button
                onClick={openDiscoveryModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/50 active:scale-95 border border-blue-400/40"
              >
                <span>{hero.primaryCta && !hero.primaryCta.includes('Squad') ? hero.primaryCta : 'Book an IT Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700/80 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 backdrop-blur-md"
              >
                <span>{hero.secondaryCta && !hero.secondaryCta.includes('Calculate') && !hero.secondaryCta.includes('Retainer') ? hero.secondaryCta : 'Explore Portfolio'}</span>
              </button>
            </div>

            {/* High-Glassmorphism Compact Metric Cards (Directly Under Action Buttons) */}
            <div className="pt-4 w-full">
              <FancyCounterRibbon hero={hero} openDiscoveryModal={openDiscoveryModal} />
            </div>

          </div>

          {/* RIGHT: Authentic African Engineering Leadership (Unique Architectural Frame) */}
          <div className="lg:col-span-5 xl:col-span-5 relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] sm:max-w-[480px]">
              
              {/* Offset Architectural Glow & Geometric Accent Border */}
              <div className="absolute -inset-2.5 rounded-[2.5rem] rounded-tr-[5.5rem] rounded-bl-2xl bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-transparent blur-md pointer-events-none" />
              <div className="absolute -inset-1 rounded-[2.5rem] rounded-tr-[5.5rem] rounded-bl-2xl border border-blue-500/25 pointer-events-none" />

              {/* Unique Asymmetrical Silhouette Photo Frame */}
              <div className="relative rounded-[2.5rem] rounded-tr-[5.5rem] rounded-bl-2xl overflow-hidden border border-blue-400/40 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_50px_-10px_rgba(37,99,235,0.3)] aspect-square ring-1 ring-white/10 group">
                <img
                  src={heroExecutiveLead}
                  alt="Sovereign2Fresh Empire African Enterprise Engineering Team"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Subtle Inner Bottom Vignette for Seamless Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent pointer-events-none" />

                {/* Single Functional Status Chip (Linear Aesthetic) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-200 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Cloud & Enterprise Delivery</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

/* ─── Ultra-Compact Sleek Metric Stat-Line (Inline Pipe Separated) ─── */
function FancyCounterRibbon({ hero = {}, openDiscoveryModal }) {
  const projects = useCountUp(hero.metricEngineers ?? 180, 2200);
  const uptime = useCountUp(99, 2000);
  const satisfaction = useCountUp(100, 1800);
  const hours = useCountUp(hero.metricSlaHours ?? 48, 1600);

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-2.5 sm:gap-x-4 text-white pt-2">
      
      {/* Metric 1 */}
      <div ref={projects.ref} className="flex items-center gap-2">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-500/10 border border-sky-400/25 flex items-center justify-center shrink-0">
          <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight tabular-nums font-heading leading-tight">
            {projects.count}+
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium whitespace-nowrap leading-tight">
            Projects Delivered
          </span>
        </div>
      </div>

      {/* Pipe Divider 1 */}
      <div className="hidden sm:block h-5 w-px bg-white/20 self-center" />

      {/* Metric 2 */}
      <div ref={uptime.ref} className="flex items-center gap-2">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-500/10 border border-sky-400/25 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight tabular-nums font-heading leading-tight">
            {uptime.count}.9%
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium whitespace-nowrap leading-tight">
            System SLA Uptime
          </span>
        </div>
      </div>

      {/* Pipe Divider 2 */}
      <div className="hidden sm:block h-5 w-px bg-white/20 self-center" />

      {/* Metric 3 */}
      <div ref={satisfaction.ref} className="flex items-center gap-2">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-500/10 border border-sky-400/25 flex items-center justify-center shrink-0">
          <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight tabular-nums font-heading leading-tight">
            {satisfaction.count}%
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium whitespace-nowrap leading-tight">
            Client Satisfaction
          </span>
        </div>
      </div>

      {/* Pipe Divider 3 */}
      <div className="hidden sm:block h-5 w-px bg-white/20 self-center" />

      {/* Metric 4 */}
      <div
        ref={hours.ref}
        onClick={openDiscoveryModal}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-500/10 border border-sky-400/25 group-hover:border-sky-400/50 flex items-center justify-center shrink-0 transition-colors">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 text-sky-400 group-hover:text-white font-bold text-xs sm:text-sm tracking-tight tabular-nums font-heading leading-tight transition-colors">
            <span>&lt; {hours.count}h</span>
            <ArrowRight className="w-2.5 h-2.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium whitespace-nowrap leading-tight">
            Rapid Kickoff
          </span>
        </div>
      </div>

    </div>
  );
}
