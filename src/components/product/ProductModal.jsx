import React, { useEffect, useState } from "react";

export default function ProductModal({ product, onClose, onAdd }) {
  const [view, setView] = useState("single");

  useEffect(() => {
    setView("single");
  }, [product?.id]);

  useEffect(() => {
    if (!product) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [product, onClose]);

  if (!product) return null;

  const { assets, pricing } = product;
  const activeImage = view === "single" ? assets.singleImage : assets.image360;
  const activeAlt =
    view === "single" ? product.name : `${product.name} eight-view turnaround`;

  return (
    <div
      className="modal-mask"
      onMouseDown={(event) => event.currentTarget === event.target && onClose()}
    >
      <article className="product-modal" key={product.id}>
        <button className="modal-close" onClick={onClose} aria-label="Close product">
          ×
        </button>

        <div className="modal-gallery">
          <img key={`${product.id}-${view}`} src={activeImage} alt={activeAlt} />
          <div>
            <button
              className={view === "single" ? "active" : ""}
              onClick={() => setView("single")}
            >
              WATCH
            </button>
            <button
              className={view === "360" ? "active" : ""}
              onClick={() => setView("360")}
            >
              8 VIEWS
            </button>
          </div>
        </div>

        <div className="modal-copy">
          <p className="eyebrow">{product.model}</p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="prices">
            <del>₹{pricing.mrp.toLocaleString("en-IN")}</del>
            <strong>₹{pricing.sale.toLocaleString("en-IN")}</strong>
            <span>{pricing.discountPercent}% OFF</span>
          </div>
          <div className="modal-buttons">
            <button className="gold-btn" onClick={() => onAdd(product)}>
              ADD TO CART
            </button>
            <button className="outline-btn" onClick={() => onAdd(product)}>
              ORDER NOW
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
