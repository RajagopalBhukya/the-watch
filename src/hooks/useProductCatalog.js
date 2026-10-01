import { useMemo } from "react";
import { useJson } from "./useJson";

export function useProductCatalog(url) {
  const { data, error, loading } = useJson(url);

  const products = useMemo(() => {
    if (!data?.productsById || !Array.isArray(data.productOrder)) {
      return [];
    }

    return data.productOrder
      .map((productId) => data.productsById[productId])
      .filter(Boolean);
  }, [data]);

  const getProductById = (productId) => data?.productsById?.[productId] ?? null;

  return { products, getProductById, error, loading };
}
