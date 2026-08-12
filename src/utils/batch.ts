import type { BatchStatus } from "../types/batch";

export const BATCH_STATUSES: BatchStatus[] = [
  "queued",
  "processing",
  "completed",
  "failed",
];

export const getStatusLabel = (status: BatchStatus): string => {
  switch (status) {
    case "queued":
      return "Queued";

    case "processing":
      return "Processing";

    case "completed":
      return "Completed";

    case "failed":
      return "Failed";

    default:
      return status;
  }
};

export const getNextStatus = (status: BatchStatus): BatchStatus | null => {
  switch (status) {
    case "queued":
      return "processing";

    case "processing":
      return "completed";

    default:
      return null;
  }
};
