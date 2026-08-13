import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBatchById } from "../../hooks/useBatchById";
import { updateBatchStatusApi } from "../../api/batch";

import type { BatchStatus } from "../../types/batch";

import styles from "./UpdateBatch.module.scss";
import { uiEndpoint } from "../../utils/endpoints";

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
      await updateBatchStatusApi(id, {
        status,
      });

      await refetch();

      navigate(`${uiEndpoint.batchDetails}/${id}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!batch) return <p>Batch not found.</p>;

  return (
    <section className={styles.page}>
      <h1>Update Batch</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input value={batch.sample_id} disabled />

        <input value={batch.batch_type} disabled />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as BatchStatus)}
        >
          <option value="queued">Queued</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>

        <button disabled={saving}>{saving ? "Saving..." : "Update"}</button>
      </form>
    </section>
  );
};

export default UpdateBatch;
