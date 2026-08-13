import { useCallback, useState } from "react";

import { createBatchApi } from "../api/batch";

import type { Batch, BatchCreate } from "../types/batch";

interface UseCreateBatchReturn {
  loading: boolean;
  error: string | null;

  createBatch: (data: BatchCreate) => Promise<Batch | null>;
}

export const useCreateBatch = (): UseCreateBatchReturn => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const createBatch = useCallback(
    async (data: BatchCreate): Promise<Batch | null> => {
      setLoading(true);
      setError(null);

      try {
        const batch = await createBatchApi(data as any);

        return batch;
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Unable to create batch.");

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    createBatch,
  };
};
