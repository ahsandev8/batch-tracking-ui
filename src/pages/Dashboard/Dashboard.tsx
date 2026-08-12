import { useMemo, useState } from "react";

import { useBatches } from "../../hooks/useBatches";
import { useBatchStatusUpdate } from "../../hooks/useBatchStatusUpdate";

import type { BatchStatus } from "../../types/batch";

import BatchList from "../../components/BatchList/BatchList";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorState from "../../components/ErrorState/ErrorState";
import BatchSkeleton from "../../components/Loader/BatchSkeleton";
import Toast from "../../components/Toast/Toast";

import styles from "./Dashboard.module.scss";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [status, setStatus] = useState<BatchStatus | "">("");

  const [type, setType] = useState("");

  const [page, setPage] = useState(1);

  const [toast, setToast] = useState<string | null>(null);

  const { batches, setBatches, pagination, loading, error, refetch } =
    useBatches({
      status,
      type,
      page,
      page_size: PAGE_SIZE,
    });

  const { updatingBatchId, updateStatus } = useBatchStatusUpdate(
    batches,
    setBatches,
  );

  const types = useMemo(() => {
    const uniqueTypes = new Set(batches.map((batch) => batch.batch_type));

    return Array.from(uniqueTypes).sort();
  }, [batches]);

  const handleStatusFilterChange = (value: BatchStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  const handleTypeFilterChange = (value: string) => {
    setType(value);
    setPage(1);
  };

  const handleStatusChange = async (
    batchId: string,
    nextStatus: BatchStatus,
  ) => {
    const batch = batches.find((item) => item.id === batchId);

    if (!batch) {
      return;
    }

    try {
      await updateStatus(batch, nextStatus);

      setToast("Batch status updated successfully.");
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return;
      }

      setToast(
        error?.response?.data?.detail ||
          "Unable to update batch status. The change was reverted.",
      );
    }
  };

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Batch Dashboard</h1>

          <p>Track and manage your laboratory batches.</p>
        </div>

        {pagination && (
          <div className={styles.total}>
            {pagination.total} {pagination.total === 1 ? "batch" : "batches"}
          </div>
        )}
      </div>

      <FilterBar
        status={status}
        type={type}
        types={types}
        onStatusChange={handleStatusFilterChange}
        onTypeChange={handleTypeFilterChange}
      />

      {loading && <BatchSkeleton />}

      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && batches.length === 0 && (
        <EmptyState
          message={
            status || type
              ? "Try changing your filters."
              : "There are no batches available."
          }
        />
      )}

      {!loading && !error && batches.length > 0 && (
        <>
          <BatchList
            batches={batches}
            onStatusChange={handleStatusChange}
            updatingBatchId={updatingBatchId}
          />

          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.total_pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
};

export default Dashboard;
