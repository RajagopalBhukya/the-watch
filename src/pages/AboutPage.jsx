import React, { useEffect, useRef, useState } from "react";
import { useJson } from "../hooks/useJson";

export default function AboutPage() {
  const sectionRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [progress, setProgress] = useState(0);
  const { data } = useJson("/data/site-content.json");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
      },
      { rootMargin: "500px" },
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const rawProgress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height * 0.55);
      setProgress(Math.min(1, Math.max(0, rawProgress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const about = data?.about_us;
  if (!about) return <section id="about" ref={sectionRef} className="about-page" />;

  return (
    <section id="about" ref={sectionRef} className="about-page">
      <div
        className="about-copy"
        style={{
          opacity: 0.25 + 0.75 * progress,
          transform: `translateY(${36 * (1 - progress)}px)`,
        }}
      >
        <p className="eyebrow">{about.badge}</p>
        <h2>{about.title}</h2>
        <h3>{about.subtitle}</h3>
        <p className="about-story">{about.story}</p>
        <div className="value-grid">
          {about.core_values.map((value) => (
            <article key={value.title}>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
        <div className="spec-grid">
          {Object.entries(about.technical_specifications).map(([key, value]) => (
            <div key={key}>
              <span>{key.replaceAll("_", " ")}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div
        className="about-media"
        style={{
          transform: `scale(${0.92 + 0.08 * progress})`,
          opacity: 0.15 + 0.85 * progress,
        }}
      >
        {nearViewport && (
          <video src="/media/about-watch.mp4" autoPlay muted loop playsInline preload="metadata" />
        )}
      </div>
    </section>
  );
}
