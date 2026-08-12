import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { loginApi } from "../../api/auth";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const from =
    (location.state as { from?: string } | null)?.from || "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Username and password are required.");

      return;
    }

    try {
      setLoading(true);

      const response = await loginApi({
        username: username.trim(),
        password,
      });

      localStorage.setItem("access_token", response.access_token);

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("Invalid username or password.");
        } else if (!error.response) {
          setErrorMessage("Unable to connect to the server.");
        } else {
          setErrorMessage(
            error.response.data?.detail || "Login failed. Please try again.",
          );
        }
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome back</h1>

          <p>Sign in to manage your batches.</p>
        </div>

        {errorMessage && (
          <div className={styles.error} role="alert">
            {errorMessage}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
