"use client";
import { useEffect,useRef,useState } from "react";
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
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col gap-2 px-3 py-3 md:flex-row md:items-center md:justify-between md:px-10 md:py-5">
      <div className="flex items-center justify-between md:contents">
        <div className="flex items-center gap-2 text-xs font-medium md:hidden lg:order-1 lg:flex lg:w-72 lg:text-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />{site.status}
        </div>
        <div className="flex md:order-3 md:w-72 md:justify-end">
          <a href="#contact" className="rounded-full bg-[#080808] px-4 py-2.5 text-xs font-semibold text-white md:px-6 md:py-4 md:text-sm">Let’s talk <Arrow /></a>
        </div>
      </div>
    <nav className="flex w-full justify-between overflow-x-auto rounded-full bg-white/70 p-1 shadow-lg backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-2 md:mx-0 md:w-auto md:justify-start md:gap-1 md:p-1.5">
  {NAV.map(([id, label]) => (
    <a key={id} href={`#${id}`}
      className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold transition sm:px-4 sm:text-xs md:px-5 md:text-sm ${active === id ? "bg-[#080808] text-white" : "hover:bg-black/5"}`}>
      {label}
    </a>
  ))}
</nav>
    </header>
  );
}

function PageSection({ id, title, children }) {
  return (
    <section id={id}>
      <div className="bg-[#d8d8d6] px-2 pb-4 pt-32 text-center md:pb-12 md:pt-20">
        <h2 className="hero-word" style={{ fontSize: "clamp(2rem, 7vw, 5.5rem)" }}>/{title}</h2>
      </div>
      <div className="border-t border-black/20 bg-[#ededeb] px-4 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1640px]">{children}</div>
      </div>
    </section>
  );
}
const FACES = [
  { src: "/rideeka-ba.webp", label: " Aspiring Business Analyst" },
  { src: "/rideeka-dev.webp", label: "Software Developer" },
];

function PhotoFlip() {
  const boxRef = useRef(null);
  const cvRef = useRef(null);
  const skipRef = useRef(() => {});
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const label = FACES[idx].label;

  useEffect(() => {
    const FORM = 1800, HOLD = 2000, BURST = 1000; // milliseconds
    const box = boxRef.current, cv = cvRef.current;
    const w = box.clientWidth, h = box.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = w * dpr; cv.height = h * dpr;
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const N = w < 500 ? 5000 : 8000;
    let raf, dead = false;

    const load = (src) => new Promise((res) => {
      const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src;
    });

    Promise.all(FACES.map((f) => load(f.src))).then((imgs) => {
      if (dead || imgs.some((i) => !i)) return;
      const off = document.createElement("canvas"); off.width = w; off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });

      const sets = imgs.map((im) => {
        octx.clearRect(0, 0, w, h);
        const s = Math.min(w / im.width, h / im.height), dw = im.width * s, dh = im.height * s;
        octx.drawImage(im, (w - dw) / 2, h - dh, dw, dh);
        const d = octx.getImageData(0, 0, w, h).data, pts = [];
        for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
          const i = (y * w + x) * 4;
          if (d[i + 3] > 140) pts.push([x, y, `rgb(${d[i]},${d[i + 1]},${d[i + 2]})`]);
        }
        if (!pts.length) pts.push([0, 0, "#000"]);
        for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; }
        return Array.from({ length: N }, (_, i) => pts[i % pts.length]);
      });

      const P = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, bx: 0, by: 0, k: 0.04 + Math.random() * 0.06 }));
      let cur = 0, phase = "form", t0 = performance.now();

      const startBurst = (now) => {
        phase = "burst"; t0 = now; setShown(false);
        P.forEach((p) => { p.bx = p.x + (Math.random() - 0.5) * w * 0.9; p.by = p.y + (Math.random() - 0.85) * h * 0.6; });
      };
      skipRef.current = () => { if (phase === "hold") startBurst(performance.now()); };

      const tick = (now) => {
        const dt = now - t0;
        if (phase === "form" && dt > FORM) { phase = "hold"; t0 = now; setShown(true); }
        else if (phase === "hold" && dt > HOLD) startBurst(now);
        else if (phase === "burst" && dt > BURST) { cur = (cur + 1) % FACES.length; phase = "form"; t0 = now; setIdx(cur); }

        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = phase === "burst" ? Math.max(0, 1 - dt / BURST) : phase === "form" ? Math.min(1, dt / 600) : 1;
        const set = sets[cur];
        for (let i = 0; i < N; i++) {
          const p = P[i];
          const gx = phase === "burst" ? p.bx : set[i][0];
          const gy = phase === "burst" ? p.by : set[i][1];
          p.x += (gx - p.x) * p.k; p.y += (gy - p.y) * p.k;
          ctx.fillStyle = set[i][2];
          ctx.fillRect(p.x, p.y, 2, 2);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

    return () => { dead = true; cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="order-1 flex w-full flex-col items-center lg:order-2">
      <div ref={boxRef} onClick={() => skipRef.current()} className="relative h-[22rem] w-full cursor-pointer md:h-[30rem] lg:h-[36rem]">
        <canvas
  ref={cvRef}
  className={`h-full w-full transition-opacity ${shown ? "opacity-0 duration-700" : "opacity-100 duration-100"}`}
  role="img"
  aria-label={label}
/>
        <img
          src={FACES[idx].src}
          alt={label}
          className={`pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom transition-opacity ${shown ? "opacity-100 duration-700" : "opacity-0 duration-200"}`}
        />
      </div>
      <p className="my-3 text-xs font-bold uppercase tracking-[0.25em]">{label}</p>
    </div>
  );
}


function Hero() {
  const links = [["GitHub", site.github], ["LinkedIn", site.linkedin], ["Instagram", site.instagram], ["WhatsApp", `https://wa.me/${site.whatsapp}`]];
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_55%,#f6f6f5,#d9d9d7)] px-4 pt-36 md:px-10 md:pt-36">
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
       <PhotoFlip />
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

const SERVICE_COLORS = [
  { bg: "#7f1b1b", fg: "#fff" },
  { bg: "#2b5cb0", fg: "#fff" },
  { bg: "#e8b92b", fg: "#111" },
  { bg: "#080808", fg: "#fff" },
];

function Services() {
  const boxRef = useRef(null);
  const nodeRefs = useRef([]);
  const [W, setW] = useState(0);
  const [shown, setShown] = useState(0);
  const [target, setTarget] = useState(0);
  const [open, setOpen] = useState(null);
  const ready = W > 0;

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setTarget((t) => Math.max(t, Number(e.target.dataset.i) + 1))),
      { rootMargin: "0px 0px -15% 0px" }
    );
    nodeRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [ready]);

  useEffect(() => {
    if (shown >= target) return;
    const t = setTimeout(() => setShown(shown + 1), shown === 0 ? 150 : 450);
    return () => clearTimeout(t);
  }, [shown, target]);

  const size = W < 640 ? 124 : 176;
  const gap = size * 0.78;
  const PAD = size / 2 + 24;
  const ROW = size + 64;
  const H = PAD * 2 + (services.length - 1) * ROW;
  const wide = W >= 1100;
  const CW = 300;
  const pos = services.map((_, i) => ({ x: W / 2 + (i % 2 ? gap : -gap), y: PAD + i * ROW }));

  return (
    <PageSection id="services" title="SERVICES">
      <div ref={boxRef} className="relative w-full" style={{ height: ready ? H : 600 }}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {ready && (
          <>
            <svg width={W} height={H} className="pointer-events-none absolute inset-0" aria-hidden="true">
              {pos.slice(0, -1).map((p, i) => {
                const q = pos[i + 1];
                const d = `M${p.x} ${p.y} C${p.x} ${p.y + ROW * 0.55} ${q.x} ${q.y - ROW * 0.55} ${q.x} ${q.y}`;
                return (
                  <g key={i}>
                    <mask id={`road${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                      <path d={d} fill="none" stroke="#fff" strokeWidth="6" pathLength="1" strokeDasharray="1"
                        strokeDashoffset={shown > i ? 0 : 1} style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }} />
                    </mask>
                    <path d={d} fill="none" stroke="#080808" strokeWidth="2" strokeDasharray="8 9" mask={`url(#road${i})`} />
                  </g>
                );
              })}
            </svg>

            {services.map((s, i) => {
              const p = pos[i], c = SERVICE_COLORS[i % SERVICE_COLORS.length];
              const on = open === i, vis = i < shown;
              return (
                <button key={s.name} ref={(el) => (nodeRefs.current[i] = el)} data-i={i}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
                  onClick={(e) => (e.nativeEvent.pointerType === "mouse" ? setOpen(i) : setOpen(on ? null : i))}
                  className="absolute flex flex-col items-center justify-center rounded-full border-2 border-[#080808] px-3 text-center shadow-xl"
                  style={{
                    left: p.x - size / 2, top: p.y - size / 2, width: size, height: size,
                    background: on ? c.bg : "#ededeb", color: on ? c.fg : "#080808",
                    opacity: vis ? 1 : 0, pointerEvents: vis ? "auto" : "none",
                    transform: vis
                      ? `perspective(600px) translate3d(0,0,0) rotateX(0deg) scale(${on ? 1.06 : 1})`
                      : "perspective(600px) translate3d(0,80px,-300px) rotateX(40deg) scale(1)",
                    transition: "transform .8s cubic-bezier(.2,.8,.2,1), opacity .6s, background .3s, color .3s",
                  }}>
                  <span className="font-heading text-sm font-bold leading-tight md:text-base">{s.name}</span>
                  <span className={`mt-2 text-lg transition-transform duration-300 ${on ? "rotate-90" : ""}`}><Arrow down /></span>
                </button>
              );
            })}

            {services.map((s, i) => {
              const p = pos[i];
              return (
                <div key={`card-${s.name}`} onClick={() => setOpen(null)}
                  className={`z-30 rounded-2xl bg-[#080808] p-6 text-white shadow-2xl transition-opacity duration-300 ${open === i ? "opacity-100" : "pointer-events-none opacity-0"} ${wide ? "absolute" : "fixed inset-x-3 bottom-3"}`}
                  style={wide ? { width: CW, left: i % 2 ? p.x + size / 2 + 16 : p.x - size / 2 - 16 - CW, top: p.y, transform: "translateY(-50%)" } : undefined}>
                  <p className="text-[11px] font-semibold tracking-widest text-white/50">SERVICE {String(i + 1).padStart(2, "0")}{s.learning ? " · LEARNING" : ""}</p>
                  <p className="mt-4 text-[11px] font-bold tracking-widest text-white/50">WHAT IT’S FOR</p>
                  <p className="mt-1 text-sm leading-relaxed">{s.use}</p>
                  <p className="mt-4 text-[11px] font-bold tracking-widest text-white/50">HOW I DO IT</p>
                  <p className="mt-1 text-sm leading-relaxed">{s.how}</p>
                  <p className="mt-4 text-[11px] font-bold tracking-widest text-white/50">TOOLS</p>
                  <p className="mt-1 text-sm leading-relaxed">{s.tools}</p>
                </div>
              );
            })}
          </>
        )}
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
  return (<><Loader /><Header /><main><Hero /><Projects /><Services /><Toolkit /><Contact /></main></>);
}