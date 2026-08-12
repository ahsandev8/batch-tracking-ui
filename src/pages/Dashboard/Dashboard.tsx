import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Batch Dashboard</h1>

          <p>Track and manage your laboratory batches.</p>
        </div>
      </div>

      <div className={styles.placeholder}>
        <h2>Batch list coming next</h2>

        <p>
          Filters, pagination and optimistic status updates will be added in the
          upcoming steps.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
