import React from "react";
import { useJson } from "../../hooks/useJson";

export default function Footer() {
  const { data } = useJson("/data/site-content.json");
  const footer = data?.footer;

  if (!footer) return null;

  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/the-watch-logo.png" alt="The Watch" />
        <p>{footer.brand_tagline}</p>
      </div>

      <div className="footer-columns">
        {footer.columns.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map((link) => (
              <a href={link.url} key={link.label}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="newsletter">
        <h4>{footer.newsletter.headline}</h4>
        <p>{footer.newsletter.description}</p>
        <div>
          <input
            type="email"
            aria-label="Newsletter email"
            placeholder={footer.newsletter.placeholder}
          />
          <button className="gold-btn" type="button">
            {footer.newsletter.cta_button_text}
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{footer.copyright}</span>
        <div>
          {footer.social_media.map((social) => (
            <a href={social.url} target="_blank" rel="noreferrer" key={social.platform}>
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
