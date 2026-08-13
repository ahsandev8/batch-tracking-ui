import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCreateBatch } from "../../hooks/useCreateBatch";

import styles from "./CreateBatch.module.scss";
import { uiEndpoint } from "../../utils/endpoints";

const BATCH_TYPES = [
  { label: "Queued", value: "queued" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
];

interface BatchForm {
  sample_id: string;
  batch_type: string;
  submitted_by: string;
}

const INITIAL_FORM: BatchForm = {
  sample_id: "",
  batch_type: "",
  submitted_by: "",
};

const CreateBatch = () => {
  const navigate = useNavigate();

  const { createBatch, loading } = useCreateBatch();

  const [form, setForm] = useState<BatchForm>(INITIAL_FORM);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const batch = await createBatch(form);

    if (batch) {
      navigate(`${uiEndpoint.batchDetails}/${batch.id}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Create Batch</h1>
        <p>Enter the sample and submission details to register a new batch.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.group}>
          <label htmlFor="sample_id">Sample ID</label>
          <input
            id="sample_id"
            name="sample_id"
            placeholder="e.g. SMP-00123"
            value={form.sample_id}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="batch_type">Batch Type</label>
          <select
            id="batch_type"
            name="batch_type"
            value={form.batch_type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select batch type
            </option>

            {BATCH_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label htmlFor="submitted_by">Submitted By</label>
          <input
            id="submitted_by"
            name="submitted_by"
            placeholder="e.g. Jane Doe"
            value={form.submitted_by}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Creating..." : "Create Batch"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBatch;
