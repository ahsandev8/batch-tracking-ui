import { Outlet, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brand}>Batch Tracking</div>

          <div className={styles.actions}>
            {user?.username && (
              <span className={styles.username}>
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </span>
            )}

            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
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
