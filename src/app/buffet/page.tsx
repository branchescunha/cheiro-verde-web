import Image from "next/image";
import Link from "next/link";
import { seoConfig } from "@/data/seo";
import { siteContent, siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Paladar Buffet: festas e eventos",
    description:
      "Conheça o Paladar Buffet, serviço do ecossistema Paladar dedicado a festas, celebrações e eventos.",
    path: "/buffet",
  },
  seoConfig,
);

export default function BuffetPage() {
  const { buffet } = siteContent.externalLinks;

  return (
    <main className={styles.main}>
      <header className={styles.hero} aria-labelledby="buffet-page-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Festas &amp; Eventos</p>
            <h1 id="buffet-page-title" className={styles.heroTitle}>
              O Paladar também faz parte das suas celebrações.
            </h1>
          </div>

          <div className={styles.heroSummary}>
            <p>
              O Paladar Buffet é a frente dedicada a festas, celebrações e
              eventos dentro do mesmo ecossistema do restaurante.
            </p>
            <a
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={buffet.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer o Paladar Buffet
              <span className={styles.visuallyHidden}>
                {" "}(abre o site oficial em nova aba)
              </span>
            </a>
            <p className={styles.externalNote}>
              Conteúdo completo disponível no site oficial externo.
            </p>
          </div>
        </div>
      </header>

      <section
        className={`${styles.section} ${styles.previewSection}`}
        aria-labelledby="preview-title"
      >
        <div className={`${styles.container} ${styles.previewGrid}`}>
          <div className={styles.previewContent}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Site oficial
            </p>
            <h2 id="preview-title" className={styles.sectionTitle}>
              Conheça a experiência completa do Buffet.
            </h2>
            <p>
              Informações sobre o serviço e o atendimento estão reunidas no
              canal próprio do Paladar Buffet.
            </p>
          </div>

          <a
            className={styles.sitePreview}
            href={buffet.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir o site oficial do Paladar Buffet em nova aba"
          >
            <Image
              src="/images/site/paladar-buffet-site-preview.webp"
              alt="Prévia da página inicial do site oficial Paladar Buffet"
              width={1440}
              height={900}
              sizes="(min-width: 768px) 64vw, 100vw"
            />
            <span>
              Visitar site oficial
            </span>
          </a>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.connectionSection}`}
        aria-labelledby="connection-title"
        data-surface="dark"
      >
        <div className={`${styles.container} ${styles.connectionGrid}`}>
          <div className={styles.connectionIntroduction}>
            <p className={styles.eyebrow}>Uma mesma essência</p>
            <h2 id="connection-title" className={styles.sectionTitle}>
              Do restaurante para novos encontros.
            </h2>
            <p>
              As duas marcas compartilham uma história familiar construída em
              torno de gastronomia, cuidado e experiência.
            </p>
          </div>

          <ul className={styles.valueList}>
            <li>
              <span>01</span>
              <p>Tradição</p>
            </li>
            <li>
              <span>02</span>
              <p>Gastronomia</p>
            </li>
            <li>
              <span>03</span>
              <p>Cuidado</p>
            </li>
          </ul>

          <Link className={styles.returnLink} href={siteRoutes.home}>
            Voltar ao Restaurante
          </Link>
        </div>
      </section>
    </main>
  );
}
