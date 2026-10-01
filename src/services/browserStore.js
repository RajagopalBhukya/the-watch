const CART_KEY = "the-watch-cart-v2";
const SESSION_KEY = "the-watch-session";

function isValidCartItem(item) {
  return Boolean(
    item?.product?.id &&
      item?.product?.assets?.singleImage &&
      item?.product?.pricing?.sale &&
      Number.isInteger(item.qty) &&
      item.qty > 0,
  );
}

export const browserStore = {
  loadCart() {
    try {
      const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || "{}");

      return Object.fromEntries(
        Object.entries(storedCart).filter(([, item]) => isValidCartItem(item)),
      );
    } catch (error) {
      console.warn("Stored cart was invalid and has been reset.", error);
      localStorage.removeItem(CART_KEY);
      return {};
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn("Cart could not be persisted.", error);
    }
  },

  initSession() {
    let sessionId = sessionStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = `tw_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    document.cookie = `tw_session=${encodeURIComponent(sessionId)}; Path=/; SameSite=Lax; Max-Age=86400`;
    return sessionId;
  },

  cleanupLegacyData() {
    localStorage.removeItem("the-watch-cart");
  },
};
