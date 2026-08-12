import styles from "./ErrorState.module.scss";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className={styles.container}>
      <h2>Unable to load batches</h2>

      <p>{message}</p>

      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
};

export default ErrorState;
