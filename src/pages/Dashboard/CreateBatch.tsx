import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCreateBatch } from "../../hooks/useCreateBatch";

import styles from "./CreateBatch.module.scss";
import { uiEndpoint } from "../../utils/endpoints";

const CreateBatch = () => {
  const navigate = useNavigate();

  const { createBatch, loading } = useCreateBatch();

  const [form, setForm] = useState({
    sample_id: "",
    batch_type: "",
    submitted_by: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const batch = await createBatch(form as any);

    if (batch) {
      navigate(`${uiEndpoint.batchDetails}/${batch.id}`);
    }
  };

  return (
    <section className={styles.page}>
      <h1>Create Batch</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="sample_id"
          placeholder="Sample ID"
          value={form.sample_id}
          onChange={handleChange}
          required
        />

        <input
          name="batch_type"
          placeholder="Batch Type"
          value={form.batch_type}
          onChange={handleChange}
          required
        />

        <input
          name="submitted_by"
          placeholder="Submitted By"
          value={form.submitted_by}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Batch"}
        </button>
      </form>
    </section>
  );
};

export default CreateBatch;
