import React, { useState } from 'react';
import { mockTalentPool } from '../data/mockTalent';
import { Search, ShieldCheck, ExternalLink, Award, MapPin, Clock, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function TalentPoolExplorer({ openDiscoveryModal }) {
  const { content } = useCms();
  const talentList = content?.talent && content.talent.length > 0 ? content.talent : mockTalentPool;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedTalentModal, setSelectedTalentModal] = useState(null);

  const filteredTalent = talentList.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(t.primaryStack) && t.primaryStack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (typeof t.primaryStack === 'string' && t.primaryStack.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.country && t.country.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSeniority = selectedSeniority === 'All' || t.seniority === selectedSeniority;
    const matchesAvailability = selectedAvailability === 'All' || t.availabilityCode === selectedAvailability;

    return matchesSearch && matchesSeniority && matchesAvailability;
  });


  return (
    <section className="py-16 px-4 lg:px-8 bg-sage-banner min-h-[85vh] text-[#0f1d31] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Verified African Tech Talent Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
            Browse Top 3% Vetted <span className="text-[#1d4ed8]">Software Talent.</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
            Every software engineer, tech lead, and cloud architect in our registry has passed our 5-stage technical architecture and communication audit.
          </p>
        </div>

        {/* Glass Filter Controls Bar */}
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#b8c8e0] flex flex-col md:flex-row items-center gap-4 justify-between shadow-sm">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by skill (React, Python, AWS), name, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f4f8f4] text-[#0f1d31] text-xs py-2.5 pl-10 pr-4 rounded-xl border border-[#b8c8e0] focus:border-[#2563eb] focus:outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Seniority Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-600 font-bold">Tier:</span>
              <select
                value={selectedSeniority}
                onChange={(e) => setSelectedSeniority(e.target.value)}
                className="bg-[#f4f8f4] text-[#0f1d31] text-xs py-2 px-3 rounded-xl border border-[#b8c8e0] focus:outline-none font-semibold"
              >
                <option value="All">All Seniorities</option>
                <option value="Tech Lead">Tech Lead</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* Availability Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-600 font-bold">Availability:</span>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="bg-[#f4f8f4] text-[#0f1d31] text-xs py-2 px-3 rounded-xl border border-[#b8c8e0] focus:outline-none font-semibold"
              >
                <option value="All">All Availability</option>
                <option value="immediate">Immediate</option>
                <option value="2weeks">In 2 Weeks</option>
              </select>
            </div>
          </div>

        </div>

        {/* Talent Cards Grid (Off-White Canvas + Frosted White Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalent.map((talent) => (
            <div
              key={talent.id}
              className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#b8c8e0] hover:border-[#2563eb] transition-all space-y-5 flex flex-col justify-between group shadow-sm hover:shadow-xl image-card-zoom"
            >
              <div className="space-y-4">
                
                {/* Header: Photo & Seniority */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={talent.avatar}
                      alt={talent.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2563eb]/50 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-[#0f1d31] text-base font-heading">{talent.name}</h3>
                        <span className="text-xs">{talent.flag}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">{talent.title}</p>
                    </div>
                  </div>

                  <span className="bg-[#d0ddef] text-[#0f1d31] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-[#a8bdd8] shrink-0">
                    {talent.seniority}
                  </span>
                </div>

                {/* Country & Timezone */}
                <div className="flex items-center justify-between text-xs text-slate-700 bg-[#f4f8f4] p-2.5 rounded-xl border border-[#b8c8e0] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>{talent.country}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0f1d31]">
                    <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>{talent.timezone.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Stack Badges */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Verified Core Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {talent.primaryStack.map((tech) => (
                      <span key={tech} className="bg-[#e0e8f4] text-[#0f1d31] text-xs px-2.5 py-0.5 rounded-md border border-[#b8c8e0] font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vetting Score Gauges */}
                <div className="grid grid-cols-3 gap-2 text-center bg-[#e0e8f4] p-3 rounded-xl border border-[#b8c8e0]">
                  <div>
                    <p className="text-[9px] text-slate-600 uppercase font-bold">Coding</p>
                    <p className="text-sm font-extrabold text-[#1d4ed8] font-heading">{talent.vettingScores.coding}/100</p>
                  </div>
                  <div className="border-x border-[#b8c8e0]">
                    <p className="text-[9px] text-slate-600 uppercase font-bold">System Arch</p>
                    <p className="text-sm font-extrabold text-[#1d4ed8] font-heading">{talent.vettingScores.architecture}/100</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-600 uppercase font-bold">Overall</p>
                    <p className="text-sm font-extrabold text-amber-700 font-heading">{talent.overallScore}/100</p>
                  </div>
                </div>

              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Standard Client Rate</span>
                  <p className="text-base font-extrabold text-[#0f1d31] font-heading">${talent.billableRate}<span className="text-xs text-slate-500 font-normal">/hr</span></p>
                </div>

                <button
                  onClick={() => setSelectedTalentModal(talent)}
                  className="px-4 py-2 rounded-xl bg-[#2563eb] text-white font-bold text-xs hover:bg-[#1d4ed8] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>Inspect Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Talent Profile Modal */}
        {selectedTalentModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-[#b8c8e0] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-[#0f1d31]">
              
              <button
                onClick={() => setSelectedTalentModal(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedTalentModal.avatar}
                  alt={selectedTalentModal.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2563eb] shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-[#0f1d31] font-heading">{selectedTalentModal.name}</h3>
                    <span className="text-base">{selectedTalentModal.flag}</span>
                  </div>
                  <p className="text-sm text-slate-700 font-semibold">{selectedTalentModal.title}</p>
                  <p className="text-xs text-[#2563eb] font-bold mt-1">{selectedTalentModal.country} • {selectedTalentModal.timezone}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Overview & Experience</h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-[#f4f8f4] p-4 rounded-xl border border-[#b8c8e0] font-normal">
                  {selectedTalentModal.bio}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTalentModal.certifications.map((cert) => (
                    <span key={cert} className="bg-[#e0e8f4] text-[#0f1d31] border border-[#b8c8e0] text-xs px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#2563eb]" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-600">
                  <span className="font-bold">S2F Empire ID:</span> {selectedTalentModal.id}
                </div>

                <button
                  onClick={() => {
                    setSelectedTalentModal(null);
                    openDiscoveryModal();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#2563eb] text-white font-extrabold text-xs hover:bg-[#1d4ed8] transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Request Candidate Deployment</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
