import { useEffect, useState } from "react";

const responseCache = new Map();

export function useJson(url) {
  const [state, setState] = useState(() => ({
    data: responseCache.get(url) ?? null,
    error: null,
    loading: !responseCache.has(url),
  }));

  useEffect(() => {
    if (responseCache.has(url)) {
      setState({ data: responseCache.get(url), error: null, loading: false });
      return undefined;
    }

    const controller = new AbortController();

    async function loadJson() {
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Unable to load ${url}. HTTP ${response.status}.`);
        }

        const data = await response.json();
        responseCache.set(url, data);
        setState({ data, error: null, loading: false });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(`JSON load failed for ${url}`, error);
          setState({ data: null, error, loading: false });
        }
      }
    }

    loadJson();

    return () => controller.abort();
  }, [url]);

  return state;
}
