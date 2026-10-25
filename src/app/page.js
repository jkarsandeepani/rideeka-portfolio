"use client";
import { useEffect, useState } from "react";
import { site, projects, services, toolkit } from "@/data/content";

const NAV = [["home", "Home"], ["projects", "Projects"], ["services", "Services"], ["toolkit", "Toolkit"], ["contact", "Contact"]];
const STATUS = {
  done: { label: "Completed", color: "#7f1b1b", text: "#fff" },
  progress: { label: "In development", color: "#2b5cb0", text: "#fff" },
  req: { label: "Requirements gathering", color: "#e8b92b", text: "#111" },
};
function Arrow({ down = false }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-[-0.125em]">
      {down ? <path d="M7 7l10 10M17 8v9H8" /> : <path d="M7 17L17 7M8 7h9v9" />}
    </svg>
  );
}
const GREETINGS = [
  { text: "ආයුබෝවන්", font: "'Noto Sans Sinhala', sans-serif" },
  { text: "Hello" },
  { text: "नमस्ते", font: "'Noto Sans Devanagari', sans-serif" },
  { text: "Bonjour" },
  { text: "Hola" },
  { text: "こんにちは", font: "'Noto Sans JP', sans-serif" },
];

function Loader() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (i < GREETINGS.length - 1) {
      const t = setTimeout(() => setI(i + 1), i === 0 ? 900 : 550);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setDone(true), 700);
    const t2 = setTimeout(() => {
      setGone(true);
      document.body.style.overflow = "";
    }, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [i]);

  if (gone) return null;
  const g = GREETINGS[i];
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] px-4 text-white transition-transform duration-700 ease-in-out ${done ? "-translate-y-full" : ""}`}>
      <p key={i} className="greet font-heading text-5xl font-extrabold md:text-8xl" style={g.font ? { fontFamily: g.font } : undefined}>
        {g.text}
      </p>
    </div>
  );
}
function Header() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center px-3 py-3 md:justify-between md:px-10 md:py-5">
      <div className="hidden w-72 items-center gap-2 text-sm font-medium lg:flex">
        <span className="h-3 w-3 rounded-full bg-green-500" />{site.status}
      </div>
      <nav className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/70 p-1.5 shadow-lg backdrop-blur">
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition md:px-5 md:text-sm ${active === id ? "bg-[#080808] text-white" : "hover:bg-black/5"}`}>
            {label}
          </a>
        ))}
      </nav>
      <div className="hidden w-72 justify-end md:flex">
        <a href="#contact" className="rounded-full bg-[#080808] px-6 py-4 text-sm font-semibold text-white">Let’s talk <Arrow /></a>
      </div>
    </header>
  );
}

function PageSection({ id, title, children }) {
  return (
    <section id={id}>
      <div className="bg-[#d8d8d6] px-2 pb-4 pt-24 text-center md:pb-12 md:pt-20">
        <h2 className="hero-word" style={{ fontSize: "clamp(2rem, 7vw, 5.5rem)" }}>/{title}</h2>
      </div>
      <div className="border-t border-black/20 bg-[#ededeb] px-4 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1640px]">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  const links = [["GitHub", site.github], ["LinkedIn", site.linkedin], ["Instagram", site.instagram], ["WhatsApp", `https://wa.me/${site.whatsapp}`]];
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_55%,#f6f6f5,#d9d9d7)] px-4 pt-28 md:px-10 md:pt-36">
      <h1 className="font-heading flex flex-wrap items-center justify-center gap-x-4 text-center font-black leading-none" style={{ fontSize: "clamp(2.6rem,10.5vw,10rem)", letterSpacing: "-0.06em" }}>
        <span className="outline-text">{site.first}</span>
        <span className="text-[0.5em]">›</span>
        <span>{site.last}</span>
      </h1>
      <div className="mx-auto mt-auto grid w-full max-w-[1640px] items-end gap-10 pt-10 lg:grid-cols-3">
        <div className="order-2 pb-12 lg:order-1">
          <p className="mb-6 text-xs font-bold tracking-[0.25em] text-black/60">WHAT I DO</p>
          <ul>
            {site.whatIDo.map((t) => (
              <li key={t} className="flex items-center gap-4 border-b border-black/20 py-4 text-lg font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />{t}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 flex h-[22rem] items-end justify-center md:h-[30rem] lg:order-2 lg:h-[36rem]">
          <img src="/rideeka.png" alt={`${site.first} ${site.last}`} className="h-full w-auto max-w-full object-contain object-bottom" onError={(e) => (e.currentTarget.style.display = "none")} />
        </div>
        <div className="order-3 pb-12 lg:w-72 lg:justify-self-end">
          <p className="mb-6 text-xs font-bold tracking-[0.25em] text-black/60">FIND ME ONLINE</p>
          <div className="space-y-3">
            {links.map(([n, u]) => (
              <a key={n} href={u} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg bg-[#080808] px-5 py-4 text-sm font-semibold text-white">
                {n}<span><Arrow /></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Robot() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V5M9 13h.01M15 13h.01M9 16h6" />
    </svg>
  );
}

function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <PageSection id="projects" title="PROJECTS">
      <div onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}>
        {projects.map((p, i) => {
          const s = STATUS[p.status];
          const on = open === i;
          return (
            <div key={p.name} className="relative border-t border-black/20 last:border-b" onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}>
              <button onClick={(e) => (e.nativeEvent.pointerType === "mouse" ? setOpen(i) : setOpen(on ? null : i))}
                className="flex w-full items-center gap-4 border-l-[6px] py-6 pl-4 text-left md:gap-10 md:py-9 md:pl-8" style={{ borderColor: s.color }}>
                <span className="w-6 text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-heading flex-1 text-2xl font-extrabold md:text-5xl">{p.name}</span>
                <span className="hidden text-xs font-bold uppercase tracking-widest sm:block">{s.label}</span>
                <span className="pr-3 text-xl md:pr-12"><Arrow /></span>
              </button>
              <div style={{ background: s.color, color: s.text }}
                className={`z-20 mb-4 flex flex-col justify-between overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 lg:absolute lg:right-24 lg:top-1/2 lg:mb-0 lg:min-h-[400px] lg:w-[430px] lg:-translate-y-1/2 ${on ? "flex scale-100 opacity-100" : "hidden lg:flex lg:pointer-events-none lg:scale-90 lg:opacity-0"}`}>
                <div className="flex items-start justify-between border-b border-current/30 p-6">
                  <div><Robot /><p className="mt-2 text-sm font-bold">{p.type}</p></div>
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white">Live demo <Arrow /></a>}
                </div>
                <div className="p-6">
                  <p className="mb-8 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                  <h3 className="font-heading text-4xl font-black tracking-tight md:text-5xl">{p.name}</h3>
                  <p className="mt-3 text-sm opacity-90">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => <span key={t} className="rounded-full border border-current px-3 py-1.5 text-xs font-bold uppercase">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-semibold">
        {Object.values(STATUS).map((s) => (
          <span key={s.label} className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{ background: s.color }} />{s.label.split(" ")[0] === "Requirements" ? "Requirements" : s.label}</span>
        ))}
      </div>
    </PageSection>
  );
}

function Services() {
  const [open, setOpen] = useState(null);
  return (
    <PageSection id="services" title="SERVICES">
      <div className="space-y-3">
        {services.map((s, i) => {
          const on = open === i;
          return (
            <div key={s.name} className="overflow-hidden rounded-2xl bg-[#080808] text-white">
              <button onClick={() => setOpen(on ? null : i)} className="flex w-full items-center gap-4 px-4 py-2 text-left md:gap-8 md:px-8 md:py-3">
                <span className="w-6 text-xs text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-heading flex-1 text-2xl font-extrabold md:text-4xl">
                  {s.name}
                  {s.learning && <span className="ml-3 rounded-full border border-white/40 px-3 py-1 align-middle text-[10px] font-semibold uppercase tracking-widest">Learning</span>}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${on ? "-rotate-90" : ""}`}><Arrow down /></span>
              </button>
              <div className={`grid transition-all duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 px-5 pb-8 md:grid-cols-3 md:px-24">
                    {[["What I use it for", s.use], ["How I do it", s.how], ["Tools", s.tools]].map(([h, t]) => (
                      <div key={h}><p className="mb-2 text-xs font-bold tracking-widest text-white/50">{h}</p><p className="text-sm leading-relaxed">{t}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}

function Toolkit() {
  return (
    <PageSection id="toolkit" title="TOOLKIT">
      <div className="space-y-12">
        {toolkit.map((g) => (
          <div key={g.group}>
            <h3 className="mb-5 border-b border-black/20 pb-3 text-sm font-bold tracking-widest text-black/60">{g.group}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {g.items.map((t) => (
               <div key={t.name} className="flex flex-col items-center gap-3 p-3">
                  <img src={t.icon} alt={t.name} className="h-12 w-12 object-contain" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
                  <span className="text-sm font-semibold">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function Contact() {
  const links = [["Gmail", `mailto:${site.email}`], ["WhatsApp", `https://wa.me/${site.whatsapp}`], ["LinkedIn", site.linkedin]];
  return (
    <PageSection id="contact" title="CONTACT">
      <div className="flex flex-col items-center gap-12 py-6 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          {links.map(([n, u]) => (
            <a key={n} href={u} target="_blank" rel="noreferrer" className="rounded-full bg-[#080808] px-8 py-4 font-semibold text-white transition hover:scale-105">{n} <Arrow /></a>
          ))}
        </div>
        <p className="font-heading text-3xl font-extrabold md:text-6xl">{"</ let’s build something together>"}</p>
        <p className="text-xs text-black/50">© {new Date().getFullYear()} {site.first} {site.last}</p>
      </div>
    </PageSection>
  );
}

export default function Page() {
  return (<><Header /><main><Hero /><Projects /><Services /><Toolkit /><Contact /></main></>);
}