import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.main} aria-live="polite" aria-busy="true">
      <div className={styles.indicator} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p>Carregando</p>
    </main>
  );
}
