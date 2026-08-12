import type { BatchStatus } from "../../types/batch";

import { BATCH_STATUSES } from "../../utils/batch";

import styles from "./FilterBar.module.scss";

interface FilterBarProps {
  status: BatchStatus | "";
  type: string;

  types: string[];

  onStatusChange: (status: BatchStatus | "") => void;

  onTypeChange: (type: string) => void;
}

const FilterBar = ({
  status,
  type,
  types,
  onStatusChange,
  onTypeChange,
}: FilterBarProps) => {
  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label htmlFor="status">Status</label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as BatchStatus | "")
          }
        >
          <option value="">All statuses</option>

          {BATCH_STATUSES.map((batchStatus) => (
            <option key={batchStatus} value={batchStatus}>
              {batchStatus.charAt(0).toUpperCase() + batchStatus.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="type">Batch Type</label>

        <select
          id="type"
          value={type}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="">All types</option>

          {types.map((batchType) => (
            <option key={batchType} value={batchType}>
              {batchType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
