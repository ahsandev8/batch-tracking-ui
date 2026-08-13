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
        // Send JSON object; `createBatchApi` accepts both JSON and FormData.
        const batch = await createBatchApi({
          sample_id: data.sample_id,
          batch_type: data.batch_type,
          submitted_by: data.submitted_by,
        });

        return batch;
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Unable to create batch.");

        // show toast for this operation as well
        try {
          const { showToast } = await import("../utils/toastService");
          showToast(
            err?.response?.data?.detail ||
              err.message ||
              "Unable to create batch.",
            "error",
          );
        } catch (_) {
          // ignore
        }

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
