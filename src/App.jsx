import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Minus,
  X,
  Menu,
  Instagram,
  Code2,
  Layers3,
  Zap,
  MessageCircle,
} from "lucide-react";
const DeviceScene = lazy(() => import("./DeviceScene.jsx"));
const instagramUrl = "https://www.instagram.com/cliffcodedev/";
const whatsappNumber = (
  import.meta.env.VITE_WHATSAPP_NUMBER || "5585991385292"
).replace(/\D/g, "");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, CliffCode! Quero conversar sobre um site para o meu negócio.")}`;
const templates = [
  {
    id: "forma",
    category: "ARQUITETURA & INTERIORES",
    name: "Forma Studio",
    type: "Institucional",
    tone: "architecture",
    title: "Espaços para\nviver melhor.",
    description:
      "Design que encontra propósito. Arquitetura que transforma a maneira de viver.",
  },
  {
    id: "soma",
    category: "SAÚDE & BEM-ESTAR",
    name: "Soma Care",
    type: "Landing page",
    tone: "wellness",
    title: "O seu equilíbrio\ncomeça aqui.",
    description:
      "Um novo olhar para o seu bem-estar. Cuidado que respeita o seu tempo.",
  },
  {
    id: "otto",
    category: "GASTRONOMIA & EXPERIÊNCIAS",
    name: "Otto Café",
    type: "Institucional",
    tone: "coffee",
    title: "Feito devagar.\nVivido intensamente.",
    description:
      "Bons encontros começam com um café. Conheça uma nova pausa no seu dia.",
  },
];
function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="CliffCode início">
      <span className="brand-crop">
        <img
          src={`${import.meta.env.BASE_URL}brand/variante.png`}
          alt="CliffCode"
        />
      </span>
    </a>
  );
}
function TemplateArtwork({ template, large = false }) {
  return (
    <div className={`template-art ${template.tone} ${large ? "large" : ""}`}>
      <div className="mock-nav">
        <b>
          {template.id === "forma"
            ? "forma."
            : template.id === "soma"
              ? "soma ✳"
              : "otto®"}
        </b>
        <span>Sobre &nbsp;&nbsp; Experiências &nbsp;&nbsp; ↗</span>
      </div>
      <div className="mock-copy">
        <small>
          {template.id === "forma"
            ? "ARQUITETURA COM PROPÓSITO"
            : template.id === "soma"
              ? "O TEMPO É SEU. O CUIDADO TAMBÉM."
              : "CAFÉ, COM CALMA."}
        </small>
        <h3>{template.title}</h3>
        <span className="mock-button">
          {template.id === "forma"
            ? "Explore nossos projetos"
            : template.id === "soma"
              ? "Conheça nossa essência"
              : "Descubra nossos sabores"}{" "}
          <ArrowUpRight size={12} />
        </span>
      </div>
      <div className="art-object">
        <div />
        <div />
        <div />
      </div>
      <div className="mock-bottom">
        {template.id === "forma"
          ? "01 / Onde a vida acontece"
          : template.id === "soma"
            ? "Um respiro na sua rotina."
            : "DA ORIGEM À SUA XÍCARA."}
      </div>
    </div>
  );
}
function PreviewModal({ template, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const buttons = [
          ...document.querySelectorAll(
            ".preview-modal button, .preview-modal a",
          ),
        ];
        const first = buttons[0],
          last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        <div className="modal-heading">
          <div>
            <small>CONCEITO DE TEMPLATE</small>
            <h2 id="preview-title">{template.name}</h2>
          </div>
          <button
            ref={closeRef}
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar prévia"
          >
            <X />
          </button>
        </div>
        <TemplateArtwork template={template} large />
        <div className="modal-details">
          <p>
            {template.description}
            <br />
            <span>
              Prévia ilustrativa. Personalizamos cores, conteúdo e estrutura
              para sua marca.
            </span>
          </p>
          <a href="#orcamento" className="button dark-button" onClick={onClose}>
            Quero um site assim <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
function Quote() {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("Site institucional");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const message = `Olá, CliffCode! Sou ${name || "um novo cliente"} e gostaria de um orçamento para ${projectType.toLowerCase()}.${details ? " Minha ideia: " + details : ""}`;
  const submit = async (event) => {
    event.preventDefault();
    if (whatsappNumber) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
      } catch {
        setCopied(false);
      }
      window.open(instagramUrl, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <section className="quote-section" id="orcamento">
      <div className="quote-content">
        <p className="eyebrow">
          <span /> VAMOS TIRAR SUA IDEIA DO PAPEL
        </p>
        <h2>
          O próximo
          <br />
          nível é <span>seu.</span>
          <ArrowUpRight className="quote-arrow" />
        </h2>
        <p>
          Conte o que você tem em mente.
          <br />A gente transforma em presença digital.
        </p>
        <div className="quote-note">
          <span className="status-dot" /> Uma boa conversa é o primeiro passo.
        </div>
      </div>
      <form className="quote-form" onSubmit={submit}>
        <label>
          Como podemos chamar você?
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            required
            autoComplete="name"
            maxLength={100}
          />
        </label>
        <label>
          O que vamos criar juntos?
          <select
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
          >
            <option>Site institucional</option>
            <option>Landing page</option>
            <option>Portfólio</option>
            <option>Quero descobrir com vocês</option>
          </select>
        </label>
        <label>
          Conte um pouco sobre sua ideia <span>(opcional)</span>
          <textarea
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Seu negócio, sua ideia, seu próximo passo..."
            rows={2}
            maxLength={1500}
          />
        </label>
        <button type="submit" className="button dark-button">
          {whatsappNumber ? "Conversar no WhatsApp" : "Conversar no Instagram"}
          <ArrowUpRight size={19} />
        </button>
        <p className="form-note" aria-live="polite">
          {copied
            ? "Mensagem copiada! Cole na conversa do Instagram."
            : whatsappNumber
              ? "Sem compromisso. De pessoa para pessoa."
              : "No Instagram, envie sua ideia para @cliffcodedev."}
        </p>
      </form>
    </section>
  );
}

function ScrollExperience() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    let animationFrame = 0;
    function updateProgress() {
      const bounds = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      setProgress(
        Math.max(0, Math.min(1, -bounds.top / Math.max(1, distance))),
      );
      animationFrame = 0;
    }
    function scheduleUpdate() {
      if (!animationFrame)
        animationFrame = requestAnimationFrame(updateProgress);
    }
    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);
  const stage = progress < 0.3 ? 0 : progress < 0.65 ? 1 : 2;
  const stages = [
    "Uma ideia ganha forma.",
    "Cada detalhe, uma intenção.",
    "Sua marca. Uma nova experiência.",
  ];
  return (
    <section
      className="scroll-story"
      ref={sectionRef}
      aria-label="Do código à experiência"
    >
      <div className="scroll-sticky">
        <div className="story-heading">
          <p className="eyebrow">DO CÓDIGO À EXPERIÊNCIA</p>
          <h2>{stages[stage]}</h2>
        </div>
        <div className="device-stage">
          <Suspense
            fallback={
              <div className="scene-loading">Preparando a experiência...</div>
            }
          >
            <DeviceScene progress={progress} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [openFaq, setOpenFaq] = useState(0);
  const visibleTemplates =
    filter === "Todos"
      ? templates
      : templates.filter((template) => template.type === filter);
  const faqs = [
    [
      "O site vai ter a identidade da minha empresa?",
      "Sim. O template é só um ponto de partida. Adaptamos cores, conteúdo e estrutura para comunicar a essência do seu negócio.",
    ],
    [
      "Meu site vai funcionar no celular?",
      "Sim. Criamos layouts responsivos para que a experiência seja clara e confortável no celular, no tablet e no computador.",
    ],
    [
      "Como funciona o orçamento?",
      "Você conta sua ideia e o que precisa. A partir daí, alinhamos o escopo, o prazo e o investimento antes de começar.",
    ],
  ];
  return (
    <>
      <a className="skip-link" href="#projetos">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <Brand />
        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Navegação principal"
        >
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>
            A experiência
          </a>
          <a href="#projetos" onClick={() => setMenuOpen(false)}>
            Templates
          </a>
          <a href="#orcamento" onClick={() => setMenuOpen(false)}>
            Contato
          </a>
        </nav>
        <a
          className="header-cta"
          aria-label="Fale com a CliffCode no WhatsApp"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={17} /> <span>Fale com a CliffCode</span>{" "}
          <ArrowUpRight size={16} />
        </a>
        <button
          className="mobile-menu icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <div className="intro-landscape">
        <section className="hero" id="inicio">
          <p className="eyebrow">DESIGN COM INTENÇÃO. CÓDIGO COM PROPÓSITO.</p>
          <h1>
            Sua marca merece
            <br />
            um <span>novo horizonte.</span>
          </h1>
          <p className="hero-description">
            Sites feitos para despertar interesse, transmitir confiança
            <br className="desktop-break" /> e transformar visitantes em novas
            conversas.
          </p>
          <div className="hero-actions">
            <a href="#orcamento" className="button silver-button">
              Vamos criar seu site <ArrowUpRight size={18} />
            </a>
            <a href="#projetos" className="text-link">
              Explorar templates <ArrowDown size={16} />
            </a>
          </div>
        </section>
        <ScrollExperience />
        </div>
        <section id="experiencia" className="experience section-shell">
          <div className="section-top">
            <p className="eyebrow">01 / ALÉM DA TELA</p>
            <span>TECNOLOGIA É O MEIO. CONEXÃO É O OBJETIVO.</span>
          </div>
          <div className="experience-intro">
            <h2>
              Não é só sobre
              <br />
              estar online.
              <br />
              <span>É sobre marcar presença.</span>
            </h2>
            <p>
              Seu negócio tem uma história única.
              <br />
              Seu site também deveria ter.
              <br />
              <br />
              Unimos estratégia, design e tecnologia para criar experiências que
              despertam curiosidade e abrem novas conversas.
            </p>
          </div>
          <div className="value-grid">
            {[
              {
                icon: Layers3,
                title: "Design com identidade.",
                text: "Uma presença que tem a sua cara e fica na memória de quem visita.",
              },
              {
                icon: Zap,
                title: "Experiência sem barreiras.",
                text: "Rápido, intuitivo e pensado para cada tela. Do primeiro clique ao contato.",
              },
              {
                icon: Code2,
                title: "Construído para evoluir.",
                text: "Uma base sólida para acompanhar as novas fases do seu negócio.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <article className="value-item" key={title}>
                <div>
                  <Icon strokeWidth={1.3} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="projetos" className="projects section-shell">
          <div className="section-top">
            <p className="eyebrow">02 / POSSIBILIDADES EM PIXELS</p>
            <span>SEU FUTURO SITE PODE COMEÇAR AQUI.</span>
          </div>
          <div className="projects-heading">
            <h2>
              Uma ideia.
              <br />
              <span>Infinitas versões.</span>
            </h2>
            <p>
              Explore nossos conceitos de templates.
              <br />O ponto de partida é nosso.
              <br />A personalidade é toda sua.
            </p>
          </div>
          <div className="filter-row">
            <div
              className="filters"
              role="group"
              aria-label="Filtrar templates"
            >
              {["Todos", "Institucional", "Landing page"].map((item) => (
                <button
                  className={filter === item ? "active" : ""}
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                  {item === "Todos"}
                </button>
              ))}
            </div>
            <span className="concept-note">
              FEITOS PARA INSPIRAR. PERSONALIZADOS PARA VOCÊ.
            </span>
          </div>
          <div className="template-grid">
            {visibleTemplates.map((template) => (
              <button
                className="template-card"
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                aria-label={`Ver prévia de ${template.name}`}
              >
                <div className="template-visual">
                  <TemplateArtwork template={template} />
                  <span className="preview-chip">
                    Explorar template <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="template-info">
                  <div>
                    <p>{template.category}</p>
                    <h3>{template.name}</h3>
                  </div>
                  <span className="round-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="custom-note">
            <span>
              Tem algo diferente em mente? <b>A gente cria do zero também.</b>
            </span>
            <a href="#orcamento">
              Vamos conversar <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <Quote />
        <section className="faq section-shell">
          <div>
            <p className="eyebrow">03 / SEM PONTAS SOLTAS</p>
            <h2>
              Antes do
              <br />
              primeiro clique.
            </h2>
            <p>
              Algumas respostas para começar
              <br />a imaginar seu novo site.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className="faq-item" key={question}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-${index}`}
                >
                  <span>{question}</span>
                  {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <div id={`faq-${index}`} hidden={openFaq !== index}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer id="contato" className="site-footer">
        <div className="footer-top">
          <Brand />
          <p>
            Boas ideias merecem
            <br />
            uma presença à altura.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="WhatsApp CliffCode +55 85 99138-5292"
          >
            +55 (85) 99138-5292 <ArrowUpRight size={17} />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <Instagram size={17} /> @cliffcodedev <ArrowUpRight size={17} />
          </a>
        </div>
        <a href="#orcamento" className="footer-invite">
          Vamos criar algo incrível.
          <ArrowUpRight />
        </a>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} CliffCode. Todos os direitos
            reservados.
          </span>
          <span>FEITO COM INTENÇÃO. E ALGUMAS LINHAS DE CÓDIGO.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar com a CliffCode no WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Vamos conversar</span>
      </a>
      {selectedTemplate && (
        <PreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </>
  );
}
