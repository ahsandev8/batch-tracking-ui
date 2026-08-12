import { useMemo, useState } from "react";

import { useBatches } from "../../hooks/useBatches";

import type { BatchStatus } from "../../types/batch";

import BatchList from "../../components/BatchList/BatchList";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorState from "../../components/ErrorState/ErrorState";
import BatchSkeleton from "../../components/Loader/BatchSkeleton";

import styles from "./Dashboard.module.scss";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [status, setStatus] = useState<BatchStatus | "">("");

  const [type, setType] = useState("");

  const [page, setPage] = useState(1);

  const { batches, pagination, loading, error, refetch } = useBatches({
    status,
    type,
    page,
    page_size: PAGE_SIZE,
  });

  const types = useMemo(() => {
    const uniqueTypes = new Set(batches.map((batch) => batch.batch_type));

    return Array.from(uniqueTypes).sort();
  }, [batches]);

  const handleStatusChange = (value: BatchStatus | "") => {
    setStatus(value);

    // Reset pagination when filter changes
    setPage(1);
  };

  const handleTypeChange = (value: string) => {
    setType(value);

    // Reset pagination when filter changes
    setPage(1);
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
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
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
          <BatchList batches={batches} onStatusChange={() => {}} />

          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.total_pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Dashboard;
