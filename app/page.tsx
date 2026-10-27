"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Menu,
  Plus,
  Quote,
  X,
  ZoomIn,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { entries } from "./portfolio-data";
import type { Entry, Photo } from "./portfolio-data";

const nav = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Selected work"],
  ["research", "Research"],
  ["impact", "Leadership & impact"],
  ["recognition", "Recognition"],
  ["experience", "Experience"],
  ["contact", "Contact"],
] as const;

const entry = (id: string) => entries.find((item) => item.id === id)!;
const riding = entry("riding");
const bio = entry("bio");
const drone = entry("drone");
const research = entry("research");
const projectEntries = [
  drone,
  research,
  entry("safety"),
  entry("nutrition"),
  entry("edumath"),
  entry("memory-challenge"),
];
const impactEntries = [
  entry("tekite"),
  entry("sentem"),
  entry("scratch"),
  entry("daklak"),
  entry("green"),
  entry("folk"),
];
const recognitionEntries = [
  entry("aijam-grand-prix"),
  entry("icpc-gold"),
  entry("sviifaward"),
  entry("ideaward"),
  entry("singapore-math-global-finals"),
  entry("singapore-math-challenge"),
  entry("seacso"),
];
const experienceEntries = [entry("shtp"), entry("iot")];
const resumeHref = "/documents/Tran_An_Phu_Resume.docx.pdf";

type OpenTarget = HTMLElement | null;

export default function Page() {
  const [selected, setSelected] = useState<Entry | null>(null);
  const [gallery, setGallery] = useState<{
    photos: Photo[];
    index: number;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const opener = useRef<OpenTarget>(null);
  const photoOpener = useRef<OpenTarget>(null);

  useEffect(() => {
    const sections = nav
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (observations) => {
        const visible = observations
          .filter((observation) => observation.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const openDetail = (id: string, element: OpenTarget) => {
    opener.current = element;
    setMenuOpen(false);
    setSelected(entry(id));
  };

  const enlarge = (photos: Photo[], index: number, element: OpenTarget) => {
    if (!photos.length) return;
    photoOpener.current = element;
    setGallery({ photos, index });
  };

  const moveGallery = (direction: number) => {
    setGallery((current) =>
      current
        ? {
            ...current,
            index:
              (current.index + direction + current.photos.length) %
              current.photos.length,
          }
        : null,
    );
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu}>
          <span className="wordmark-mark">A</span>
          <span>
            AN PHU<small>Portfolio / 2026</small>
          </span>
        </a>
        <button
          className="mobile-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav
          id="main-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Main navigation"
        >
          {nav.map(([id, label]) => (
            <a
              href={`#${id}`}
              className={activeSection === id ? "is-active" : ""}
              key={id}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a
            className="header-cv"
            href={resumeHref}
            download
            onClick={closeMenu}
          >
            CV <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="main">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-gridline" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span>01</span> Ho Chi Minh City, Vietnam · Class of 2027
            </p>
            <h1 id="hero-title">
              Tran An<em>Phu.</em>
            </h1>
            <p className="hero-positioning">
              Horse rider. Student developer.
              <br />
              <span>Exploring patterns in movement.</span>
            </p>
            <p className="hero-intro">
              I connect computer science and engineering with animal-movement
              research, field observation and hands-on learning in the
              community.
            </p>
            <div className="hero-actions">
              <a className="button button-solid" href="#projects">
                Explore selected work{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <button
                className="text-link text-link-light"
                onClick={(event) => openDetail("riding", event.currentTarget)}
              >
                The story behind the movement{" "}
                <ArrowDownRight size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="hero-signature" aria-label="Areas of focus">
              <span>Computer science</span>
              <span>AI &amp; engineering</span>
              <span>Field observation</span>
            </div>
          </div>
          <div className="hero-visual">
            <button
              className="hero-image image-button"
              onClick={(event) =>
                enlarge(riding.photos ?? [], 0, event.currentTarget)
              }
              aria-label="Enlarge horseback-riding photograph"
            >
              <img
                src="/media/riding-hero.webp"
                alt="Horseback riding at the riding school"
                fetchPriority="high"
                width="1800"
                height="1350"
              />
              <span className="image-zoom">
                <ZoomIn size={17} aria-hidden="true" /> View image
              </span>
            </button>
            <div className="hero-caption">
              <span className="eyebrow">Beyond the classroom</span>
              <p>
                Where an interest in horses became a question for engineering.
              </p>
              <span className="image-caption">
                Riding school / Ho Chi Minh City
              </span>
            </div>
            <svg
              className="telemetry hero-telemetry"
              viewBox="0 0 520 160"
              fill="none"
              aria-hidden="true"
            >
              <path d="M5 118C93 18 117 141 210 72C288 14 300 108 375 81C427 63 467 84 515 16" />
              <circle cx="210" cy="72" r="4" />
              <circle cx="375" cy="81" r="4" />
            </svg>
          </div>
          <a
            className="scroll-cue"
            href="#bridge"
            aria-label="Continue to the field note"
          >
            <span>Scroll to follow the question</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </section>

        <section className="horse-motion" aria-label="Animated running horse">
          <div className="horse-motion-track">
            <span className="motion-tree motion-tree-left" aria-hidden="true" />
            <span className="motion-tree motion-tree-mid" aria-hidden="true" />
            <span
              className="motion-tree motion-tree-right"
              aria-hidden="true"
            />
            <div
              className="horse-sprite"
              role="img"
              aria-label="Cartoon horse running from left to right"
            />
          </div>
        </section>

        <section
          id="bridge"
          className="story-bridge"
          aria-labelledby="bridge-title"
        >
          <div className="bridge-intro">
            <p className="eyebrow">
              <span>Field note / 00</span>
            </p>
            <h2 id="bridge-title">
              Where observation became a research question.
            </h2>
            <p>
              Observing horses in motion encouraged me to explore how cameras,
              aerial systems, computer vision and movement data could support
              closer animal observation.
            </p>
            <div className="bridge-disclaimer">
              <span className="status-dot" /> A prototype, not a diagnostic
              tool.
            </div>
            <button
              className="text-link"
              onClick={(event) => openDetail("riding", event.currentTarget)}
            >
              Read the riding story{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="bridge-visuals">
            <button
              className="bridge-photo bridge-photo-riding image-button"
              onClick={(event) =>
                enlarge(riding.photos ?? [], 1, event.currentTarget)
              }
              aria-label="Enlarge riding-school photograph"
            >
              <img
                src="/media/riding-side.webp"
                alt="Horseback riding at the riding school"
                loading="lazy"
                width="1800"
                height="1350"
              />
              <span className="photo-index">01 / riding</span>
            </button>
            <svg
              className="telemetry bridge-telemetry"
              viewBox="0 0 300 150"
              fill="none"
              aria-hidden="true"
            >
              <path d="M4 133C59 17 86 134 146 82S226 32 296 4" />
            </svg>
            <button
              className="bridge-photo bridge-photo-drone image-button"
              onClick={(event) =>
                enlarge(drone.photos ?? [], 1, event.currentTarget)
              }
              aria-label="Enlarge drone field photograph"
            >
              <img
                src="/media/drone-field.webp"
                alt="Field testing with the animal-monitoring drone"
                loading="lazy"
                width="1800"
                height="1350"
              />
              <span className="photo-index">02 / field test</span>
            </button>
            <p className="bridge-caption">
              A personal interest becomes a technical question through field
              observation.
            </p>
          </div>
        </section>

        <section
          id="about"
          className="about section-shell"
          aria-labelledby="about-title"
        >
          <div className="section-kicker">
            <span>01</span>
            <span>About</span>
          </div>
          <div className="about-layout">
            <button
              className="about-photo image-button"
              onClick={(event) =>
                enlarge(
                  [
                    {
                      image: "portrait",
                      caption: "With the drone prototype at the riding school.",
                    },
                  ],
                  0,
                  event.currentTarget,
                )
              }
              aria-label="Enlarge portrait"
            >
              <img
                src="/media/portrait.webp"
                alt="Tran An Phu with a drone prototype at the riding school"
                width="1800"
                height="1350"
                loading="lazy"
              />
              <span className="photo-note">
                A question worth taking into the field.
              </span>
            </button>
            <div className="about-copy">
              <p className="eyebrow">
                A student of systems, movement and making
              </p>
              <h2 id="about-title">
                From observing
                <br />
                <em>to building.</em>
              </h2>
              <p className="lead-copy">
                I&apos;m An Phu, a student at Le Thanh Tong Primary, Junior and
                Senior High School in Ho Chi Minh City, graduating in 2027.
              </p>
              <p>
                I explore computer science, AI and engineering through research,
                prototypes, mobile and web products, and community teaching.
                Horseback riding brings another perspective: observing movement
                helped inspire my wildlife-monitoring drone project.
              </p>
              <div className="about-dimensions">
                <div>
                  <span>01</span>
                  <strong>Education</strong>
                  <small>Le Thanh Tong · Class of 2027</small>
                </div>
                <div>
                  <span>02</span>
                  <strong>Academic profile</strong>
                  <small>
                    SAT 1520 · IELTS 7.5 · AP Statistics 4 · GPA 9.0
                  </small>
                </div>
                <div>
                  <span>03</span>
                  <strong>Technical focus</strong>
                  <small>AI · React Native · data systems</small>
                </div>
              </div>
              <div className="about-actions">
                <button
                  className="button button-outline"
                  onClick={(event) => openDetail("bio", event.currentTarget)}
                >
                  Read full biography <Plus size={16} aria-hidden="true" />
                </button>
                <a className="text-link" href={resumeHref} download>
                  Download CV <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="work-section section-shell"
          aria-labelledby="projects-title"
        >
          <div className="section-heading editorial-heading">
            <div className="section-kicker">
              <span>02</span>
              <span>Selected work</span>
            </div>
            <div>
              <h2 id="projects-title">
                Questions turned
                <br />
                <em>into projects.</em>
              </h2>
              <p>
                Research, working prototypes and technology projects—with the
                contribution and evidence behind each one.
              </p>
            </div>
          </div>
          <article className="feature-project">
            <div className="feature-project-media">
              <button
                className="feature-image image-button"
                onClick={(event) =>
                  enlarge(drone.photos ?? [], 0, event.currentTarget)
                }
                aria-label="Enlarge wildlife-monitoring drone photograph"
              >
                <img
                  src="/media/drone-build.webp"
                  alt="Working on the wildlife-monitoring drone prototype"
                  loading="lazy"
                  width="1800"
                  height="1350"
                />
                <span className="image-zoom">
                  <ZoomIn size={17} aria-hidden="true" /> View prototype
                </span>
              </button>
              <div className="feature-media-note">
                <span>Prototype / 2026</span>
                <span>Camera · flight control · GPS</span>
              </div>
            </div>
            <div className="feature-project-copy">
              <p className="eyebrow">Engineering · Computer vision</p>
              <h3>
                AI-based wildlife
                <br />
                <em>monitoring drone</em>
              </h3>
              <p className="feature-summary">
                Building a camera-equipped drone workflow to explore wildlife
                observation from video, object detection and UAV telemetry.
              </p>
              <dl className="project-meta">
                <div>
                  <dt>Role</dt>
                  <dd>{drone.role}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>Working prototype</dd>
                </div>
                <div>
                  <dt>Context</dt>
                  <dd>Riding school &amp; field testing</dd>
                </div>
              </dl>
              <div className="feature-quote">
                <Quote size={20} aria-hidden="true" />
                <p>
                  How can aerial footage and AI support closer observation of
                  animal movement?
                </p>
              </div>
              <button
                className="button button-light"
                onClick={(event) => openDetail("drone", event.currentTarget)}
              >
                View full case study{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </article>
          <div
            id="research"
            className="research-feature"
            aria-labelledby="research-title"
          >
            <div className="research-copy">
              <p className="eyebrow">
                <span>Published research</span> / 2026
              </p>
              <h3 id="research-title">
                Understanding
                <br />
                <em>elephant movement.</em>
              </h3>
              <p>
                A multi-view anomaly-detection framework using GPS data to study
                elephant movement—distinct from the drone project&apos;s field
                footage.
              </p>
              <div className="research-stat">
                <strong>12,170</strong>
                <span>
                  source GPS records
                  <br />
                  25 engineered features
                </span>
              </div>
              <button
                className="text-link text-link-light"
                onClick={(event) => openDetail("research", event.currentTarget)}
              >
                Read the research record{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
            <button
              className="research-document image-button"
              onClick={(event) =>
                enlarge(research.photos ?? [], 0, event.currentTarget)
              }
              aria-label="Enlarge research paper cover"
            >
              <img
                src="/media/research-cover.webp"
                alt="First page of the published elephant movement paper"
                loading="lazy"
                width="1800"
                height="1350"
              />
              <span className="document-stamp">IJCS / Vol. 15 / Issue 3</span>
            </button>
          </div>
          <div
            className="project-index"
            aria-label="Supporting technology projects"
          >
            <div className="index-intro">
              <span className="eyebrow">Supporting work</span>
              <p>
                Other projects that extend the same practice of building,
                testing and sharing.
              </p>
            </div>
            <div className="index-list">
              {projectEntries.slice(2).map((item, index) => (
                <button
                  className="index-row"
                  key={item.id}
                  onClick={(event) => openDetail(item.id, event.currentTarget)}
                >
                  <span className="index-number">0{index + 1}</span>
                  <span className="index-title">{item.title}</span>
                  <span className="index-role">{item.role}</span>
                  <span className="index-arrow">
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          id="impact"
          className="impact-section"
          aria-labelledby="impact-title"
        >
          <div className="section-shell">
            <div className="section-heading editorial-heading impact-heading">
              <div className="section-kicker">
                <span>03</span>
                <span>Leadership &amp; impact</span>
              </div>
              <div>
                <h2 id="impact-title">
                  Building
                  <br />
                  <em>with others.</em>
                </h2>
                <p>
                  Student leadership, community teaching and conservation
                  activities. Every outcome below is a shared program result.
                </p>
              </div>
            </div>
            <div className="impact-layout">
              <div className="impact-lead">
                <button
                  className="impact-photo image-button"
                  onClick={(event) =>
                    enlarge(
                      impactEntries[0].photos ?? [],
                      0,
                      event.currentTarget,
                    )
                  }
                  aria-label="Enlarge Tekite Club outreach photograph"
                >
                  <img
                    src="/media/teaching.webp"
                    alt="Scratch teaching activity"
                    loading="lazy"
                    width="1800"
                    height="1350"
                  />
                </button>
                <p className="impact-note">
                  <span>Field journal / 03</span> Leadership is a practice of
                  making room for other people to learn by doing.
                </p>
              </div>
              <div className="impact-list">
                {impactEntries.map((item) => (
                  <button
                    className="impact-row"
                    key={item.id}
                    onClick={(event) =>
                      openDetail(item.id, event.currentTarget)
                    }
                  >
                    <span className="impact-row-number">{item.period}</span>
                    <span className="impact-row-copy">
                      <strong>{item.title}</strong>
                      <small>
                        {item.role} · {item.summary}
                      </small>
                    </span>
                    <span className="impact-row-result">
                      {item.result ?? "View record"}
                    </span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="recognition"
          className="recognition-section section-shell"
          aria-labelledby="recognition-title"
        >
          <div className="section-heading editorial-heading">
            <div className="section-kicker">
              <span>04</span>
              <span>Recognition</span>
            </div>
            <div>
              <h2 id="recognition-title">
                Evidence along
                <br />
                <em>the way.</em>
              </h2>
              <p>
                Selected academic and team awards, with supporting materials
                where available.
              </p>
            </div>
          </div>
          <div className="recognition-list">
            {recognitionEntries.map((item) => (
              <button
                className="recognition-row"
                key={item.id}
                onClick={(event) => openDetail(item.id, event.currentTarget)}
              >
                <span className="recognition-year">
                  {item.period.split(" · ")[0]}
                </span>
                <span className="recognition-title">
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </span>
                <span className="recognition-evidence">
                  {item.missing ? (
                    <>
                      <span className="pending-dot" /> Evidence pending
                    </>
                  ) : (
                    <>
                      <Check size={15} aria-hidden="true" /> Supporting material
                    </>
                  )}
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="experience-section section-shell"
          aria-labelledby="experience-title"
        >
          <div className="section-heading editorial-heading">
            <div className="section-kicker">
              <span>05</span>
              <span>Experience</span>
            </div>
            <div>
              <h2 id="experience-title">
                Learning beyond
                <br />
                <em>the classroom.</em>
              </h2>
              <p>
                Technical enrichment and program participation that connected
                ideas with tools, systems and real-world questions.
              </p>
            </div>
          </div>
          <div className="experience-list">
            {experienceEntries.map((item, index) => (
              <button
                className="experience-row"
                key={item.id}
                onClick={(event) => openDetail(item.id, event.currentTarget)}
              >
                <span className="experience-index">0{index + 1}</span>
                <span className="experience-name">
                  <strong>{item.title}</strong>
                  <small>{item.role}</small>
                </span>
                <span className="experience-period">{item.period}</span>
                <span className="experience-summary">{item.summary}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-orbit" aria-hidden="true" />
          <div className="section-shell contact-inner">
            <div>
              <p className="eyebrow">
                <span>06</span> Contact
              </p>
              <h2 id="contact-title">
                Let&apos;s
                <br />
                <em>connect.</em>
              </h2>
              <p className="contact-intro">
                Ho Chi Minh City, Vietnam · For questions about my projects,
                research or academic interests.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-email" href="mailto:anphusg2009@gmail.com">
                anphusg2009@gmail.com
              </a>
              <a href={resumeHref} download>
                Download my CV <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://doi.org/10.33022/ijcs.v15i3.5146"
                target="_blank"
                rel="noreferrer"
              >
                Read my co-authored research{" "}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Tran An Phu · Ho Chi Minh City, Vietnam</span>
        <span>Observe → Question → Build → Share</span>
        <a href="#home">
          Back to top <ArrowRight size={14} aria-hidden="true" />
        </a>
      </footer>

      <Dialog
        open={!!selected}
        onOpenChange={(openState) => !openState && setSelected(null)}
      >
        <DialogContent
          className="detail-modal"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
        >
          <div className="modal-toolbar">
            <span className="eyebrow">{selected?.category}</span>
            <DialogClose className="close-button">
              Close <X size={18} aria-hidden="true" />
            </DialogClose>
          </div>
          {selected && (
            <div className="modal-scroll">
              <p className="eyebrow">{selected.period}</p>
              <DialogTitle className="modal-title">
                {selected.title}
              </DialogTitle>
              <p className="modal-role">{selected.role}</p>
              <DialogDescription className="modal-description">
                {selected.summary}
              </DialogDescription>
              {selected.result && (
                <p className="modal-result">{selected.result}</p>
              )}
              <div className="detail-sections">
                {selected.sections.map((sectionItem) => (
                  <div key={sectionItem.heading}>
                    <h3>{sectionItem.heading}</h3>
                    {sectionItem.heading === "Academic record" && selected.academicRows ? (
                      <div className="academic-table-wrap">
                        <table className="academic-table">
                          <caption className="sr-only">Academic record</caption>
                          <tbody>
                            {selected.academicRows.map((row) => (
                              <tr key={row.label}>
                                <th scope="row">{row.label}</th>
                                <td>{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>{sectionItem.text}</p>
                    )}
                  </div>
                ))}
              </div>
              {selected.skills && (
                <div className="skills" aria-label="Skills and tools">
                  {selected.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              )}
              {selected.photos && (
                <section className="gallery-section">
                  <h3>In pictures</h3>
                  <p className="gallery-hint">
                    Select a photograph or document to view it in full.
                  </p>
                  <div className="photo-grid">
                    {selected.photos.map((photo, index) => (
                      <figure key={photo.image}>
                        <button
                          onClick={(event) =>
                            enlarge(
                              selected.photos ?? [],
                              index,
                              event.currentTarget,
                            )
                          }
                          aria-label={`Enlarge: ${photo.caption}`}
                        >
                          <img
                            src={`/media/${photo.image}-small.webp`}
                            alt={photo.caption}
                            loading="lazy"
                            width="700"
                            height="500"
                          />
                          <span className="image-zoom">
                            <ZoomIn size={16} aria-hidden="true" />
                          </span>
                        </button>
                        <figcaption>{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
              {selected.video && (
                <section className="video-section">
                  <h3>Prototype test footage</h3>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster="/media/drone-test-small.webp"
                  >
                    <source src="/drone-test.webm" type="video/webm" />
                    <source src={selected.video} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>
                  <p className="gallery-hint">
                    This footage documents prototype testing, not
                    species-recognition performance.
                  </p>
                </section>
              )}
              {selected.links && (
                <div className="document-links">
                  <h3>Explore the evidence</h3>
                  {selected.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <a
                        className="button button-outline"
                        key={link.href}
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                      >
                        {link.label}{" "}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}
              {selected.missing && (
                <div className="missing">
                  <strong>[CẦN BỔ SUNG]</strong>
                  {selected.missing.map((missingItem) => (
                    <p key={missingItem}>{missingItem}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!gallery}
        onOpenChange={(openState) => !openState && setGallery(null)}
      >
        <DialogContent
          className="lightbox-modal"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            photoOpener.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              moveGallery(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              moveGallery(-1);
            }
          }}
        >
          {gallery && (
            <>
              <div className="lightbox-top">
                <DialogTitle>Gallery</DialogTitle>
                <DialogClose className="close-button">
                  Close <X size={20} aria-hidden="true" />
                </DialogClose>
              </div>
              <div className="lightbox-image">
                <img
                  src={`/media/${gallery.photos[gallery.index].image}.webp`}
                  alt={gallery.photos[gallery.index].caption}
                />
              </div>
              <DialogDescription className="lightbox-caption">
                {gallery.photos[gallery.index].caption}
              </DialogDescription>
              <div className="gallery-controls">
                <button
                  onClick={() => moveGallery(-1)}
                  disabled={gallery.photos.length === 1}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <span aria-live="polite">
                  {gallery.index + 1} / {gallery.photos.length}
                </span>
                <button
                  onClick={() => moveGallery(1)}
                  disabled={gallery.photos.length === 1}
                  aria-label="Next image"
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
