import { useState, useEffect } from "react";
import AxlPastriesClient from "@/client/client";
import { Cake } from "@/types/cake";

export const useGetProductDetails = (id: number) => {
	const [product, setProduct] = useState<Cake | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await AxlPastriesClient.getCakeById(Number(id));
        setProduct(response);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { product, loading, error };
};
