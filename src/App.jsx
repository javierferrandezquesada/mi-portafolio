import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  MapPin,
  ArrowUpRight,
  Terminal,
  Code2,
  Braces,
  Palette,
  Boxes,
  GitBranch,
  Server,
  FileSpreadsheet,
  ShoppingBag,
  LayoutTemplate,
  Users2,
  Sparkles,
  CircleDot,
  ChevronRight,
  CheckCircle2,
  Cookie,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "habilidades", label: "Habilidades" },
  { id: "experiencia", label: "Experiencia" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];

const SKILLS = [
  {
    group: "Frontend",
    icon: Code2,
    items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    group: "CMS & E-commerce",
    icon: ShoppingBag,
    items: ["WordPress", "Shopify", "PrestaShop"],
  },
  {
    group: "Herramientas & Sistemas",
    icon: Server,
    items: ["Git", "GitHub", "Active Directory", "Excel"],
  },
];

const EXPERIENCE = [
  {
    range: "05/2026 — 05/2026",
    role: "Programador Web",
    org: "Roberto Berná Larrosa",
    desc: "Maquetación y desarrollo de una aplicación web interactiva con React, de principio a fin, en colaboración directa con el cliente.",
  },
  {
    range: "03/2025 — 06/2025",
    role: "Técnico de Soporte Informático y Sistemas",
    org: "Hospital General de Elche",
    desc: "Atención al usuario, administración de Active Directory y gestión de datos en un entorno crítico y de alta exigencia.",
  },
];

const EDUCATION = [
  {
    range: "09/2025 — Actual",
    title: "Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
    org: "EFA El Campico · Jacarilla, Alicante",
    current: true,
  },
  {
    range: "09/2023 — 06/2025",
    title: "Grado Medio en Sistemas Microinformáticos y Redes (SMR)",
    org: "EFA El Campico · Jacarilla, Alicante",
    current: false,
  },
];

const HERO_BADGES = ["React", "Tailwind", "JavaScript", "Git"];

/* ------------------------------------------------------------------ */
/* SMALL PRIMITIVES                                                   */
/* ------------------------------------------------------------------ */

function Eyebrow({ index, label }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[13px] text-cyan-400/80 mb-4">
      <span className="text-slate-600">//</span>
      <span className="text-slate-500">{index}</span>
      <span className="text-slate-600">—</span>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ index, eyebrow, title, sub }) {
  return (
    <header className="mb-14 max-w-2xl">
      <Eyebrow index={index} label={eyebrow} />
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100">
        {title}
      </h2>
      {sub && <p className="mt-4 text-slate-400 leading-relaxed">{sub}</p>}
    </header>
  );
}

function Reveal({ children, delay = 0, className = "", y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* NAVBAR                                                             */
/* ------------------------------------------------------------------ */

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100%-1.5rem)]"
    >
      <div
        className={`flex h-12 items-center justify-between gap-4 sm:gap-6 rounded-2xl border border-white/10 px-4 sm:px-5 backdrop-blur-xl transition-colors ${
          scrolled ? "bg-slate-950/80" : "bg-slate-950/50"
        }`}
      >
        <button
          onClick={() => scrollTo("inicio")}
          aria-label="Ir al inicio del portafolio"
          className="flex items-center gap-2 font-mono text-xs text-slate-200 shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shrink-0">
            <Terminal size={14} aria-hidden="true" />
          </span>
          <span>
            javierferrandez<span className="text-cyan-400">.</span>dev
          </span>
        </button>

        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "text-cyan-300"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-cyan-400"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => scrollTo("contacto")}
            className="text-sm font-medium px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:brightness-110 transition-all shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)]"
          >
            Contactar
          </button>
        </div>

        <button
          className="lg:hidden text-slate-300 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl"
          >
            <nav aria-label="Navegación móvil" className="flex flex-col p-2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  aria-current={active === l.id ? "page" : undefined}
                  className="text-left px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-300 rounded-lg hover:bg-white/5"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contacto")}
                className="mt-1 text-sm font-medium px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"
              >
                Contactar
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const [typed, setTyped] = useState("");
  const full = "desarrollador.frontend()";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="inicio"
      aria-label="Presentación principal"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto w-full grid gap-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-cyan-400 text-sm flex items-center gap-2"
        >
          <CircleDot size={14} className="animate-pulse" aria-hidden="true" />
          <span>Hola, soy Javier 👋</span>
        </motion.p>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-semibold tracking-tight text-slate-100"
          >
            <span className="sr-only">Javier Ferrández — Programador Web. </span>
            Construyo interfaces
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              limpias, rápidas y humanas.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-xl text-slate-400 text-lg leading-relaxed"
          >
            Desarrollador Web Frontend y estudiante de DAM, especializado en
            React y Tailwind CSS. Combino atención al detalle con soltura
            técnica para dar vida a productos digitales sólidos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() =>
                document
                  .getElementById("contacto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-medium hover:brightness-110 transition-all shadow-[0_0_30px_-8px_rgba(34,211,238,0.7)]"
            >
              Contactar
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            aria-label="Tecnologías destacadas"
            className="mt-10 flex flex-wrap gap-2"
          >
            {HERO_BADGES.map((b) => (
              <li
                key={b}
                className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-400 bg-white/[0.03]"
              >
                {b}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          aria-hidden="true"
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm overflow-hidden shadow-2xl select-none"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-slate-900/80">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-xs text-slate-500">
              javier@portfolio ~
            </span>
          </div>
          <div className="p-5 font-mono text-sm leading-7">
            <p className="text-slate-500">$ whoami</p>
            <p className="text-slate-300">
              Javier Ferrández Quesada — Cox, Alicante
            </p>
            <p className="text-slate-500 mt-2">$ node</p>
            <p className="text-slate-300">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-cyan-300">javier</span> = new{" "}
              <span className="text-cyan-400">{typed}</span>
              <span className="animate-pulse text-cyan-400">|</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ABOUT                                                               */
/* ------------------------------------------------------------------ */

function About() {
  const points = [
    {
      icon: Sparkles,
      title: "Aprendizaje rápido",
      desc: "Me adapto con rapidez a nuevas tecnologías, frameworks y flujos de trabajo.",
    },
    {
      icon: CheckCircle2,
      title: "Actitud resolutiva",
      desc: "Afronto los problemas con calma y método, buscando siempre la solución más limpia.",
    },
    {
      icon: Users2,
      title: "Trabajo en equipo",
      desc: "Me comunico con claridad y colaboro bien tanto con perfiles técnicos como no técnicos.",
    },
  ];

  return (
    <section id="sobre-mi" aria-label="Sobre mí" className="px-6 py-28 sm:py-36">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* Columna izquierda: Título + Textos */}
          <Reveal className="md:col-span-3">
            <SectionHeading
              index="01"
              eyebrow="sobre-mí"
              title="De la sala de soporte al código en producción."
            />
            <div className="space-y-5 -mt-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Soy un desarrollador web joven, cercano y con muchas ganas de
                seguir creciendo. Mi camino empezó en el soporte de sistemas —
                lidiando con usuarios, redes y Active Directory — y hoy se
                centra en construir páginas web modernas.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Esa mezcla me da una ventaja poco habitual: entiendo tanto la
                lógica detrás de un sistema como la experiencia de quien lo usa
                en pantalla. Actualmente compagino esta pasión con mis estudios
                de DAM, siempre con un proyecto entre manos.
              </p>
            </div>
          </Reveal>

          {/* Columna derecha: Bloques de puntos fuertes */}
          <ul className="md:col-span-2 grid gap-4 md:pt-8">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={0.15 + i * 0.08}>
                <li className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors">
                  <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                    <p.icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-slate-100 font-medium">{p.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SKILLS                                                              */
/* ------------------------------------------------------------------ */

const ICONS_MAP = {
  React: Braces,
  JavaScript: Braces,
  HTML5: Code2,
  CSS3: Palette,
  "Tailwind CSS": Palette,
  WordPress: LayoutTemplate,
  Shopify: ShoppingBag,
  PrestaShop: ShoppingBag,
  Git: GitBranch,
  GitHub: Github,
  "Active Directory": Server,
  Excel: FileSpreadsheet,
};

function Skills() {
  return (
    <section id="habilidades" aria-label="Habilidades técnicas" className="px-6 py-28 sm:py-36 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="habilidades"
            title="Mi caja de herramientas."
            sub="Tecnologías y sistemas con los que trabajo a diario, desde la interfaz hasta la infraestructura básica que la sostiene."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {SKILLS.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full rounded-2xl border border-white/10 bg-slate-900/40 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/20">
                    <group.icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="text-slate-100 font-medium">{group.group}</h3>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label={`Tecnologías de ${group.group}`}>
                  {group.items.map((item) => {
                    const Icon = ICONS_MAP[item] || Boxes;
                    return (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
                      >
                        <Icon size={12} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROJECTS (en desarrollo)                                            */
/* ------------------------------------------------------------------ */

function ProjectsSoon() {
  return (
    <section id="proyectos" aria-label="Proyectos" className="px-6 py-28 sm:py-36">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Eyebrow index="—" label="proyectos" />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-10 sm:p-14 text-center">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="relative flex flex-col items-center gap-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                <Boxes size={24} aria-hidden="true" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100">
                Proyectos en desarrollo
              </h2>
              <p className="max-w-md text-slate-400 leading-relaxed">
                Estoy construyendo varias aplicaciones web para
                publicarlas próximamente en mi GitHub. Vuelve pronto o sígueme
                para no perderte las novedades.
              </p>
              <a
                href="https://github.com/javierferrandezquesada"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-medium hover:brightness-110 transition-all"
              >
                <Github size={16} aria-hidden="true" />
                <span>Ver perfil de GitHub</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TIMELINE                                                           */
/* ------------------------------------------------------------------ */

function Timeline({ items, renderItem }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-white/10 to-transparent" />
      <ol className="grid gap-10">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <li className="relative">
              <span className="absolute -left-[35px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-cyan-400" />
              {renderItem(item)}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function Experience() {
  return (
    <section id="experiencia" aria-label="Experiencia laboral" className="px-6 py-28 sm:py-36 bg-white/[0.015]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="experiencia"
            title="Trayectoria profesional."
          />
        </Reveal>
        <Timeline
          items={EXPERIENCE}
          renderItem={(item) => (
            <article className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-cyan-400/30 transition-colors">
              <span className="font-mono text-xs text-cyan-400">
                {item.range}
              </span>
              <h3 className="mt-2 text-slate-100 font-medium">{item.role}</h3>
              <p className="text-sm text-slate-500">{item.org}</p>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </article>
          )}
        />
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="formacion" aria-label="Formación académica" className="px-6 py-28 sm:py-36">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="formación"
            title="Educación y formación."
          />
        </Reveal>
        <Timeline
          items={EDUCATION}
          renderItem={(item) => (
            <article className="rounded-xl border border-white/10 bg-slate-900/40 p-5 hover:border-cyan-400/30 transition-colors">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-cyan-400">
                  {item.range}
                </span>
                {item.current && (
                  <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                    En curso
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-slate-100 font-medium">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.org}</p>
            </article>
          )}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CONTACT                                                             */
/* ------------------------------------------------------------------ */

function Contact({ onOpenLegal }) {
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const FORMSPREE_CODE = "mrenoone";

  const submit = async (e) => {
    e.preventDefault();
    if (!accepted || loading) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_CODE}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
      } else {
        alert("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión al enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" aria-label="Contacto" className="px-6 py-28 sm:py-36 bg-white/[0.015]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="contacto"
            title="Hablemos de tu próximo proyecto."
            sub="¿Tienes una idea, una oferta o simplemente quieres saludar? Escríbeme, respondo lo antes posible."
          />
        </Reveal>

        <div className="grid md:grid-cols-5 gap-8">
          <Reveal className="md:col-span-2 grid gap-4 content-start" delay={0.1}>
            <address className="not-italic grid gap-4">
              <a
                href="mailto:javierferrandezquesada@gmail.com"
                aria-label="Enviar correo electrónico a javierferrandezquesada@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:border-cyan-400/30 transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block text-sm text-slate-500">Email</span>
                  <span className="block text-slate-200 text-sm truncate">
                    javierferrandezquesada@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-sm text-slate-500">Ubicación</span>
                  <span className="block text-slate-200 text-sm">Cox, Alicante (España)</span>
                </div>
              </div>

              <a
                href="https://github.com/javierferrandezquesada"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar el perfil de GitHub de Javier Ferrández"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:border-cyan-400/30 transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0">
                  <Github size={18} aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-sm text-slate-500">GitHub</span>
                  <span className="block text-slate-200 text-sm">
                    @javierferrandezquesada
                  </span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/tu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar el perfil de LinkedIn de Javier Ferrández"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:border-cyan-400/30 transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0">
                  <Linkedin size={18} aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-sm text-slate-500">LinkedIn</span>
                  <span className="block text-slate-200 text-sm">Perfil profesional</span>
                </div>
              </a>
            </address>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.18}>
            <form
              onSubmit={submit}
              aria-label="Formulario de contacto"
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 grid gap-4"
            >
              {sent ? (
                <div role="status" aria-live="polite" className="flex flex-col items-center justify-center text-center gap-3 py-10">
                  <CheckCircle2 className="text-emerald-400" size={36} aria-hidden="true" />
                  <p className="text-slate-100 font-medium">
                    ¡Mensaje enviado!
                  </p>
                  <p className="text-sm text-slate-500">
                    Gracias por escribir, te responderé lo antes posible.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs text-slate-500 mb-1.5 block">
                        Nombre
                      </label>
                      <input
                        required
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-xs text-slate-500 mb-1.5 block">
                        Email
                      </label>
                      <input
                        required
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-xs text-slate-500 mb-1.5 block">
                      Mensaje
                    </label>
                    <textarea
                      required
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Cuéntame en qué puedo ayudarte..."
                      className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="contact-privacy"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan-400 cursor-pointer"
                    />
                    <label htmlFor="contact-privacy" className="text-xs text-slate-500 cursor-pointer select-none">
                      Acepto la{" "}
                      <button
                        type="button"
                        onClick={() => onOpenLegal("privacidad")}
                        className="text-cyan-400 hover:underline inline"
                      >
                        Política de Privacidad
                      </button>{" "}
                      y el tratamiento de mis datos personales conforme al
                      RGPD.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!accepted || loading}
                    className="justify-self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-medium hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <span>{loading ? "Enviando..." : "Enviar mensaje"}</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* LEGAL MODAL                                                        */
/* ------------------------------------------------------------------ */

const LEGAL_CONTENT = {
  privacidad: {
    title: "Política de Privacidad",
    body: `De acuerdo con el Reglamento General de Protección de Datos (RGPD - UE 2016/679), Javier Ferrández Quesada informa que los datos personales facilitados a través del formulario de contacto serán tratados con la única finalidad de responder a tus consultas o propuestas.

No se cederán datos a terceros salvo obligación legal. Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a javierferrandezquesada@gmail.com.

Los datos se conservarán el tiempo necesario para atender tu solicitud y no se utilizarán para fines distintos a los indicados.`,
  },
  legal: {
    title: "Aviso Legal",
    body: `Este sitio web es un portafolio personal de carácter profesional, propiedad de Javier Ferrández Quesada, con domicilio en Cox, Alicante (España).

El acceso y uso de este sitio atribuye la condición de usuario e implica la aceptación de las condiciones aquí descritas. Todo el contenido (textos, código, diseño) es de uso personal y demostrativo, salvo que se indique lo contrario.

Para cualquier consulta relacionada con el contenido de este sitio, puedes contactar en javierferrandezquesada@gmail.com.`,
  },
};

function LegalModal({ type, onClose }) {
  if (!type) return null;
  const content = LEGAL_CONTENT[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 id="legal-modal-title" className="text-lg font-semibold text-slate-100">
              {content.title}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-200 shrink-0 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              aria-label="Cerrar ventana modal"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
            {content.body}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* FOOTER                                                              */
/* ------------------------------------------------------------------ */

function Footer({ onOpenLegal }) {
  return (
    <footer className="px-6 py-10 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>
          © {new Date().getFullYear()} Javier Ferrández Quesada. Diseñado y
          desarrollado con React &amp; Tailwind CSS.
        </p>
        <nav aria-label="Enlaces legales" className="flex items-center gap-5">
          <button
            onClick={() => onOpenLegal("privacidad")}
            className="hover:text-cyan-400 transition-colors"
          >
            Política de Privacidad
          </button>
          <button
            onClick={() => onOpenLegal("legal")}
            className="hover:text-cyan-400 transition-colors"
          >
            Aviso Legal
          </button>
        </nav>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* COOKIE BANNER                                                      */
/* ------------------------------------------------------------------ */

function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
        role="region"
        aria-label="Aviso de cookies"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1.5rem)] sm:w-auto"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl px-5 py-4 shadow-2xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0">
            <Cookie size={16} aria-hidden="true" />
          </span>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Este sitio utiliza cookies propias para mejorar tu experiencia de
            navegación. Al continuar, aceptas su uso.
          </p>
          <button
            onClick={() => setVisible(false)}
            className="shrink-0 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:brightness-110 transition-all"
          >
            Aceptar
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Componentes de iconos de marca (SVG)
function Github({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* APP                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [active, setActive] = useState("inicio");
  const [legalOpen, setLegalOpen] = useState(null);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-cyan-400/20 selection:text-cyan-200 relative">
      {/* Fondo con resplandores ambientales suaves */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[160px]" />
        <div className="absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full bg-cyan-600/5 blur-[160px]" />
      </div>

      <Navbar active={active} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <ProjectsSoon />
        <Experience />
        <Education />
        <Contact onOpenLegal={setLegalOpen} />
      </main>

      <Footer onOpenLegal={setLegalOpen} />
      <CookieBanner />
      <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />
    </div>
  );
}
