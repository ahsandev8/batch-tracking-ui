import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBatchById } from "../../hooks/useBatchById";
import { updateBatchStatusApi } from "../../api/batch";

import type { BatchStatus } from "../../types/batch";

import styles from "./UpdateBatch.module.scss";
import { uiEndpoint } from "../../utils/endpoints";

const STATUS_OPTIONS: { label: string; value: BatchStatus }[] = [
  { label: "Queued", value: "queued" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
];

const UpdateBatch = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { batch, loading, refetch } = useBatchById(id);

  const [status, setStatus] = useState<BatchStatus>("queued");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (batch) {
      setStatus(batch.status);
    }
  }, [batch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    setSaving(true);

    try {
      await updateBatchStatusApi(id, { status });

      await refetch();

      navigate(`${uiEndpoint.batchDetails}/${id}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (id) {
      navigate(`${uiEndpoint.batchDetails}/${id}`);
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <section className={styles.page}>
        <p className={styles.state}>Loading batch…</p>
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

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Update Batch</h1>
        <p>Change the status of an existing batch.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.row}>
          <div className={styles.group}>
            <label htmlFor="sample_id">Sample ID</label>
            <input id="sample_id" value={batch.sample_id} disabled />
          </div>

          <div className={styles.group}>
            <label htmlFor="batch_type">Batch Type</label>
            <input id="batch_type" value={batch.batch_type} disabled />
          </div>
        </div>

        <p className={styles.readOnlyNote}>
          Sample ID and batch type are set at creation and can&apos;t be changed
          here.
        </p>

        <div className={styles.group}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as BatchStatus)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className={styles.button} disabled={saving}>
            {saving ? "Saving…" : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateBatch;
