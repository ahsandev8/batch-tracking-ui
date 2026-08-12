import styles from "./EmptyState.module.scss";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No batches found." }: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>📦</div>

      <h2>No batches found</h2>

      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
