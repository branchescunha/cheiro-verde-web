import { PageLink } from "@/components/PageLink/PageLink";
import { ResponsivePhoto } from "@/components/ResponsivePhoto/ResponsivePhoto";
import { restaurantContent } from "@/data/restaurant";
import { seoConfig } from "@/data/seo";
import { siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Nossa história",
    description:
      "Conheça a história do Restaurante Cheiro Verde, fundado em 1999 e integrante do Grupo Paladar desde 2014.",
    path: "/sobre",
  },
  seoConfig,
);

export default function AboutPage() {
  const { history } = restaurantContent;

  return (
    <main className={styles.main}>
      <header className={styles.hero} aria-labelledby="about-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Desde {history.foundation.year}</p>
            <h1 id="about-title" className={styles.heroTitle}>
              Tradição, sabor e qualidade desde 1999.
            </h1>
            <p className={styles.heroText}>
              O Cheiro Verde construiu uma trajetória de compromisso com a boa
              gastronomia e com a experiência de seus clientes.
            </p>
          </div>

          <p className={styles.heroYear} aria-hidden="true">
            {history.foundation.year}
          </p>
        </div>
      </header>

      <section
        className={`${styles.section} ${styles.originSection}`}
        aria-labelledby="origin-title"
      >
        <div className={`${styles.container} ${styles.originGrid}`}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Nossa origem
            </p>
            <h2 id="origin-title" className={styles.sectionTitle}>
              Uma trajetória construída desde 1999.
            </h2>
          </div>

          <div className={styles.originContent}>
            <p>
              Fundado em {history.foundation.year}, o Restaurante Cheiro Verde
              construiu uma trajetória de tradição, qualidade e compromisso
              com a boa gastronomia.
            </p>
            <p>
              Em {history.acquisition.year}, o restaurante foi adquirido pelo{" "}
              {history.acquisition.organization}, iniciando uma nova fase de
              crescimento, modernização e valorização da experiência dos
              clientes.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.spaceGallery}
        aria-labelledby="space-gallery-title"
      >
        <div className={styles.container}>
          <div className={styles.galleryIntroduction}>
            <p className={styles.eyebrow}>O Cheiro Verde hoje</p>
            <h2 id="space-gallery-title" className={styles.sectionTitle}>
              O espaço onde essa história continua.
            </h2>
            <p>
              Um ambiente pensado para oferecer conforto e acolhimento aos
              clientes.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            <figure className={styles.galleryPrimary}>
              <ResponsivePhoto
                desktopSrc="/media/photos/desktop/buffet-salads-desktop.png"
                mobileSrc="/media/photos/mobile/buffet-salads-mobile.png"
                alt="Buffet de saladas do Restaurante Cheiro Verde"
                sizes="(min-width: 768px) 64vw, 60vw"
              />
            </figure>
            <figure>
              <ResponsivePhoto
                desktopSrc="/media/photos/desktop/dining-room-center-desktop.png"
                mobileSrc="/media/photos/mobile/dining-room-center-mobile.png"
                alt="Vista central do salão do Restaurante Cheiro Verde"
                sizes="(min-width: 768px) 32vw, 40vw"
              />
            </figure>
            <figure>
              <ResponsivePhoto
                desktopSrc="/media/photos/desktop/dining-room-side-desktop.png"
                mobileSrc="/media/photos/mobile/dining-room-side-mobile.png"
                alt="Vista lateral do salão do Restaurante Cheiro Verde"
                sizes="(min-width: 768px) 32vw, 100vw"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.journeySection}`}
        aria-labelledby="journey-title"
        data-surface="dark"
      >
        <div className={`${styles.container} ${styles.journeyGrid}`}>
          <div className={styles.journeyIntroduction}>
            <p className={styles.eyebrow}>Nossa trajetória</p>
            <h2 id="journey-title" className={styles.sectionTitle}>
              O tempo trouxe mudanças. A essência permaneceu.
            </h2>
          </div>

          <ol className={styles.milestoneList}>
            <li>
              <p className={styles.milestonePeriod}>
                <time dateTime={String(history.foundation.year)}>
                  {history.foundation.year}
                </time>
              </p>
              <div className={styles.milestoneContent}>
                <h3>O começo</h3>
                <p>
                  Fundação do Restaurante Cheiro Verde e início de uma
                  trajetória dedicada à boa gastronomia.
                </p>
              </div>
            </li>

            <li>
              <p className={styles.milestonePeriod}>
                <time dateTime={String(history.acquisition.year)}>
                  {history.acquisition.year}
                </time>
              </p>
              <div className={styles.milestoneContent}>
                <h3>Uma nova fase</h3>
                <p>
                  Aquisição pelo {history.acquisition.organization} e início de
                  uma fase de crescimento, modernização e valorização da
                  experiência dos clientes.
                </p>
              </div>
            </li>

            <li>
              <p className={styles.milestonePeriod}>Desde 2014</p>
              <div className={styles.milestoneContent}>
                <h3>Um espaço renovado</h3>
                <p>
                  Duas grandes reformas tornaram o ambiente mais moderno,
                  confortável e acolhedor.
                </p>
              </div>
            </li>

            <li>
              <p className={styles.milestonePeriod}>Hoje</p>
              <div className={styles.milestoneContent}>
                <h3>Presença que continua</h3>
                <p>
                  O Cheiro Verde consolidou-se como restaurante de referência
                  na região e na cidade, com qualidade, variedade e excelência
                  no atendimento.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.evolutionSection}`}
        aria-labelledby="evolution-title"
        data-surface="brand"
      >
        <div className={`${styles.container} ${styles.evolutionGrid}`}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Tradição que evolui
            </p>
            <h2 id="evolution-title" className={styles.sectionTitle}>
              Crescer sem perder a tradição.
            </h2>
          </div>

          <div className={styles.evolutionContent}>
            <p>
              O cardápio foi ampliado e ganhou opções especiais, com frutos do
              mar e churrasco Prime preparado com carnes selecionadas.
            </p>
            <ul>
              {history.menuEvolution.map((development) => (
                <li key={development}>{development}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="visit-title">
        <div className={`${styles.container} ${styles.finalCtaInner}`}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Desde {history.foundation.year}
            </p>
            <h2 id="visit-title">Essa história continua à mesa.</h2>
          </div>
          <div className={styles.actions}>
            <PageLink
              className={`${styles.button} ${styles.buttonDark}`}
              href={siteRoutes.menu}
            >
              Ver cardápio
            </PageLink>
            <PageLink
              className={`${styles.button} ${styles.buttonGhost}`}
              href={siteRoutes.contact}
            >
              Ver contato
            </PageLink>
          </div>
        </div>
      </section>
    </main>
  );
}
