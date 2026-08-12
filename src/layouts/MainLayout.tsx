import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brand}>Batch Tracking</div>

          <button className={styles.logoutButton}>Logout</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
