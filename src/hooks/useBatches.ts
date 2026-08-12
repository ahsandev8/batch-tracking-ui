import { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";

import { getBatchesApi } from "../api/batch";

import type {
  Batch,
  BatchFilters,
  PaginatedBatchResponse,
} from "../types/batch";

import { getApiErrorMessage } from "../utils/apiError";

interface UseBatchesReturn {
  batches: Batch[];

  setBatches: React.Dispatch<React.SetStateAction<Batch[]>>;

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

  const requestIdRef = useRef(0);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchBatches = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    controllerRef.current?.abort();

    const controller = new AbortController();

    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await getBatchesApi({
        status: filters.status || undefined,

        type: filters.type || undefined,

        page: filters.page,

        page_size: filters.page_size,
      });

      /*
       * Ignore stale responses.
       */
      if (requestId !== requestIdRef.current) {
        return;
      }

      setBatches(response.items);

      setPagination({
        total: response.total,
        page: response.page,
        page_size: response.page_size,
        total_pages: response.total_pages,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(getApiErrorMessage(error, "Failed to load batches."));
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [filters.status, filters.type, filters.page, filters.page_size]);

  useEffect(() => {
    fetchBatches();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchBatches]);

  return {
    batches,
    setBatches,
    pagination,
    loading,
    error,
    fetchBatches,
    refetch: fetchBatches,
  };
};
