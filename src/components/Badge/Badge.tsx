import type { BatchStatus } from "../../types/batch";
import { getStatusLabel } from "../../utils/batch";

import styles from "./Badge.module.scss";

interface BadgeProps {
  status: BatchStatus;
}

const Badge = ({ status }: BadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default Badge;
