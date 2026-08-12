import styles from "./BatchSkeleton.module.scss";

const BatchSkeleton = () => {
  return (
    <div className={styles.list}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
      ))}
    </div>
  );
};

export default BatchSkeleton;
