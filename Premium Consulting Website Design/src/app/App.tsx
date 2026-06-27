import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import ceoPhoto from "@/imports/IMG_6497.jpeg";
import {
  Menu, X, ArrowRight, ChevronRight, MapPin, Phone, Mail,
  Instagram, MessageCircle, Building2, Zap, Factory,
  HardHat, Truck, Cpu, Home as HomeIcon, Landmark, Rocket,
  Shield, Award, Users, Clock, Star, CheckCircle,
  Briefcase, FileText, Scale, Globe, Flame,
  BookOpen, Receipt, Tag,
} from "lucide-react";

/* ─── State router ─── */
type Page = "home" | "contact";
interface NavCtxType { page: Page; go: (p: Page) => void; }
const NavCtx = createContext<NavCtxType>({ page: "home", go: () => {} });
function useNav() { return useContext(NavCtx); }

function GoBtn({
  to, className, children,
}: { to: Page; className?: string; children: React.ReactNode }) {
  const { go } = useNav();
  return (
    <button onClick={() => { go(to); window.scrollTo(0, 0); }} className={className}>
      {children}
    </button>
  );
}

/* ─── Brand constants ─── */
const PHONE = "09155863177";
const EMAIL = "thebglawyer@gmail.com";
const WHATSAPP_URL = `https://wa.me/234${PHONE.replace(/^0/, "")}`;
const INSTAGRAM_URL = "https://instagram.com/bglegal.ng";
const INSTAGRAM_HANDLE = "@bglegal.ng";

const SERVICES = [
  { icon: Globe,    title: "Market Entry & Business Setup",    desc: "Navigate regulations to establish your business in new markets with confidence." },
  { icon: Building2, title: "Corporate Structuring",          desc: "Optimal legal and corporate structures tailored to your business objectives." },
  { icon: Shield,   title: "Regulatory Compliance",           desc: "Stay compliant with evolving regulatory requirements across all sectors." },
  { icon: FileText, title: "Licenses & Permits",              desc: "End-to-end management of licensing applications and permit approvals." },
  { icon: Flame,    title: "Oil & Gas Advisory",              desc: "Specialist advisory for upstream, midstream and downstream operations." },
  { icon: Scale,    title: "Legal Advisory",                  desc: "Strategic legal guidance on commercial matters and regulatory frameworks." },
  { icon: BookOpen, title: "Documentation & Applications",    desc: "Precise preparation and submission of all regulatory documentation." },
  { icon: Receipt,  title: "Tax Compliance",                  desc: "Tax planning, filing and compliance management for businesses." },
  { icon: Tag,      title: "Trademark Registration",          desc: "Protect your brand identity through comprehensive trademark services." },
  { icon: Landmark, title: "Government Approvals",            desc: "Expert representation and liaison with government agencies and ministries." },
  { icon: Briefcase, title: "Consultation & Retainer",        desc: "Ongoing advisory support through flexible retainer arrangements." },
];

const INDUSTRIES = [
  { icon: Flame,    label: "Oil & Gas" },
  { icon: Zap,      label: "Energy" },
  { icon: Factory,  label: "Manufacturing" },
  { icon: HardHat,  label: "Construction" },
  { icon: Truck,    label: "Logistics" },
  { icon: Cpu,      label: "Technology" },
  { icon: HomeIcon, label: "Real Estate" },
  { icon: Landmark, label: "Financial Services" },
  { icon: Rocket,   label: "SMEs & Startups" },
];

const WHY_CHOOSE = [
  { icon: Award, title: "Experienced Professionals", desc: "Our team brings combined experience in regulatory, legal and business advisory across multiple sectors." },
  { icon: Scale, title: "Regulatory Expertise",      desc: "Deep expertise navigating complex regulatory landscapes, government processes and compliance frameworks." },
  { icon: Users, title: "Client-Focused Service",    desc: "Every engagement is tailored to the client's specific goals, industry context and operational realities." },
  { icon: Clock, title: "Efficient Execution",       desc: "Structured processes ensure timely delivery without compromising precision or accuracy." },
];

/* ─── Design atoms ─── */
function GoldLine() {
  return <div className="w-14 h-0.5 bg-[#C9A14A]" />;
}

function Label({ children }: { children: string }) {
  return (
    <span className="text-[#C9A14A] font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase">
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
function Navbar() {
  const { page, go } = useNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = useCallback((p: Page) => { go(p); setOpen(false); window.scrollTo(0, 0); }, [go]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#08111F]/96 backdrop-blur-md border-b border-[#C9A14A]/15 shadow-[0_4px_40px_rgba(0,0,0,0.6)]" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#C9A14A] flex items-center justify-center">
              <span className="text-[#C9A14A] font-bold text-xs font-['Playfair_Display'] leading-none">BG</span>
            </div>
            <span className="text-white font-['Playfair_Display'] font-semibold text-lg tracking-wide leading-none">
              Business<span className="text-[#C9A14A]">Glove</span>
            </span>
          </button>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-9">
            {(["home", "contact"] as Page[]).map(p => (
              <button
                key={p}
                onClick={() => nav(p)}
                className={`font-['Inter'] text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                  page === p ? "text-[#C9A14A]" : "text-[#A8A8A8] hover:text-white"
                }`}
              >
                {p === "home" ? "Home" : "Contact"}
              </button>
            ))}
            <button
              onClick={() => nav("contact")}
              className="px-6 py-2.5 border border-[#C9A14A] text-[#C9A14A] font-['Inter'] text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#C9A14A] hover:text-[#08111F] transition-all duration-200"
            >
              Contact Us
            </button>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      } bg-[#07101d] border-t border-[#C9A14A]/15`}>
        <div className="px-6 py-7 flex flex-col gap-5">
          {(["home", "contact"] as Page[]).map(p => (
            <button key={p} onClick={() => nav(p)}
              className="text-left text-[#A8A8A8] hover:text-white font-['Inter'] text-[11px] tracking-[0.18em] uppercase transition-colors">
              {p === "home" ? "Home" : "Contact"}
            </button>
          ))}
          <button onClick={() => nav("contact")}
            className="mt-1 px-6 py-3 border border-[#C9A14A] text-[#C9A14A] font-['Inter'] text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#C9A14A] hover:text-[#08111F] transition-all duration-200 text-center">
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════
   HOME — HERO
═══════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#06111e]">
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06111e] via-[#08111F] to-[#050e19]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_45%,rgba(201,161,74,0.07)_0%,transparent_60%)]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 lg:pt-40 lg:pb-28">
        <div className="flex flex-col gap-7 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-7 h-px bg-[#C9A14A]" />
            <Label>Regulatory Advisory Firm</Label>
          </div>

          <h1 className="font-['Playfair_Display'] text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-bold text-white leading-[1.08] tracking-tight">
            Regulatory Compliance.{" "}
            <em className="not-italic text-[#C9A14A]">Licensing.</em>{" "}
            Business Advisory.
          </h1>

          <p className="font-['Inter'] text-[#A8A8A8] text-base lg:text-lg leading-relaxed max-w-[38rem]">
            Helping businesses, investors and entrepreneurs navigate market entry, permits, licensing and regulatory compliance across regulated industries.
          </p>

          {/* Slogan */}
          <div className="flex items-start gap-3 py-4 border-y border-[#C9A14A]/20">
            <div className="w-1 self-stretch bg-[#C9A14A] rounded-full flex-shrink-0" />
            <p className="font-['Playfair_Display'] italic text-white/80 text-base lg:text-lg leading-snug">
              "Pick the industry &amp; let BusinessGlove handle the rest."
            </p>
          </div>

          <GoBtn
            to="contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C9A14A] text-[#06111e] font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#d9b05a] transition-colors duration-200 w-fit"
          >
            Contact Us
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </GoBtn>

          {/* Stats */}
          <div className="flex gap-8 pt-1">
            {[["2+","Years Experience"],["200+","Clients Served"],["50+","Regulated Sectors"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-['Playfair_Display'] text-2xl font-bold text-[#C9A14A]">{n}</div>
                <div className="font-['Inter'] text-[10px] text-[#A8A8A8] tracking-widest mt-0.5 uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — FOUNDER PROFILE (post-hero)
═══════════════════════════════════════ */
function HeroFounder() {
  return (
    <section className="py-20 lg:py-28 bg-[#06111e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Photo */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[380px] lg:max-w-[430px]">
              <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-[#C9A14A]/70 z-10 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-[#C9A14A]/70 z-10 pointer-events-none" />
              <div className="overflow-hidden aspect-[3/4]">
                <ImageWithFallback
                  src={ceoPhoto}
                  alt="Roosevelt Ebeku — Founder & Principal Advisor, BusinessGlove"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111e]/70 via-[#06111e]/10 to-transparent" />
              </div>
              {/* ID badge */}
              <div className="absolute bottom-5 left-4 right-4 bg-[#06111e]/92 backdrop-blur-sm border border-[#C9A14A]/30 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#C9A14A] animate-pulse flex-shrink-0" />
                  <div>
                    <div className="text-white font-['Playfair_Display'] font-semibold text-sm leading-snug">Roosevelt Ebeku</div>
                    <div className="text-[#C9A14A] font-['DM_Mono'] text-[9px] tracking-[0.2em] uppercase mt-0.5">Founder &amp; Principal Advisor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <div>
              <Label>Meet the Founder</Label>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mt-4 leading-tight">
                Roosevelt Ebeku
              </h2>
              <p className="font-['DM_Mono'] text-[#C9A14A] text-[11px] tracking-[0.22em] uppercase mt-2">
                Founder &amp; Principal Advisor — BusinessGlove
              </p>
            </div>
            <GoldLine />
            <p className="font-['Inter'] text-[#A8A8A8] text-[15px] leading-[1.8]">
              Roosevelt Ebeku is the driving force behind BusinessGlove. As a qualified legal practitioner with deep expertise in business law, energy law, and regulatory compliance, he has guided entrepreneurs, investors and businesses through the complexities of Nigerian and regional regulatory environments.
            </p>
            <p className="font-['Inter'] text-[#A8A8A8] text-[15px] leading-[1.8]">
              His vision: every business owner deserves elite-level regulatory guidance — not just the biggest corporations. BusinessGlove exists to deliver exactly that.
            </p>
            <GoBtn
              to="contact"
              className="group inline-flex items-center gap-3 px-7 py-3.5 border border-[#C9A14A] text-[#C9A14A] font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#C9A14A] hover:text-[#06111e] transition-all duration-200 w-fit mt-1"
            >
              Work With Roosevelt
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </GoBtn>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — ABOUT
═══════════════════════════════════════ */
function About() {
  return (
    <section className="py-24 lg:py-32 bg-[#050d18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Photo */}
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-[#C9A14A]/50 pointer-events-none" />
            <div className="overflow-hidden aspect-[4/5] max-w-[320px] mx-auto lg:mx-0">
              <ImageWithFallback
                src={ceoPhoto}
                alt="Roosevelt Ebeku — BusinessGlove Founder"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-[#C9A14A]/50 pointer-events-none" />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-7">
            <div>
              <Label>About BusinessGlove</Label>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mt-4 leading-tight">
                Bridging Legal Requirements<br />
                and <span className="text-[#C9A14A]">Business Execution</span>
              </h2>
            </div>

            <GoldLine />

            <p className="font-['Inter'] text-[#A8A8A8] text-[15px] leading-[1.8]">
              BusinessGlove is a premium business advisory and regulatory compliance firm dedicated to helping companies, investors and entrepreneurs navigate the complexities of market entry, licensing, and operational setup.
            </p>
            <p className="font-['Inter'] text-[#A8A8A8] text-[15px] leading-[1.8]">
              We bridge the gap between legal requirements and practical business execution — ensuring regulatory obligations never become a barrier to growth. From corporate structuring and government approvals to oil &amp; gas advisory and trademark registration, we handle the complexity so you can focus on what matters.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {["Government Liaison","Regulatory Filings","Industry Compliance","Business Advisory"].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-[#C9A14A] flex-shrink-0" />
                  <span className="text-[#A8A8A8] font-['Inter'] text-sm">{item}</span>
                </div>
              ))}
            </div>

            <GoBtn
              to="contact"
              className="group inline-flex items-center gap-2.5 text-[#C9A14A] font-['Inter'] font-semibold text-[11px] tracking-[0.2em] uppercase w-fit hover:gap-4 transition-all duration-200 mt-1"
            >
              Get In Touch
              <ChevronRight size={14} />
            </GoBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — SERVICES
═══════════════════════════════════════ */
function Services() {
  return (
    <section className="py-24 lg:py-32 bg-[#08111F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <Label>What We Do</Label>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight">
            Comprehensive Advisory Services
          </h2>
          <p className="font-['Inter'] text-[#A8A8A8] text-[15px] max-w-xl mt-1">
            End-to-end regulatory and business advisory designed to keep your operations compliant and your growth unobstructed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#C9A14A]/12">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-[#08111F] p-7 flex flex-col gap-5 hover:bg-[#0b1927] transition-colors duration-300">
              <div className="w-11 h-11 border border-[#C9A14A]/30 flex items-center justify-center group-hover:border-[#C9A14A] group-hover:bg-[#C9A14A]/10 transition-all duration-300">
                <Icon size={18} className="text-[#C9A14A]" />
              </div>
              <div>
                <h3 className="font-['Playfair_Display'] font-semibold text-white text-[15px] mb-2 group-hover:text-[#C9A14A] transition-colors duration-200">{title}</h3>
                <p className="font-['Inter'] text-[#A8A8A8] text-[13px] leading-relaxed">{desc}</p>
              </div>
              <div className="h-px bg-[#C9A14A]/30 w-5 group-hover:w-10 transition-all duration-300 mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — INDUSTRIES
═══════════════════════════════════════ */
function Industries() {
  return (
    <section className="py-24 lg:py-32 bg-[#050d18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <Label>Industries We Serve</Label>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight">
            Sector Expertise
          </h2>
          <p className="font-['Inter'] text-[#A8A8A8] text-[15px] max-w-md mt-1">
            Our advisory spans regulated industries where compliance and licensing are mission-critical.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-px bg-[#C9A14A]/10">
          {INDUSTRIES.map(({ icon: Icon, label }) => (
            <div key={label} className="group bg-[#050d18] flex flex-col items-center justify-center gap-3.5 py-9 px-3 hover:bg-[#0b1927] transition-colors duration-300">
              <div className="w-12 h-12 border border-[#C9A14A]/20 flex items-center justify-center group-hover:border-[#C9A14A] group-hover:bg-[#C9A14A]/10 transition-all duration-300">
                <Icon size={20} className="text-[#C9A14A] opacity-55 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-['Inter'] text-[#A8A8A8] text-[11px] text-center leading-tight tracking-wide group-hover:text-white transition-colors">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — WHY CHOOSE
═══════════════════════════════════════ */
function WhyChoose() {
  return (
    <section className="py-24 lg:py-32 bg-[#08111F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,161,74,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <Label>Why BusinessGlove</Label>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight">
            The Difference That Matters
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="group relative border border-[#C9A14A]/15 bg-gradient-to-b from-[#0c1a2e] to-[#08111F] p-7 flex flex-col gap-5 hover:border-[#C9A14A]/45 transition-all duration-300">
              <span className="font-['DM_Mono'] text-[#C9A14A]/20 text-[3.5rem] font-bold absolute top-3 right-5 leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-12 h-12 border border-[#C9A14A]/30 flex items-center justify-center group-hover:border-[#C9A14A] group-hover:bg-[#C9A14A]/10 transition-all duration-300">
                <Icon size={20} className="text-[#C9A14A]" />
              </div>
              <div>
                <h3 className="font-['Playfair_Display'] font-semibold text-white text-[17px] mb-2.5">{title}</h3>
                <p className="font-['Inter'] text-[#A8A8A8] text-[13px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — FOUNDER SPOTLIGHT
═══════════════════════════════════════ */
function Founder() {
  const expertise = [
    "Business Law",
    "Energy Law",
    "Regulatory Compliance",
    "Corporate Advisory",
    "Market Entry Strategy",
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#050d18] relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#C9A14A]/04 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Photo */}
          <div className="lg:col-span-2 relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#C9A14A] pointer-events-none" />
            <div className="overflow-hidden aspect-[3/4]">
              <ImageWithFallback
                src={ceoPhoto}
                alt="Roosevelt Ebeku — BusinessGlove Founder"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#C9A14A] pointer-events-none" />
            <div className="absolute bottom-8 -right-3 lg:-right-6 bg-[#C9A14A] px-4 py-2.5 flex flex-col items-center gap-0.5">
              <Star size={12} className="text-[#06111e]" fill="#06111e" />
              <span className="font-['DM_Mono'] text-[#06111e] text-[9px] font-bold tracking-widest">PRINCIPAL</span>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-3 flex flex-col gap-7">
            <div>
              <Label>Founder Spotlight</Label>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mt-4 leading-tight">
                Roosevelt Ebeku
              </h2>
              <p className="font-['DM_Mono'] text-[#C9A14A] text-[11px] tracking-[0.22em] uppercase mt-2">
                Founder &amp; Principal Advisor
              </p>
            </div>

            <GoldLine />

            <p className="font-['Inter'] text-[#A8A8A8] text-[15px] leading-[1.8]">
              Roosevelt Ebeku brings a rare combination of legal training, regulatory knowledge, and entrepreneurial insight. As a qualified legal practitioner with hands-on experience across regulated industries, he has guided businesses, investors and multinationals through the complexities of Nigerian and regional regulatory environments.
            </p>
            <p className="font-['Inter'] text-[#A8A8A8] text-[15px] leading-[1.8]">
              His conviction is straightforward: every entrepreneur and investor deserves expert guidance that transforms regulatory complexity into strategic advantage. BusinessGlove was built on that belief — to be the firm founders trust when the stakes are high.
            </p>

            {/* Expertise pills */}
            <div>
              <p className="font-['DM_Mono'] text-[#C9A14A] text-[10px] tracking-[0.25em] uppercase mb-4">Areas of Expertise</p>
              <div className="flex flex-wrap gap-2.5">
                {expertise.map(e => (
                  <span key={e} className="border border-[#C9A14A]/35 px-4 py-1.5 text-[#A8A8A8] font-['Inter'] text-[12px] tracking-wide hover:border-[#C9A14A] hover:text-white transition-all duration-200">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <GoBtn
              to="contact"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#C9A14A] text-[#06111e] font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#d9b05a] transition-colors duration-200 w-fit mt-1"
            >
              Schedule a Consultation
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </GoBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOME — CTA
═══════════════════════════════════════ */
function Cta() {
  return (
    <section className="py-24 lg:py-32 bg-[#08111F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,161,74,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A14A]/35 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A14A]/35 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center gap-7">
        <Label>Take the Next Step</Label>
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight">
          Ready to Start or Scale<br />
          <span className="text-[#C9A14A]">Your Business?</span>
        </h2>
        <p className="font-['Inter'] text-[#A8A8A8] text-base max-w-xl leading-relaxed">
          Let BusinessGlove handle the regulatory and compliance process while you focus on growth.
        </p>
        <p className="font-['Playfair_Display'] italic text-white/60 text-base">
          "Pick the industry &amp; let BusinessGlove handle the rest."
        </p>
        <GoBtn
          to="contact"
          className="group inline-flex items-center gap-3 px-10 py-4 bg-[#C9A14A] text-[#06111e] font-['Inter'] font-bold text-[11px] tracking-[0.22em] uppercase hover:bg-[#d9b05a] transition-colors duration-200 mt-1"
        >
          Contact Us
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </GoBtn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  const { go } = useNav();
  const nav = (p: Page) => { go(p); window.scrollTo(0, 0); };

  return (
    <footer className="bg-[#050d18] border-t border-[#C9A14A]/12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <button onClick={() => nav("home")} className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 border border-[#C9A14A] flex items-center justify-center">
                <span className="text-[#C9A14A] font-bold text-xs font-['Playfair_Display']">BG</span>
              </div>
              <span className="text-white font-['Playfair_Display'] font-semibold text-lg">
                Business<span className="text-[#C9A14A]">Glove</span>
              </span>
            </button>
            <p className="font-['Playfair_Display'] italic text-white/55 text-sm leading-snug max-w-[260px]">
              "Pick the industry &amp; let BusinessGlove handle the rest."
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-1">
              {[
                { href: INSTAGRAM_URL, Icon: Instagram, label: "Instagram" },
                { href: WHATSAPP_URL, Icon: MessageCircle, label: "WhatsApp" },
                { href: `mailto:${EMAIL}`, Icon: Mail, label: "Email" },
                { href: `tel:${PHONE}`, Icon: Phone, label: "Phone" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 border border-[#C9A14A]/30 flex items-center justify-center text-[#A8A8A8] hover:border-[#C9A14A] hover:text-[#C9A14A] transition-all duration-200"
                  aria-label={label}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['DM_Mono'] text-[#C9A14A] text-[10px] tracking-[0.28em] uppercase mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {([["Home","home"],["Contact","contact"]] as [string, Page][]).map(([label, p]) => (
                <li key={label}>
                  <button onClick={() => nav(p)} className="font-['Inter'] text-[#A8A8A8] text-sm hover:text-white transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['DM_Mono'] text-[#C9A14A] text-[10px] tracking-[0.28em] uppercase mb-5">Contact</h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-[#A8A8A8] hover:text-white transition-colors group">
                  <Mail size={13} className="text-[#C9A14A] flex-shrink-0" />
                  <span className="font-['Inter'] text-sm group-hover:text-white transition-colors">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-2.5 text-[#A8A8A8] hover:text-white transition-colors group">
                  <Phone size={13} className="text-[#C9A14A] flex-shrink-0" />
                  <span className="font-['Inter'] text-sm">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-[#A8A8A8] hover:text-white transition-colors group">
                  <MessageCircle size={13} className="text-[#C9A14A] flex-shrink-0" />
                  <span className="font-['Inter'] text-sm">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-[#A8A8A8] hover:text-white transition-colors group">
                  <Instagram size={13} className="text-[#C9A14A] flex-shrink-0" />
                  <span className="font-['Inter'] text-sm">{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-[#C9A14A]/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-['DM_Mono'] text-[#A8A8A8]/40 text-[10px] tracking-widest">
            © {new Date().getFullYear()} BusinessGlove. All rights reserved.
          </p>
          <p className="font-['DM_Mono'] text-[#A8A8A8]/40 text-[10px] tracking-widest">
            Regulatory · Compliance · Advisory
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
function HomePage() {
  return (
    <main>
      <Hero />
      <HeroFounder />
      <About />
      <Services />
      <Industries />
      <WhyChoose />
      <Founder />
      <Cta />
    </main>
  );
}

/* ═══════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════ */
function ContactPage() {
  return (
    <main className="min-h-screen bg-[#08111F]">
      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#050d18] to-[#08111F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_30%_50%,rgba(201,161,74,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center gap-6">
          <Label>Get In Touch</Label>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight">
            {"Let's Discuss Your"}<br />
            <span className="text-[#C9A14A]">Business Needs</span>
          </h1>
          <GoldLine />
          <p className="font-['Inter'] text-[#A8A8A8] text-base leading-relaxed max-w-xl">
            Contact BusinessGlove for licensing, compliance, regulatory approvals, market entry and business advisory services.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="pb-28 px-6 lg:px-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">

          {/* Slogan stripe */}
          <div className="border-l-2 border-[#C9A14A] pl-5 py-1 mb-4">
            <p className="font-['Playfair_Display'] italic text-white/60 text-base">
              "Pick the industry &amp; let BusinessGlove handle the rest."
            </p>
          </div>

          {[
            {
              href: `mailto:${EMAIL}`,
              Icon: Mail,
              label: "Email Us",
              value: EMAIL,
              sub: "Send us a message anytime",
              external: false,
            },
            {
              href: `tel:${PHONE}`,
              Icon: Phone,
              label: "Call Us",
              value: PHONE,
              sub: "Speak with Roosevelt directly",
              external: false,
            },
            {
              href: WHATSAPP_URL,
              Icon: MessageCircle,
              label: "WhatsApp",
              value: PHONE,
              sub: "Chat with us on WhatsApp",
              external: true,
            },
            {
              href: INSTAGRAM_URL,
              Icon: Instagram,
              label: "Instagram",
              value: INSTAGRAM_HANDLE,
              sub: "Follow BusinessGlove updates",
              external: true,
            },
          ].map(({ href, Icon, label, value, sub, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex items-center gap-5 border border-[#C9A14A]/18 bg-[#0b1927] px-6 py-5 hover:border-[#C9A14A]/55 hover:bg-[#0f2038] transition-all duration-200"
            >
              <div className="w-13 h-13 w-12 h-12 border border-[#C9A14A]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A14A] group-hover:bg-[#C9A14A]/10 transition-all duration-200">
                <Icon size={20} className="text-[#C9A14A]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-['DM_Mono'] text-[#C9A14A] text-[10px] tracking-[0.25em] uppercase mb-0.5">{label}</div>
                <div className="font-['Playfair_Display'] text-white font-semibold text-base truncate">{value}</div>
                <div className="font-['Inter'] text-[#A8A8A8] text-xs mt-0.5">{sub}</div>
              </div>
              <ChevronRight size={16} className="text-[#C9A14A] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}

          {/* Bottom note */}
          <div className="mt-6 text-center">
            <p className="font-['Inter'] text-[#A8A8A8]/60 text-[13px] leading-relaxed">
              BusinessGlove responds to all enquiries within 24 hours.<br />
              Roosevelt Ebeku — Founder &amp; Principal Advisor
            </p>
            <div className="flex items-center gap-2 justify-center mt-3">
              <MapPin size={12} className="text-[#C9A14A]" />
              <span className="font-['DM_Mono'] text-[#A8A8A8]/50 text-[10px] tracking-widest uppercase">Abuja, Nigeria</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <NavCtx.Provider value={{ page, go: setPage }}>
      <div className="min-h-screen bg-[#08111F]">
        <Navbar />
        {page === "home" ? <HomePage /> : <ContactPage />}
        <Footer />
      </div>
    </NavCtx.Provider>
  );
}
