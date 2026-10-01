import React from "react";

export default function ProductCard({ product, onAdd, onView, index = 0 }) {
  const { pricing, assets } = product;

  return (
    <article
      className="product-card"
      style={{ "--delay": `${(index % 4) * 70}ms` }}
    >
      <div className="card-image">
        <img
          src={assets.singleImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <span>{pricing.discountPercent}% OFF</span>
      </div>

      <div className="card-body">
        <h3>{product.name}</h3>
        <small>{product.model}</small>

        <div className="prices">
          <del>₹{pricing.mrp.toLocaleString("en-IN")}</del>
          <strong>₹{pricing.sale.toLocaleString("en-IN")}</strong>
        </div>

        <div className="card-actions">
          <button className="gold-btn" onClick={() => onAdd(product)}>
            ADD TO CART
          </button>
          <button className="order-btn" onClick={() => onAdd(product)}>
            ORDER NOW
          </button>
          <button className="outline-btn" onClick={() => onView(product)}>
            VIEW PRODUCT
          </button>
        </div>
      </div>
    </article>
  );
}
