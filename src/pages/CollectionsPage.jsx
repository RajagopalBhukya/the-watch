import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import { useProductCatalog } from "../hooks/useProductCatalog";

export default function CollectionsPage({ onAdd, onView }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { products, error, loading } = useProductCatalog("/data/collections.json");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "220px", threshold: 0.05 },
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className={`collections-page ${visible ? "revealed" : ""}`}
    >
      <div className="section-title">
        <p className="eyebrow">EXPLORE OUR WORLD</p>
        <h2>Collections</h2>
        <p>Distinctive designs selected for every expression of time.</p>
      </div>

      {error ? (
        <p className="catalog-message">The collection could not be loaded.</p>
      ) : loading ? (
        <p className="catalog-message">Loading collection…</p>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAdd={onAdd}
              onView={onView}
            />
          ))}
        </div>
      )}
    </section>
  );
}
