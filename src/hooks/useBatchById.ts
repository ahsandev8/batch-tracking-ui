import { useCallback, useEffect, useState } from "react";

import { getBatchByIdApi } from "../api/batch";

import type { Batch } from "../types/batch";

interface UseBatchReturn {
  batch: Batch | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBatchById = (batchId?: string): UseBatchReturn => {
  const [batch, setBatch] = useState<Batch | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchBatch = useCallback(async () => {
    if (!batchId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getBatchByIdApi(batchId);

      setBatch(response);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Unable to load batch.");
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => {
    fetchBatch();
  }, [fetchBatch]);

  return {
    batch,
    loading,
    error,
    refetch: fetchBatch,
  };
};
