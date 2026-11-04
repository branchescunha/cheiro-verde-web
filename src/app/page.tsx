import { Hero } from "@/components/Hero/Hero";
import { PageLink } from "@/components/PageLink/PageLink";
import { ResponsivePhoto } from "@/components/ResponsivePhoto/ResponsivePhoto";
import { restaurantContent } from "@/data/restaurant";
import { seoConfig } from "@/data/seo";
import { siteLinks } from "@/data/site-links";
import { siteContent, siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Restaurante Cheiro Verde | Ceilândia",
    description:
      "Restaurante Cheiro Verde no Setor O, em Ceilândia, com tradição, variedade e qualidade desde 1999.",
    path: "/",
    absoluteTitle: true,
  },
  seoConfig,
);

const [selfService] = restaurantContent.service.formats;
const [
  barbecue,
  premiumCuts,
  salads,
  hotDishes,
  proteins,
] = restaurantContent.highlights;

export default function Home() {
  const { restaurantHours } = siteContent;
  const { history } = restaurantContent;

  return (
    <main id="inicio" className={styles.main}>
      <Hero labelledBy="hero-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Restaurante em Ceilândia</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              Tradição à mesa, todos os dias.
            </h1>
            <p className={styles.heroText}>
              Self-service e churrasco para um almoço completo no Setor O.
            </p>
            <PageLink
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={siteRoutes.menu}
            >
              Ver cardápio
            </PageLink>
          </div>
        </div>
      </Hero>

      <section
        className={`${styles.section} ${styles.lightSection}`}
        aria-labelledby="lunch-title"
      >
        <div className={`${styles.container} ${styles.featureGrid}`}>
          <div className={styles.mediaFrame}>
            <ResponsivePhoto
              className={styles.mediaImage}
              desktopSrc="/media/photos/desktop/buffet-hot-food-desktop.png"
              mobileSrc="/media/photos/mobile/buffet-hot-food-mobile.png"
              alt="Buffet de pratos quentes do Cheiro Verde"
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.editorialContent}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              O almoço no Cheiro Verde
            </p>
            <h2 id="lunch-title" className={styles.sectionTitle}>
              Variedade para montar o prato do seu jeito.
            </h2>
            <p>
              O {selfService} reúne opções para um almoço completo, servido
              todos os dias.
            </p>
            <p className={styles.detailLine}>
              {salads}, {hotDishes} e {proteins}.
            </p>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.lightSection} ${styles.dividedSection}`}
        aria-labelledby="grill-title"
      >
        <div
          className={`${styles.container} ${styles.featureGrid} ${styles.featureGridReverse}`}
        >
          <div className={styles.mediaFrame}>
            <ResponsivePhoto
              className={styles.mediaImage}
              desktopSrc="/media/photos/desktop/barbecue-corner-desktop.png"
              mobileSrc="/media/photos/mobile/barbecue-corner-mobile.png"
              alt="Churrasqueira do Restaurante Cheiro Verde"
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.editorialContent}>
            <h2 id="grill-title" className={styles.sectionTitle}>
              Da brasa aos cortes nobres.
            </h2>
            <p>
              O {barbecue} ocupa lugar de destaque no almoço, com {premiumCuts}{" "}
              entre as opções do Cheiro Verde.
            </p>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.lightSection} ${styles.dividedSection}`}
        aria-labelledby="story-title"
      >
        <div className={`${styles.container} ${styles.featureGrid}`}>
          <div className={styles.mediaFrame}>
            <ResponsivePhoto
              className={styles.mediaImage}
              desktopSrc="/media/photos/desktop/facade-close-desktop.png"
              mobileSrc="/media/photos/mobile/facade-close-mobile.png"
              alt="Fachada e entrada do Restaurante Cheiro Verde em Ceilândia"
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.editorialContent}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Desde {history.foundation.year}
            </p>
            <h2 id="story-title" className={styles.sectionTitle}>
              Tradição, sabor e qualidade desde 1999.
            </h2>
            <p>
              Fundado em {history.foundation.year}, o Cheiro Verde iniciou uma
              trajetória de {history.legacy}. Em {history.acquisition.year}, foi
              adquirido pelo {history.acquisition.organization}.
            </p>
            <PageLink className={styles.textLink} href={siteRoutes.about}>
              Conhecer nossa história
            </PageLink>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.servicesSection}`}
        aria-labelledby="beyond-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <h2 id="beyond-title" className={styles.sectionTitle}>
              Além do restaurante
            </h2>
          </div>

          <div className={styles.servicesGrid}>
            <article className={styles.serviceItem}>
              <h3>Marmitas</h3>
              <p>O Cheiro Verde também oferece marmitas para o almoço.</p>
              <PageLink className={styles.textLink} href={siteRoutes.lunchboxes}>
                Conhecer marmitas
              </PageLink>
            </article>

            <article className={styles.serviceItem}>
              <h3>Festas e eventos</h3>
              <p>
                O Paladar Buffet é o serviço dedicado a festas e eventos.
              </p>
              <PageLink className={styles.textLink} href={siteRoutes.buffet}>
                Conhecer o Paladar Buffet
              </PageLink>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.locationSection}`}
        aria-labelledby="location-title"
        data-surface="dark"
      >
        <div className={`${styles.container} ${styles.locationGrid}`}>
          <div className={styles.locationMedia}>
            <ResponsivePhoto
              className={styles.mediaImage}
              desktopSrc="/media/photos/desktop/facade-wide-desktop.png"
              mobileSrc="/media/photos/mobile/facade-wide-mobile.png"
              alt="Fachada do Restaurante Cheiro Verde no Setor O"
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.locationContent}>
            <p className={styles.eyebrow}>Encontre o Cheiro Verde</p>
            <h2 id="location-title" className={styles.sectionTitle}>
              Almoço todos os dias em Ceilândia.
            </h2>

            <div className={styles.locationFacts}>
              <div>
                <h3>Endereço</h3>
                <address>
                  {siteContent.address.line1}
                  <br />
                  {siteContent.address.line2}
                </address>
              </div>
              <div>
                <h3>Funcionamento</h3>
                <p>{restaurantHours.days}</p>
                <p>
                  <time dateTime={restaurantHours.opensAt}>
                    {restaurantHours.opensAtLabel}
                  </time>{" "}
                  às{" "}
                  <time dateTime={restaurantHours.closesAt}>
                    {restaurantHours.closesAtLabel}
                  </time>
                </p>
              </div>
            </div>

            <a
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={siteLinks.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver localização no Google Maps (abre em nova aba)"
            >
              Ver localização
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
