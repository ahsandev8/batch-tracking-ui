import { useCallback, useEffect, useState } from "react";

import { getBatchesApi } from "../api/batch";

import type {
  Batch,
  BatchFilters,
  PaginatedBatchResponse,
} from "../types/batch";

interface UseBatchesReturn {
  batches: Batch[];
  pagination: Omit<PaginatedBatchResponse, "items"> | null;

  loading: boolean;
  error: string | null;

  fetchBatches: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useBatches = (filters: BatchFilters): UseBatchesReturn => {
  const [batches, setBatches] = useState<Batch[]>([]);

  const [pagination, setPagination] =
    useState<UseBatchesReturn["pagination"]>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchBatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBatchesApi({
        status: filters.status || undefined,
        type: filters.type || undefined,
        page: filters.page,
        page_size: filters.page_size,
      });

      setBatches(response.items);

      setPagination({
        total: response.total,
        page: response.page,
        page_size: response.page_size,
        total_pages: response.total_pages,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return;
      }

      if (!error?.response) {
        setError(
          "Unable to connect to the server. Please check your network connection.",
        );

        return;
      }

      setError(
        error?.response?.data?.detail ||
          "Failed to load batches. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.type, filters.page, filters.page_size]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  return {
    batches,
    pagination,
    loading,
    error,
    fetchBatches,
    refetch: fetchBatches,
  };
};
