import React, { useState, useEffect, useRef } from 'react';
import { Shield, ArrowRight, Sparkles, Star, Users, Lock, Clock, Zap } from 'lucide-react';
import heroUserNoBg from '../assets/hero_user_nobg.png';
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

export default function HeroSection({ setActiveTab, openDiscoveryModal }) {
  const { content } = useCms();
  const hero = content?.hero || {};

  return (
    <section className="relative text-[#0f1d31] overflow-hidden border-b border-[#b8c8e0] bg-[#e4edf8] w-full max-w-full flex flex-col justify-between pt-6 sm:pt-10 lg:pt-12">

      {/* ─── 2-COLUMN HERO (Left: Copy & CTAs | Right: Transparent Developer Cutout) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-2 items-center w-full">

          {/* LEFT: Labels, Headline, Copy, CTAs, Social Proof (z-20 in Front) */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-20 space-y-4 sm:space-y-6 text-center lg:text-left py-2 lg:py-6">

            {/* Functional Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 border border-blue-200/80 text-blue-900 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{hero.statusPill || 'Available for Q3/Q4 Enterprise Engagements'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[52px] font-extrabold text-[#0f1d31] tracking-tight leading-[1.14] font-heading break-words max-w-xl">
              {hero.headline ? (
                <>
                  {hero.headlineHighlight && hero.headline.includes(hero.headlineHighlight) ? (
                    <>
                      {hero.headline.split(hero.headlineHighlight)[0]}
                      <span className="text-blue-700">{hero.headlineHighlight}</span>
                      {hero.headline.split(hero.headlineHighlight)[1]}
                    </>
                  ) : (
                    hero.headline
                  )}
                </>
              ) : (
                <>
                  Dedicated Software Engineering Squads for <span className="text-blue-700">Growing Tech Teams.</span>
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-700 max-w-lg leading-relaxed font-normal mx-auto lg:mx-0">
              {hero.subheadline || 'Sovereign2Fresh Empire connects companies with pre-vetted software engineers, DevSecOps leads, and systems architects. Build secure React applications, AI solutions, and enterprise cloud infrastructure.'}
            </p>


            {/* Action Buttons / CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 w-full">
              <button
                onClick={openDiscoveryModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0f172a] text-white font-semibold text-xs sm:text-sm hover:bg-[#1e293b] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>{hero.primaryCta || 'Book a Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors border border-slate-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>{hero.secondaryCta || 'Calculate Squad Retainer'}</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs text-slate-700">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="CTO 1" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="CTO 2" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="CTO 3" />
              </div>
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </div>
                <span className="text-[#0f1d31]">{hero.socialProofText || 'Trusted by 40+ Enterprise CTOs (4.9/5)'}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Transparent Developer Cutout with Orbiting Tech Badges (100% Background-Free) */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-10 flex justify-center lg:justify-end items-end select-none pointer-events-none pt-4 lg:pt-0 -mb-4 sm:-mb-6 lg:-mb-8">
            <img
              src={heroUserNoBg}
              alt="Sovereign2Fresh Empire Engineering Squads with Leading Technologies"
              className="w-full max-w-[540px] sm:max-w-[620px] lg:max-w-none lg:w-[110%] xl:w-[115%] h-auto max-h-[500px] sm:max-h-[580px] lg:max-h-[640px] xl:max-h-[700px] object-contain object-bottom lg:-mr-2 xl:-mr-4"
            />
          </div>

        </div>
      </div>

      {/* ─── BOTTOM COUNTER RIBBON ─── */}
      <div className="relative z-20 px-3 sm:px-6 lg:px-12 pt-6 pb-6 sm:pb-8 w-full max-w-full">
        <FancyCounterRibbon hero={hero} />
      </div>

    </section>
  );
}

/* ─── Responsive Animated Counter Ribbon ─── */
function FancyCounterRibbon({ hero = {} }) {
  const engineers = useCountUp(hero.metricEngineers ?? 180, 2200);
  const retention = useCountUp(hero.metricRetention ?? 90, 2000);
  const sprints = useCountUp(hero.metricSprints ?? 10, 1800);
  const hours = useCountUp(hero.metricSlaHours ?? 48, 1600);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-[#b8c8e0] shadow-sm text-[#0f1d31] overflow-hidden">

        <div ref={engineers.ref} className="flex flex-col items-center justify-center py-3.5 sm:py-5 px-2 sm:px-4 border-r border-b lg:border-b-0 border-[#dbe4f0]">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#2563eb]" />
            <span className="text-xl sm:text-3xl font-black text-[#0f1d31] font-heading tabular-nums">{engineers.count}+</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5 sm:mt-1 font-semibold text-center">Engineers Deployed</p>
        </div>

        <div ref={retention.ref} className="flex flex-col items-center justify-center py-3.5 sm:py-5 px-2 sm:px-4 border-b lg:border-b-0 lg:border-r border-[#dbe4f0]">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-[#2563eb]" />
            <span className="text-xl sm:text-3xl font-black text-[#0f1d31] font-heading tabular-nums">{retention.count}%</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5 sm:mt-1 font-semibold text-center">Client Retention</p>
        </div>

        <div ref={sprints.ref} className="flex flex-col items-center justify-center py-3.5 sm:py-5 px-2 sm:px-4 border-r border-[#dbe4f0]">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-[#2563eb]" />
            <span className="text-xl sm:text-3xl font-black text-[#0f1d31] font-heading tabular-nums">{sprints.count}K+</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5 sm:mt-1 font-semibold text-center">Sprints Delivered</p>
        </div>

        <div ref={hours.ref} className="flex flex-col items-center justify-center py-3.5 sm:py-5 px-2 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#2563eb]" />
            <span className="text-xl sm:text-3xl font-black text-[#0f1d31] font-heading tabular-nums">{hours.count} Hrs</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5 sm:mt-1 font-semibold text-center">Replacement SLA</p>
        </div>


      </div>
    </div>
  );
}
