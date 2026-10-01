import React from "react";

export default function CartDrawer({ open, onClose, items, onChange, onRemove }) {
  const rows = Object.values(items);
  const itemCount = rows.reduce((total, row) => total + row.qty, 0);
  const total = rows.reduce(
    (sum, row) => sum + row.product.pricing.sale * row.qty,
    0,
  );

  return (
    <>
      <div
        onClick={onClose}
        className={`cart-mask ${open ? "open" : ""}`}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${open ? "open" : ""}`}
        aria-label="Shopping cart"
      >
        <div className="cart-head">
          <h2>
            YOUR CART <span>{itemCount}</span>
          </h2>
          <button onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {!rows.length ? (
          <div className="empty-cart">
            <div className="cart-icon" aria-hidden="true">
              🛒
            </div>
            <h3>Your Cart Is Empty</h3>
            <p>Discover our premium collection of timepieces.</p>
            <a href="#home" className="gold-btn" onClick={onClose}>
              SHOP NOW
            </a>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {rows.map(({ product, qty }) => (
                <div className="cart-row" key={product.id}>
                  <img
                    src={product.assets.singleImage}
                    alt={product.name}
                    loading="lazy"
                  />
                  <div className="cart-info">
                    <h3>{product.name}</h3>
                    <small>{product.model}</small>
                    <strong>₹{product.pricing.sale.toLocaleString("en-IN")}</strong>
                    <div className="qty">
                      <button
                        onClick={() => onChange(product, -1)}
                        aria-label={`Decrease ${product.name}`}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={() => onChange(product, 1)}
                        aria-label={`Increase ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button className="remove-link" onClick={() => onRemove(product)}>
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>TOTAL</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
