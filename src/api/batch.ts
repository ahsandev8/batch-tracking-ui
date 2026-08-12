import api from "./axios";

import type {
  Batch,
  BatchStatus,
  BatchStatusUpdate,
  PaginatedBatchResponse,
} from "../types/batch";

export interface GetBatchesParams {
  status?: BatchStatus;
  type?: string;
  page?: number;
  page_size?: number;
}

export const getBatchesApi = async (
  params: GetBatchesParams,
  signal?: AbortSignal,
): Promise<PaginatedBatchResponse> => {
  const response = await api.get<PaginatedBatchResponse>("/batch/", {
    params: {
      status: params.status || undefined,
      type: params.type || undefined,
      page: params.page ?? 1,
      page_size: params.page_size ?? 10,
    },
  });

  return response.data;
};

export const getBatchByIdApi = async (batchId: string): Promise<Batch> => {
  const response = await api.get<Batch>(`/batch/${batchId}`);

  return response.data;
};

export const updateBatchStatusApi = async (
  batchId: string,
  data: BatchStatusUpdate,
): Promise<Batch> => {
  const response = await api.put<Batch>(`/batch/${batchId}`, data);

  return response.data;
};
