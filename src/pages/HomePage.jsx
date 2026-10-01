import React, { useEffect, useRef } from "react";

const clamp = (value) => Math.min(Math.max(value, 0), 1);
const lerp = (start, end, amount) => start + (end - start) * amount;

export default function HomePage() {
  const trackRef = useRef(null);
  const sceneRef = useRef(null);
  const copyRef = useRef(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const scrollableHeight = Math.max(
        trackRef.current.offsetHeight - window.innerHeight,
        1,
      );
      targetProgress.current = clamp(-rect.top / scrollableHeight);
    };

    const animate = () => {
      currentProgress.current = lerp(
        currentProgress.current,
        targetProgress.current,
        0.07,
      );

      const progress = currentProgress.current;

      if (sceneRef.current) {
        sceneRef.current.style.transform = `translate3d(0, ${lerp(0, -20, progress)}px, 0) scale(${lerp(1, 1.09, progress)})`;
      }

      if (copyRef.current) {
        copyRef.current.style.opacity = clamp(1 - progress * 1.45);
        copyRef.current.style.transform = `translate3d(${lerp(0, -45, progress)}px, ${lerp(0, -22, progress)}px, 0) scale(${lerp(1, 0.96, progress)})`;
        copyRef.current.style.filter = `blur(${lerp(0, 7, progress)}px)`;
      }

      animationFrame.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    animationFrame.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section id="home" ref={trackRef} className="home-track">
      <div className="home-sticky">
        <div ref={sceneRef} className="hero-gif">
          <img
            src="/Untitled%20-%2030%20September%202026%20at%2017.07.26.gif"
            alt="Exploded luxury watch animation"
            // fetchPriority="high"
          />
        </div>
        <div className="hero-shade" />
        <div ref={copyRef} className="hero-copy">
          <p className="eyebrow">PRECISION. PASSION. PERFORMANCE.</p>
          <h1>
            Timeless Luxury.
            <br />
            Crafted for <em>You.</em>
          </h1>
          <i className="gold-rule" />
          <p className="desc">
            Discover premium timepieces designed for those who value elegance and
            precision.
          </p>
          <div className="hero-actions">
            <a href="#shop" className="gold-btn">SHOP NOW</a>
            <a href="#collections" className="outline-btn">EXPLORE COLLECTIONS</a>
          </div>
        </div>
      </div>
    </section>
  );
}
