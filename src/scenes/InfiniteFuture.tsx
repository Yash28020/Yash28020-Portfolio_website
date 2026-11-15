import React, { useState } from 'react';
import { 
  Sparkles, Award, FileText, ExternalLink, Download, 
  Mail, Phone, Send, CheckCircle2, 
  ShieldCheck, ArrowUpRight, Flame
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { achievementsData, certificationsData } from '../data/certifications';
import { profileData } from '../data/profile';
import { soundManager } from '../utils/audio';

export const InfiniteFuture: React.FC = () => {
  const [activeCertCategory, setActiveCertCategory] = useState<string>('all');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  const categories = ['all', 'Cloud', 'Data Engineering', 'AI & ML', 'Job Simulation', 'Computer Science Core'];

  const filteredCerts = activeCertCategory === 'all' 
    ? certificationsData 
    : certificationsData.filter(c => c.category === activeCertCategory);

  const copyToClipboard = (text: string, label: string) => {
    soundManager.playClick(800);
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  return (
    <section id="future" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-amber-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-cyan-950/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass-gold border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>DIMENSION 06 // THE INFINITE FUTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-4">
            THE CELESTIAL HORIZON & RESUME VAULT
          </h2>

          <p className="max-w-2xl text-slate-400 font-mono text-sm leading-relaxed">
            An enormous futuristic temple suspended above an infinite cosmic ocean. Explore peer-reviewed research, hackathon accolades, verified cloud credentials, and engage the holographic communication portal.
          </p>
        </div>

        {/* 1. RESEARCH & HACKATHON LAURELS */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-orbitron font-bold text-white tracking-wider">
                PEER-REVIEWED RESEARCH & COMPETITIVE HONORS
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-400 uppercase">
              ACADEMIC CITADEL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementsData.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl cosmic-glass border border-amber-500/30 shadow-[0_0_35px_rgba(255,209,102,0.1)] relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-xl font-orbitron font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <div className="text-xs font-mono text-cosmic-cyan mb-4">
                    Issuer: {item.issuer}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-orbitron font-semibold text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    {item.highlightMetric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. VERIFIED CREDENTIALS & CERTIFICATIONS ARCHIVE */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cosmic-cyan uppercase">
                ACCREDITATION ARCHIVE
              </span>
              <h3 className="text-xl font-orbitron font-bold text-white tracking-wider">
                CERTIFICATIONS & SPECIALIZATIONS
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playClick(600);
                    setActiveCertCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    activeCertCategory === cat
                      ? 'bg-cosmic-cyan text-obsidian font-bold shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                      : 'text-slate-400 bg-slate-900/60 hover:text-white'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl cosmic-glass border border-slate-800 hover:border-cosmic-cyan/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-slate-700/60 uppercase">
                      {cert.badgeType}
                    </span>
                    <span className="text-[10px] font-mono text-cosmic-cyan">
                      {cert.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-orbitron font-bold text-white mb-1">
                    {cert.title}
                  </h4>
                  <div className="text-xs font-mono text-slate-400 mb-3">
                    {cert.issuer}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skillsAcquired.map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cosmic-cyan hover:text-white transition-colors"
                    >
                      <span>VERIFY CREDENTIAL</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 italic">
                      Institutional Credential
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    AUTHENTICATED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. RESUME VAULT: DOWNLOAD RESUME BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl cosmic-glass-gold border border-amber-500/40 shadow-[0_0_50px_rgba(255,209,102,0.15)] mb-16 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none">
            <FileText className="w-64 h-64 text-amber-300" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL CURRICULUM VITAE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mb-2">
                ACQUIRE YASH PRATAP SINGH&rsquo;S COMPLETE DOSSIER
              </h3>
              <p className="text-sm font-mono text-slate-300 leading-relaxed">
                Download the official comprehensive resume in PDF format, containing documented production architectures, machine learning models, published research, academic metrics (8.2 CGPA at LPU), and technical skill taxonomies.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/resume.pdf"
                download="Yash_Pratap_Singh_Resume.pdf"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-obsidian font-orbitron font-extrabold text-sm tracking-wider uppercase flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,209,102,0.6)] active:scale-95"
              >
                <Download className="w-5 h-5 text-obsidian transition-transform group-hover:-translate-y-1" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-200 font-mono text-xs tracking-wider uppercase hover:bg-amber-500/20 transition-all text-center"
              >
                PREVIEW IN BROWSER
              </a>
            </div>
          </div>
        </div>

        {/* 4. HOLOGRAPHIC COMMUNICATION PORTAL */}
        <div className="p-8 sm:p-12 rounded-3xl cosmic-glass border border-cosmic-cyan/40 shadow-[0_0_60px_rgba(0,240,255,0.15)] mb-20">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-mono tracking-widest text-cosmic-cyan uppercase mb-2">
              QUANTUM SUB-SPACE RELAY
            </span>
            <h3 className="text-2xl sm:text-4xl font-orbitron font-bold text-white tracking-wider">
              HOLOGRAPHIC COMMUNICATION PORTAL
            </h3>
            <p className="max-w-xl text-slate-400 font-mono text-xs sm:text-sm mt-2">
              Transmit signals across space and dimensions. Direct connectivity channels to Yash Pratap Singh for engineering roles, technical collaboration, and innovative ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {/* Email Relay */}
            <a
              href={`mailto:${profileData.contact.email}`}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cosmic-cyan transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
                  <Mail className="w-5 h-5 text-cosmic-cyan" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cosmic-cyan transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  DIRECT EMAIL INGRESS
                </span>
                <span className="text-xs font-mono text-white font-medium break-all block">
                  {profileData.contact.email}
                </span>
              </div>
            </a>

            {/* LinkedIn Network */}
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/30">
                  <LinkedinIcon className="w-5 h-5 text-blue-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  LINKEDIN PROFESSIONAL
                </span>
                <span className="text-xs font-mono text-white font-medium block">
                  yash-singh-
                </span>
              </div>
            </a>

            {/* GitHub Repositories */}
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30">
                  <GithubIcon className="w-5 h-5 text-purple-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  GITHUB REPOSITORY
                </span>
                <span className="text-xs font-mono text-white font-medium block">
                  Yash28020
                </span>
              </div>
            </a>

            {/* Telephonic Frequency */}
            <a
              href={`tel:${profileData.contact.phone.replace(/\s+/g, '')}`}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  VOICE FREQUENCY
                </span>
                <span className="text-xs font-mono text-white font-medium block">
                  {profileData.contact.phone}
                </span>
              </div>
            </a>
          </div>

          {/* Quick Copy Coordinates */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="text-slate-400">
              LOCATION COORDINATES: Lovely Professional University, Punjab, India
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => copyToClipboard(profileData.contact.email, 'Email')}
                className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedStatus === 'Email' ? 'COPIED!' : 'COPY EMAIL'}
              </button>
              <button
                onClick={() => copyToClipboard(profileData.contact.phone, 'Phone')}
                className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedStatus === 'Phone' ? 'COPIED!' : 'COPY PHONE'}
              </button>
            </div>
          </div>
        </div>

        {/* 5. FINAL CINEMATIC MESSAGE */}
        <div className="text-center py-16 px-4 border-t border-slate-800/80 flex flex-col items-center">
          <div className="w-16 h-1 bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-magenta rounded-full mb-8" />

          <p className="text-2xl sm:text-4xl lg:text-5xl font-cinematic font-black tracking-widest text-slate-100 uppercase mb-4 max-w-4xl leading-tight">
            &ldquo;THE UNIVERSE IS INFINITE. SO ARE THE POSSIBILITIES.&rdquo;
          </p>

          <p className="text-sm sm:text-base font-orbitron tracking-widest text-cosmic-cyan uppercase mb-8">
            &ldquo;THIS IS NOT THE END. IT IS THE BEGINNING OF ANOTHER DIMENSION.&rdquo;
          </p>

          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            ENGINEERED & ARCHITECTED BY YASH PRATAP SINGH • 6D MULTIVERSE SYSTEM
          </div>
        </div>
      </div>
    </section>
  );
};
