import Image from "next/image";
import { PageLink } from "@/components/PageLink/PageLink";
import { seoConfig } from "@/data/seo";
import { siteContent, siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Paladar Buffet: festas e eventos",
    description:
      "Conheça a parceria do Restaurante Cheiro Verde com o Paladar Buffet para festas, celebrações e eventos.",
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
              Cheiro Verde e Paladar Buffet em novos encontros.
            </h1>
          </div>

          <div className={styles.heroSummary}>
            <p>
              O Restaurante Cheiro Verde integra o Grupo Paladar desde 2014 e
              apresenta o Paladar Buffet como parceiro para festas,
              celebrações e eventos.
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
            <p className={styles.eyebrow}>Marcas do Grupo Paladar</p>
            <h2 id="connection-title" className={styles.sectionTitle}>
              Do restaurante para novos encontros.
            </h2>
            <p>
              Cheiro Verde e Paladar Buffet mantêm identidades e atuações
              próprias, conectadas pela participação no mesmo grupo.
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

          <PageLink className={styles.returnLink} href={siteRoutes.home}>
            Voltar ao Restaurante
          </PageLink>
        </div>
      </section>
    </main>
  );
}
