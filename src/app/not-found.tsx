import Link from "next/link";
import { homeStartHref, siteRoutes } from "@/data/site";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Erro 404</p>
          <h1>Página não encontrada.</h1>
          <p className={styles.description}>
            O endereço acessado não existe ou não está mais disponível.
          </p>
          <div className={styles.actions}>
            <Link
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={homeStartHref}
            >
              Voltar ao início
            </Link>
            <Link
              className={`${styles.button} ${styles.buttonSecondary}`}
              href={siteRoutes.menu}
            >
              Ver cardápio
            </Link>
          </div>
        </div>

        <p className={styles.errorCode} aria-hidden="true">
          404
        </p>
      </div>
    </main>
  );
}
