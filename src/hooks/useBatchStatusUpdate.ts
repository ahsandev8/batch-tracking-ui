import { useCallback, useState } from "react";

import { updateBatchStatusApi } from "../api/batch";

import type { Batch, BatchStatus } from "../types/batch";

interface UseBatchStatusUpdateReturn {
  updatingBatchId: string | null;

  updateStatus: (
    batch: Batch,
    nextStatus: BatchStatus,
  ) => Promise<Batch | null>;
}

export const useBatchStatusUpdate = (
  batches: Batch[],
  setBatches: React.Dispatch<React.SetStateAction<Batch[]>>,
): UseBatchStatusUpdateReturn => {
  const [updatingBatchId, setUpdatingBatchId] = useState<string | null>(null);

  const updateStatus = useCallback(
    async (batch: Batch, nextStatus: BatchStatus): Promise<Batch | null> => {
      if (updatingBatchId) {
        return null;
      }

      const previousBatch = batch;

      /*
       * 1. Optimistic update
       */
      setBatches((currentBatches) =>
        currentBatches.map((currentBatch) =>
          currentBatch.id === batch.id
            ? {
                ...currentBatch,
                status: nextStatus,
              }
            : currentBatch,
        ),
      );

      setUpdatingBatchId(batch.id);

      try {
        /*
         * 2. Send request
         */
        const updatedBatch = await updateBatchStatusApi(batch.id, {
          status: nextStatus,
        });

        /*
         * 3. Server response becomes
         *    the final state.
         */
        setBatches((currentBatches) =>
          currentBatches.map((currentBatch) =>
            currentBatch.id === batch.id ? updatedBatch : currentBatch,
          ),
        );

        return updatedBatch;
      } catch (error) {
        /*
         * 4. Rollback
         */
        setBatches((currentBatches) =>
          currentBatches.map((currentBatch) =>
            currentBatch.id === previousBatch.id ? previousBatch : currentBatch,
          ),
        );

        throw error;
      } finally {
        setUpdatingBatchId(null);
      }
    },
    [updatingBatchId, setBatches],
  );

  return {
    updatingBatchId,
    updateStatus,
  };
};
