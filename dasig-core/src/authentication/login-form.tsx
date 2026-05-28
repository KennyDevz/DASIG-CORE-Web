import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login-form.module.css';
import { resolveMockLogin } from '../features/dashboard/data/mock-dashboard-data';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const account = resolveMockLogin(username, password);
    if (!account) {
      setError('Invalid credentials. Try admin/admin123, tbi/tbi123, or staff/staff123.');
      return;
    }

    navigate(account.dashboardPath);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>User Login</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="username" className={styles.srOnly}>Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.srOnly}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p className={styles.hint}>
          Mock accounts: admin / admin123 · tbi / tbi123 · staff / staff123
        </p>
      </div>
    </div>
  );
}
