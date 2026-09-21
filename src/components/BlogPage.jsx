import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, ArrowLeft, Tag, Sparkles, Send, CheckCircle2, X, Eye, Heart, Rocket, Lightbulb, ThumbsUp, Share2, Link2, MessageSquare, Calendar, Archive, Flame, Globe } from 'lucide-react';

export default function BlogPage({ openDiscoveryModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArchive, setActiveArchive] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copyToast, setCopyToast] = useState(false);

  // Reaction State Store per article
  const [reactions, setReactions] = useState({
    1: { likes: 142, rockets: 89, insights: 64, claps: 112 },
    2: { likes: 98, rockets: 54, insights: 76, claps: 85 },
    3: { likes: 76, rockets: 41, insights: 52, claps: 63 },
    4: { likes: 114, rockets: 67, insights: 48, claps: 79 },
    5: { likes: 130, rockets: 95, insights: 88, claps: 104 },
  });

  // Views Store per article
  const [articleViews, setArticleViews] = useState({
    1: 1420,
    2: 980,
    3: 745,
    4: 1120,
    5: 1350,
  });

  // Comments Store per article (No login required!)
  const [comments, setComments] = useState({
    1: [
      { id: 101, name: 'David Vance', role: 'VP of Engineering at FinTech Corp', date: '2 hours ago', text: 'The 48-hour SLA for replacing senior tech leads is a game changer for our Q3 sprint velocity.' },
      { id: 102, name: 'Elena Rostova', role: 'CTO at MedHealth Tech', date: '5 hours ago', text: 'Dual-layer binding NDAs were our primary requirement before signing. Sovereign2Fresh Empire made it seamless.' }
    ],
    2: [
      { id: 103, name: 'Marcus Sterling', role: 'Head of Architecture', date: '1 day ago', text: 'Your 5-stage vetting protocol for DSA and system design is far superior to generic platforms.' }
    ],
    3: [],
    4: [],
    5: []
  });

  // New Comment Form State
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const categories = ['All', 'Talent Vetting', 'Engineering Leadership', 'Cloud & DevOps', 'AI & Machine Learning'];

  const archives = [
    { label: 'July 2026', count: 4 },
    { label: 'June 2026', count: 3 },
    { label: 'May 2026', count: 2 }
  ];

  const articles = [
    {
      id: 1,
      title: "Bridging the Global Tech Gap: Why US Enterprises Are Scaling with African Engineers in 2026",
      category: "Engineering Leadership",
      archiveMonth: "July 2026",
      readTime: "6 min read",
      date: "July 24, 2026",
      author: "Kofi Mensah",
      authorRole: "Principal Tech Architect",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      summary: "An executive breakdown of how distributed engineering squads across Ghana, Nigeria, and Kenya are solving capacity bottlenecks for North American scale-ups with full timezone overlap.",
      content: `The global demand for senior software engineering talent has reached an unprecedented peak. Enterprise CTOs in New York, London, and Toronto face immense pressure to accelerate product roadmaps while maintaining strict code quality and security SLAs.\n\nOver the past three years, the tech landscape has witnessed a dramatic shift toward African technology hubs. With over 700,000 professional software developers across the continent, countries like Nigeria, Ghana, Kenya, South Africa, and Egypt have become premier destinations for high-trust staff augmentation.\n\nKey Advantages of Scaling with African Squads:\n1. Synchronous EST/PST/GMT Timezone Overlap for daily standups\n2. Rigorous CS Degree Foundations & Senior System Design Proficiency\n3. Pre-vetted English Fluency & Agile Team Culture Alignment`
    },
    {
      id: 2,
      title: "The Top 3% Vetting Playbook: How We Audit Code Architecture & Seniority SLAs",
      category: "Talent Vetting",
      archiveMonth: "July 2026",
      readTime: "8 min read",
      date: "July 18, 2026",
      author: "Amina Bello",
      authorRole: "Senior AI & Vetting Lead",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      summary: "A deep dive into Sovereign2Fresh Empire's 5-stage vetting pipeline: live pair-programming architecture audits, timed DSA challenges, soft skills fluency checks, and identity verification.",
      content: `Unvetted freelancer marketplaces carry high disintermediation risks, inconsistent delivery, and hidden management overhead. To guarantee enterprise-grade delivery, Sovereign2Fresh Empire operates a strict 5-stage vetting pipeline.\n\nOnly 3% of applicants pass our multi-stage evaluation. Every developer is audited on code clean architecture, distributed system design, English communication fluency, and legal compliance before entering our talent registry.`
    },
    {
      id: 3,
      title: "Mitigating Remote Hiring Risk: NDAs, Disintermediation Safeguards & 100% IP Ownership",
      category: "Engineering Leadership",
      archiveMonth: "July 2026",
      readTime: "5 min read",
      date: "July 12, 2026",
      author: "Teboho Mokoena",
      authorRole: "DevOps & Compliance Lead",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      summary: "How dual-layer Master Services Agreements and binding international NDAs protect enterprise clients from platform leakage and intellectual property disputes.",
      content: `Intellectual property protection is the single most critical concern for enterprise leaders contracting remote technical talent. Without binding legal frameworks, companies risk platform disintermediation and IP ownership ambiguities.\n\nSovereign2Fresh Empire solves this by acting as the primary contract holder. Clients execute Master Services Agreements directly with Sovereign2Fresh Empire, while all developers execute dual binding NDAs and full IP assignment agreements.`
    },
    {
      id: 4,
      title: "Scaling Cloud Infrastructure: AWS vs. GCP Migration Best Practices for Scale-Ups",
      category: "Cloud & DevOps",
      archiveMonth: "June 2026",
      readTime: "7 min read",
      date: "June 20, 2026",
      author: "Teboho Mokoena",
      authorRole: "DevOps Lead",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      summary: "Best practices for architecting zero-downtime Kubernetes deployments, Terraform IaC scripts, and cost-optimized multi-cloud environments.",
      content: `Cloud infrastructure costs can quickly spiral out of control during rapid scaling phases. Learn how dedicated DevOps squads implement Terraform IaC automation and Kubernetes pod autoscaling to reduce cloud spend by up to 40% while maintaining 99.99% SLA availability.`
    },
    {
      id: 5,
      title: "AI & LLM Orchestration: How Dedicated Python Squads Build Production RAG Engines",
      category: "AI & Machine Learning",
      archiveMonth: "June 2026",
      readTime: "9 min read",
      date: "June 14, 2026",
      author: "Amina Bello",
      authorRole: "AI Engineer",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      summary: "Exploring LangChain, PyTorch, Pinecone, and FastAPI architectures used by African AI specialists to build custom enterprise search models.",
      content: `Retrieval-Augmented Generation (RAG) has transformed enterprise data management. Discover how our Python & AI engineering squads design custom vector database pipelines to enable secure, internal AI search engines for enterprise clients.`
    }
  ];

  // Increment reaction
  const handleReaction = (artId, type) => {
    setReactions(prev => ({
      ...prev,
      [artId]: {
        ...prev[artId],
        [type]: (prev[artId]?.[type] || 0) + 1
      }
    }));
  };

  // Open Article & Increment Views (Scrolls to top for full page view)
  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setArticleViews(prev => ({
      ...prev,
      [article.id]: (prev[article.id] || 0) + 1
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Comment (No login required!)
  const handleAddComment = (artId, e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const commentObj = {
      id: Date.now(),
      name: newCommentName.trim(),
      role: 'Verified Community Reader',
      date: 'Just now',
      text: newCommentText.trim()
    };

    setComments(prev => ({
      ...prev,
      [artId]: [commentObj, ...(prev[artId] || [])]
    }));

    setNewCommentName('');
    setNewCommentText('');
  };

  // Copy Link Toast
  const handleShare = () => {
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const filteredArticles = articles.filter(art => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const matchesArchive = !activeArchive || art.archiveMonth === activeArchive;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesArchive && matchesSearch;
  });

  // 📖 Render Full Dedicated Blog Detail Page when an article is selected
  if (selectedArticle) {
    const relatedArticles = articles.filter(a => a.id !== selectedArticle.id).slice(0, 3);

    return (
      <section className="py-10 px-4 lg:px-8 bg-gradient-to-b from-[#edf1f7] via-[#e2eaf5] to-[#edf1f7] text-[#0f1d31] min-h-screen relative">
        
        {/* Toast Notification */}
        {copyToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0f1d31] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500 flex items-center gap-2 text-xs font-bold animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Article link copied to clipboard!</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Top Sticky Navigation Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-blue-200/80">
            <button
              onClick={() => {
                setSelectedArticle(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-extrabold text-[#0f1d31] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600" />
              <span>Back to Insights & Publications</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="bg-[#d0ddef] text-[#0f1d31] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase border border-[#a8bdd8]">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold hidden sm:inline">{selectedArticle.archiveMonth}</span>
            </div>
          </div>

          {/* Full Page Article Header */}
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f1d31] font-heading leading-tight tracking-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 border-y border-slate-200/80 py-4">
              <div className="flex items-center gap-2.5">
                <img src={selectedArticle.authorAvatar} alt={selectedArticle.author} className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/40 shadow-sm" />
                <div>
                  <p className="font-extrabold text-sm text-[#0f1d31]">{selectedArticle.author}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{selectedArticle.authorRole}</p>
                </div>
              </div>

              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 font-medium"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {selectedArticle.date}</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-blue-600" /> {selectedArticle.readTime}</span>
              <span className="text-slate-300">•</span>
              <span className="font-extrabold text-blue-600 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Eye className="w-4 h-4 text-blue-600" /> {articleViews[selectedArticle.id]} Total Views
              </span>
            </div>
          </div>

          {/* Full-Width Feature Hero Image */}
          <div className="h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-white/60 relative">
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Executive Summary Callout Box */}
          <div className="p-6 rounded-2xl bg-white border-l-4 border-[#2563eb] border border-slate-200/80 shadow-sm space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563eb]">Executive Key Summary</span>
            <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
              "{selectedArticle.summary}"
            </p>
          </div>

          {/* Main Article Content */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 text-base text-slate-700 leading-relaxed font-normal">
            {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} className="first-letter:text-3xl first-letter:font-extrabold first-letter:text-[#0f1d31] first-letter:mr-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Interactive Reactions & Social Share Ribbon */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Reactions:</span>
              
              <button
                onClick={() => handleReaction(selectedArticle.id, 'likes')}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-extrabold flex items-center gap-1.5 border border-rose-200 cursor-pointer active:scale-95 transition-all"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{reactions[selectedArticle.id]?.likes || 0}</span>
              </button>

              <button
                onClick={() => handleReaction(selectedArticle.id, 'rockets')}
                className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-extrabold flex items-center gap-1.5 border border-amber-200 cursor-pointer active:scale-95 transition-all"
              >
                <Rocket className="w-4 h-4 text-amber-500" />
                <span>{reactions[selectedArticle.id]?.rockets || 0}</span>
              </button>

              <button
                onClick={() => handleReaction(selectedArticle.id, 'claps')}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-extrabold flex items-center gap-1.5 border border-blue-200 cursor-pointer active:scale-95 transition-all"
              >
                <ThumbsUp className="w-4 h-4 text-blue-600" />
                <span>{reactions[selectedArticle.id]?.claps || 0}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Share:</span>
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-[#0f1d31] hover:bg-[#0b1525] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-all"
              >
                <Link2 className="w-4 h-4 text-blue-400" />
                <span>Copy Article Link</span>
              </button>
            </div>
          </div>

          {/* Author Bio Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1d31] text-white border border-blue-500/30 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <img src={selectedArticle.authorAvatar} alt={selectedArticle.author} className="w-16 h-16 rounded-full object-cover border-2 border-blue-400 shrink-0" />
            <div className="space-y-1 text-center sm:text-left flex-grow">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">Article Author</span>
              <h4 className="text-xl font-extrabold text-white font-heading">{selectedArticle.author}</h4>
              <p className="text-xs text-blue-200 font-semibold">{selectedArticle.authorRole} at Sovereign2Fresh Empire</p>
              <p className="text-xs text-slate-300 mt-1">Leading technical architecture, distributed system audits, and senior talent verification across North America and Europe.</p>
            </div>
            <button
              onClick={openDiscoveryModal}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shrink-0 shadow-md border border-blue-400/40 active:scale-95 cursor-pointer"
            >
              Book Consult
            </button>
          </div>

          {/* Public Reader Comments Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <MessageSquare className="w-5 h-5 text-[#2563eb]" />
              <h3 className="font-extrabold text-[#0f1d31] text-lg font-heading">
                Public Reader Comments ({comments[selectedArticle.id]?.length || 0})
              </h3>
              <span className="text-xs text-slate-500 font-normal ml-auto">No login required to post</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={(e) => handleAddComment(selectedArticle.id, e)} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name (Required)..."
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="w-full bg-white text-[#0f1d31] text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:outline-none font-medium"
                />
                <input
                  type="email"
                  placeholder="Your Work Email (Optional)..."
                  className="w-full bg-white text-[#0f1d31] text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:outline-none font-medium"
                />
              </div>

              <textarea
                required
                rows="3"
                placeholder="Share your technical thoughts or questions on this article..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full bg-white text-[#0f1d31] text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:outline-none font-medium resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Post Comment</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Comment Stream */}
            <div className="space-y-3">
              {(comments[selectedArticle.id] || []).length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">Be the first to post a comment on this article!</p>
              ) : (
                (comments[selectedArticle.id] || []).map((comm) => (
                  <div key={comm.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                          {comm.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-xs text-[#0f1d31]">{comm.name}</p>
                          <p className="text-[10px] text-slate-500">{comm.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{comm.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal pt-1 pl-9">
                      {comm.text}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Related Articles Section */}
          <div className="space-y-4 pt-6 border-t border-slate-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-[#0f1d31] font-heading">More Publications & Articles</h3>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArt) => (
                <div
                  key={relArt.id}
                  onClick={() => openArticleModal(relArt)}
                  className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="h-36 rounded-xl overflow-hidden">
                    <img src={relArt.image} alt={relArt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {relArt.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-[#0f1d31] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relArt.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{relArt.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={() => {
                setSelectedArticle(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-xl bg-[#0f1d31] hover:bg-[#0b1525] text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 border border-blue-500/30"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Insights & Publications</span>
            </button>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 lg:px-8 bg-gradient-to-b from-[#edf1f7] via-[#e2eaf5] to-[#edf1f7] text-[#0f1d31] min-h-[85vh] relative">
      
      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f1d31] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500 flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/10 border border-blue-500/20 text-[#2563eb] text-xs font-extrabold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Engineering Thought Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
            Sovereign2Fresh Empire Insights & <span className="text-[#1d4ed8]">Publications.</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Strategic guides, talent vetting playbooks, and cloud architecture case studies written by senior African tech architects.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#b8c8e0] flex flex-col md:flex-row items-center gap-4 justify-between shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveArchive(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat && !activeArchive
                    ? 'bg-[#0f1d31] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-[#e0e8f4] border border-[#b8c8e0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, keyword, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-[#0f1d31] text-xs py-2.5 pl-10 pr-4 rounded-xl border border-[#b8c8e0] focus:border-[#2563eb] focus:outline-none placeholder:text-slate-400 font-medium shadow-inner"
            />
          </div>

        </div>

        {/* 2-Column Main Layout: Feed (Left 8 Columns) + Organized Sidebar (Right 4 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Main Article Stream (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Filter Pill indicator if archive is active */}
            {activeArchive && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-xs text-[#2563eb] font-bold">
                <span>Showing articles archived under: <strong className="text-[#0f1d31]">{activeArchive}</strong></span>
                <button 
                  onClick={() => setActiveArchive(null)}
                  className="text-slate-500 hover:text-slate-900 cursor-pointer underline"
                >
                  Clear Archive Filter
                </button>
              </div>
            )}

            {filteredArticles.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#b8c8e0] text-center space-y-3">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-extrabold text-[#0f1d31] text-lg">No articles found</h4>
                <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category tab.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredArticles.map((article, idx) => (
                  <article
                    key={article.id}
                    className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#b8c8e0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 gap-0 group cursor-pointer"
                    onClick={() => openArticleModal(article)}
                  >
                    {/* Thumbnail Image */}
                    <div className="sm:col-span-5 h-56 sm:h-auto relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-[#0f1d31]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                        {article.category}
                      </span>
                    </div>

                    {/* Article Details */}
                    <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2563eb]" /> {article.readTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {article.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-700 font-bold"><Eye className="w-3.5 h-3.5 text-blue-600" /> {articleViews[article.id] || 0} views</span>
                        </div>

                        <h3 className="font-extrabold text-[#0f1d31] text-lg font-heading group-hover:text-[#2563eb] transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                          {article.summary}
                        </p>
                      </div>

                      {/* Author & Interactive Reaction Counter Summary */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        
                        <div className="flex items-center gap-2.5">
                          <img
                            src={article.authorAvatar}
                            alt={article.author}
                            className="w-8 h-8 rounded-full object-cover border border-[#b8c8e0]"
                          />
                          <div className="text-[11px]">
                            <p className="font-extrabold text-[#0f1d31]">{article.author}</p>
                            <p className="text-[9px] text-slate-500">{article.authorRole}</p>
                          </div>
                        </div>

                        {/* Interactive Reaction Pills */}
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleReaction(article.id, 'likes')}
                            className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-extrabold flex items-center gap-1 transition-transform active:scale-95 cursor-pointer border border-rose-200"
                            title="Love this article"
                          >
                            <Heart className="w-3 h-3 fill-rose-500" />
                            <span>{reactions[article.id]?.likes || 0}</span>
                          </button>

                          <button
                            onClick={() => handleReaction(article.id, 'rockets')}
                            className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 text-[10px] font-extrabold flex items-center gap-1 transition-transform active:scale-95 cursor-pointer border border-amber-200"
                            title="Rocket fuel"
                          >
                            <Rocket className="w-3 h-3 text-amber-500" />
                            <span>{reactions[article.id]?.rockets || 0}</span>
                          </button>

                          <button
                            onClick={() => handleReaction(article.id, 'claps')}
                            className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-extrabold flex items-center gap-1 transition-transform active:scale-95 cursor-pointer border border-blue-200"
                            title="Clap"
                          >
                            <ThumbsUp className="w-3 h-3 text-blue-600" />
                            <span>{reactions[article.id]?.claps || 0}</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>

          {/* Right Sidebar: Organized Archives, Trending Posts, Topics & Newsletter (lg:col-span-4) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* 📁 Archives Widget */}
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#b8c8e0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Archive className="w-4 h-4 text-[#2563eb]" />
                <h3 className="font-extrabold text-[#0f1d31] text-sm font-heading uppercase tracking-wider">Publication Archives</h3>
              </div>

              <div className="space-y-1.5">
                {archives.map((arch) => (
                  <button
                    key={arch.label}
                    onClick={() => {
                      setActiveArchive(activeArchive === arch.label ? null : arch.label);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeArchive === arch.label
                        ? 'bg-[#2563eb] text-white shadow-sm'
                        : 'bg-[#f4f8f4] text-slate-700 hover:bg-[#e0e8f4]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{arch.label}</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeArchive === arch.label ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {arch.count} articles
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 🔥 Trending Top Reads */}
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#b8c8e0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="font-extrabold text-[#0f1d31] text-sm font-heading uppercase tracking-wider">Trending Articles</h3>
              </div>

              <div className="space-y-3.5">
                {articles.slice(0, 3).map((trend, tIdx) => (
                  <div
                    key={trend.id}
                    onClick={() => openArticleModal(trend)}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-[#2563eb] font-extrabold text-xs flex items-center justify-center shrink-0 border border-blue-200">
                      #{tIdx + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs text-[#0f1d31] group-hover:text-[#2563eb] transition-colors leading-snug line-clamp-2">
                        {trend.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                        <span>{trend.date}</span>
                        <span>•</span>
                        <span className="text-blue-600 font-bold flex items-center gap-0.5"><Eye className="w-3 h-3" /> {articleViews[trend.id]} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🏷️ Popular Topics */}
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#b8c8e0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Tag className="w-4 h-4 text-[#2563eb]" />
                <h3 className="font-extrabold text-[#0f1d31] text-sm font-heading uppercase tracking-wider">Popular Topics</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['Talent Vetting', 'Engineering SLAs', 'Dual NDAs', 'DevOps & AWS', 'Python RAG', 'React Squads', 'Timezone Overlap'].map((topic) => (
                  <span
                    key={topic}
                    onClick={() => {
                      setSearchTerm(topic);
                    }}
                    className="bg-[#e0e8f4] hover:bg-[#2563eb] hover:text-white text-[#0f1d31] text-[11px] font-extrabold px-3 py-1 rounded-xl cursor-pointer transition-all border border-[#b8c8e0]"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            {/* 📩 Newsletter Widget */}
            <div className="bg-gradient-to-br from-[#0f1d31] to-[#0a1628] text-white p-6 rounded-3xl border border-blue-500/40 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
                <Sparkles className="w-5 h-5" />
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base font-heading">Subscribe to Tech Insights</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">Get weekly CTO playbooks on scaling remote engineering squads and compliance SLAs.</p>
              </div>

              {subscribed ? (
                <div className="bg-blue-500/20 text-blue-300 border border-blue-500/40 p-3.5 rounded-xl text-xs font-extrabold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>Subscribed! Check your inbox for the latest playbook.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setSubscribed(true);
                  }}
                  className="space-y-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder:text-slate-400 text-xs py-2.5 px-3.5 rounded-xl border border-white/20 focus:border-blue-400 focus:outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2563eb] hover:bg-blue-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer border border-blue-400/30"
                  >
                    <span>Subscribe Playbook</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}
