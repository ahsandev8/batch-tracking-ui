import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}

const Toast = ({ message, type = "error", onClose }: ToastProps) => {
  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <span>{message}</span>

      <button type="button" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
};

export default Toast;
