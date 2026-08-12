import type { Batch, BatchStatus } from "../../types/batch";

import BatchCard from "../BatchCard/BatchCard";

import styles from "./BatchList.module.scss";

interface BatchListProps {
  batches: Batch[];

  onStatusChange: (batchId: string, nextStatus: BatchStatus) => void;

  updatingBatchId?: string | null;
}

const BatchList = ({
  batches,
  onStatusChange,
  updatingBatchId,
}: BatchListProps) => {
  return (
    <div className={styles.list}>
      {batches.map((batch) => (
        <BatchCard
          key={batch.id}
          batch={batch}
          onStatusChange={onStatusChange}
          updating={updatingBatchId === batch.id}
        />
      ))}
    </div>
  );
};

export default BatchList;
