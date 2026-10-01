import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import CartDrawer from "./components/cart/CartDrawer";
import ProductModal from "./components/product/ProductModal";
import Toast from "./components/ui/Toast";
import HomePage from "./pages/HomePage";
import FeaturedPage from "./pages/FeaturedPage";
import CollectionsPage from "./pages/CollectionsPage";
import { browserStore } from "./services/browserStore";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Footer = lazy(() => import("./components/layout/Footer"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => browserStore.loadCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    browserStore.initSession();
    browserStore.cleanupLegacyData();
  }, []);

  useEffect(() => {
    browserStore.saveCart(cart);
  }, [cart]);

  useEffect(
    () => () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    },
    [],
  );

  const notify = (message, type = "added") => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);

    setToast({ message, type, key: Date.now() });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 1800);
  };

  const addToCart = (product) => {
    setCart((current) => ({
      ...current,
      [product.id]: {
        product,
        qty: (current[product.id]?.qty ?? 0) + 1,
      },
    }));
    notify("Item added to the cart");
  };

  const changeQuantity = (product, delta) => {
    setCart((current) => {
      const nextQuantity = (current[product.id]?.qty ?? 0) + delta;

      if (nextQuantity <= 0) {
        const nextCart = { ...current };
        delete nextCart[product.id];
        notify("Item removed from the cart", "removed");
        return nextCart;
      }

      return {
        ...current,
        [product.id]: { product, qty: nextQuantity },
      };
    });
  };

  const removeFromCart = (product) => {
    setCart((current) => {
      if (!current[product.id]) return current;

      const nextCart = { ...current };
      delete nextCart[product.id];
      return nextCart;
    });
    notify("Item removed from the cart", "removed");
  };

  const cartCount = Object.values(cart).reduce(
    (total, item) => total + item.qty,
    0,
  );

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className={loading ? "site hidden" : "site"}>
        <Navbar count={cartCount} onCart={() => setCartOpen(true)} />
        <HomePage />
        <FeaturedPage onAdd={addToCart} onView={setSelectedProduct} />
        <CollectionsPage onAdd={addToCart} onView={setSelectedProduct} />

        <Suspense fallback={null}>
          <AboutPage />
          <ContactPage />
          <Footer />
        </Suspense>

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cart}
          onChange={changeQuantity}
          onRemove={removeFromCart}
        />
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
        />
        <Toast toast={toast} />
      </div>
    </>
  );
}
