export type BatchStatus = "queued" | "processing" | "completed" | "failed";

export interface Batch {
  id: string;
  sample_id: string;
  batch_type: string;
  submitted_by: string;
  status: BatchStatus;
  result?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BatchStatusUpdate {
  status: BatchStatus;
}

export interface PaginatedBatchResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: Batch[];
}

export interface BatchFilters {
  status?: BatchStatus | "";
  type?: string;
  page: number;
  page_size: number;
}
