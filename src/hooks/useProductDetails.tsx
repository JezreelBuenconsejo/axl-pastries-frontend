import { useState, useEffect } from "react";
import AxlPastriesClient from "@/client/client";
import { Cake } from "@/types/cake";

export const useGetProductDetails = (id: number) => {
	const [product, setProduct] = useState<Cake | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await AxlPastriesClient.getCakeById(Number(id));
        setProduct(response);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { product, loading, error };
};
