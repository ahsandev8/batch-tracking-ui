import { Link } from "react-router-dom";
import { Eye, SquarePen } from "lucide-react";

import Badge from "../Badge/Badge";

import type { Batch } from "../../types/batch";

import { getNextStatus, getStatusLabel } from "../../utils/batch";

import styles from "./BatchCard.module.scss";
import { uiEndpoint } from "../../utils/endpoints";

interface BatchCardProps {
  batch: Batch;
  onStatusChange: (
    batchId: string,
    nextStatus: NonNullable<ReturnType<typeof getNextStatus>>,
  ) => void;
  updating?: boolean;
}

const BatchCard = ({
  batch,
  onStatusChange,
  updating = false,
}: BatchCardProps) => {
  const nextStatus = getNextStatus(batch.status);

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div>
          <span className={styles.label}>Batch ID</span>

          <span className={styles.batchId}>{batch.id}</span>
        </div>

        <div className={styles.topRight}>
          <div className={styles.icons}>
            <Link
              to={uiEndpoint.batchDetails.replace(":id", batch.id)}
              className={styles.iconButton}
              title="View Details"
            >
              <Eye size={18} />
            </Link>

            <Link
              to={uiEndpoint.updateBatch.replace(":id", batch.id)}
              className={styles.iconButton}
              title="Update Batch"
            >
              <SquarePen size={18} />
            </Link>
          </div>

          <Badge status={batch.status} />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.label}>Sample ID</span>
          <strong>{batch.sample_id}</strong>
        </div>

        <div className={styles.detail}>
          <span className={styles.label}>Batch Type</span>
          <strong>{batch.batch_type}</strong>
        </div>

        <div className={styles.detail}>
          <span className={styles.label}>Submitted By</span>
          <strong>{batch.submitted_by}</strong>
        </div>

        {batch.result && (
          <div className={styles.detail}>
            <span className={styles.label}>Result</span>
            <strong>{batch.result}</strong>
          </div>
        )}
      </div>

      {nextStatus && (
        <div className={styles.actions}>
          <button
            type="button"
            disabled={updating}
            onClick={() => onStatusChange(batch.id, nextStatus)}
          >
            {updating ? "Updating..." : `Move to ${getStatusLabel(nextStatus)}`}
          </button>
        </div>
      )}
    </article>
  );
};

export default BatchCard;
