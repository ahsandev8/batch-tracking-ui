import { Link, useParams } from "react-router-dom";

import { useBatchById } from "../../hooks/useBatchById";

import styles from "./BatchDetails.module.scss";

const BatchDetails = () => {
  const { id } = useParams();

  const { batch, loading, error, refetch } = useBatchById(id);

  if (loading) return <p>Loading...</p>;

  if (error) return <button onClick={refetch}>Retry</button>;

  if (!batch) return <p>Batch not found.</p>;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Batch Details</h1>

        <Link to={`/batch/${batch.id}/edit`}>Edit Status</Link>
      </div>

      <div className={styles.card}>
        <div>
          <strong>Sample ID</strong>
          <p>{batch.sample_id}</p>
        </div>

        <div>
          <strong>Batch Type</strong>
          <p>{batch.batch_type}</p>
        </div>

        <div>
          <strong>Status</strong>
          <p>{batch.status}</p>
        </div>

        <div>
          <strong>Submitted By</strong>
          <p>{batch?.submitted_by}</p>
        </div>

        <div>
          <strong>Created At</strong>
          {/* <p>
            {new Date(
              batch.created_at,
            ).toLocaleString()}
          </p> */}
        </div>

        <div>
          <strong>Updated At</strong>
          {/* <p>
            {new Date(
              batch.updated_at,
            ).toLocaleString()}
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default BatchDetails;
