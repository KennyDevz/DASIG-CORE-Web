import styles from './create-kpi-button.module.css';

interface CreateKpiButtonProps {
  onClick?: () => void;
}

export default function CreateKpiButton({ onClick }: CreateKpiButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      + Create KPI
    </button>
  );
}
