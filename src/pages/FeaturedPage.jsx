import React, { useEffect, useState } from "react";
import { useProductCatalog } from "../hooks/useProductCatalog";

export default function FeaturedPage({ onAdd, onView }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { products, error, loading } = useProductCatalog("/data/shop-products.json");

  useEffect(() => {
    if (paused || products.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [paused, products.length]);

  useEffect(() => {
    if (activeIndex >= products.length && products.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, products.length]);

  if (error) {
    return (
      <section id="shop" className="featured-page">
        <p className="catalog-message">Featured watches could not be loaded.</p>
      </section>
    );
  }

  if (loading || !products.length) {
    return (
      <section id="shop" className="featured-page">
        <p className="catalog-message">Loading signature series…</p>
      </section>
    );
  }

  const product = products[activeIndex];

  return (
    <section
      id="shop"
      className="featured-page"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-title">
        <p className="eyebrow">THE WATCH / SIGNATURE SERIES</p>
        <h2>
          Crafted to become <em>your story.</em>
        </h2>
      </div>

      <div className="video-stage">
        <video
          key={product.id}
          src={product.assets.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="video-shade" />
        <div className="video-copy">
          <small>{product.model}</small>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <strong>₹{product.pricing.sale.toLocaleString("en-IN")}</strong>
          <div>
            <button className="gold-btn" onClick={() => onAdd(product)}>
              ADD TO CART
            </button>
            <button className="outline-btn" onClick={() => onView(product)}>
              VIEW PRODUCT
            </button>
          </div>
        </div>

        <button
          className="slide-arrow left"
          aria-label="Previous featured watch"
          onClick={() =>
            setActiveIndex((activeIndex - 1 + products.length) % products.length)
          }
        >
          ‹
        </button>
        <button
          className="slide-arrow right"
          aria-label="Next featured watch"
          onClick={() => setActiveIndex((activeIndex + 1) % products.length)}
        >
          ›
        </button>

        <div className="slide-dots">
          {products.map((productItem, index) => (
            <button
              aria-label={`Show ${productItem.name}`}
              className={index === activeIndex ? "active" : ""}
              key={productItem.id}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
