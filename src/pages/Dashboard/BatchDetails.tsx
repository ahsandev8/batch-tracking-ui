import { Link, useParams } from "react-router-dom";

import { useBatchById } from "../../hooks/useBatchById";

import styles from "./BatchDetails.module.scss";
import { ArrowLeft } from "lucide-react";
import { uiEndpoint } from "../../utils/endpoints";

const STATUS_STYLES: Record<string, string> = {
  completed: styles.statusCompleted,
  queued: styles.statusQueued,
  processing: styles.statusProcessing,
  failed: styles.statusFailed,
};

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
};

const BatchDetails = () => {
  const { id } = useParams();

  const { batch, loading, error, refetch } = useBatchById(id);

  if (loading) {
    return (
      <section className={styles.page}>
        <p className={styles.state}>Loading batch…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <div className={styles.state}>
          <p>Something went wrong while loading this batch.</p>
          <button className={styles.retryButton} onClick={refetch}>
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!batch) {
    return (
      <section className={styles.page}>
        <p className={styles.state}>Batch not found.</p>
      </section>
    );
  }

  const statusClass = STATUS_STYLES[batch.status] ?? styles.status;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Batch Details</h1>

        <Link to={uiEndpoint.bashborad}>
          <span
            style={{
              cursor: "pointer",
              padding: "0.5rem",
              border: "1px solid gray",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={20} />
          </span>
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.item}>
          <span>Sample ID</span>
          <p>{batch.sample_id}</p>
        </div>

        <div className={styles.item}>
          <span>Batch Type</span>
          <p>{batch.batch_type}</p>
        </div>

        <div className={styles.item}>
          <span>Status</span>
          <p>
            <span className={`${styles.status} ${statusClass}`}>
              {batch.status}
            </span>
          </p>
        </div>

        <div className={styles.item}>
          <span>Submitted By</span>
          <p>{batch.submitted_by ?? "—"}</p>
        </div>

        <div className={styles.item}>
          <span>Created At</span>
          <p>{formatDate(batch.created_at)}</p>
        </div>

        <div className={styles.item}>
          <span>Updated At</span>
          <p>{formatDate(batch.updated_at)}</p>
        </div>
      </div>
    </section>
  );
};

export default BatchDetails;
