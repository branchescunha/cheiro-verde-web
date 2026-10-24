import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero/Hero";
import { restaurantContent } from "@/data/restaurant";
import { seoConfig } from "@/data/seo";
import { siteContent, siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Restaurante Paladar | Almoço em Ceilândia",
    description:
      "Restaurante Paladar em Ceilândia, com self-service, churrasco e almoço todos os dias no Setor O.",
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
            <Link
              className={`${styles.button} ${styles.buttonPrimary}`}
              href={siteRoutes.menu}
            >
              Ver cardápio
            </Link>
          </div>
        </div>
      </Hero>

      <section
        className={`${styles.section} ${styles.lightSection}`}
        aria-labelledby="lunch-title"
      >
        <div className={`${styles.container} ${styles.featureGrid}`}>
          <div className={styles.mediaFrame}>
            <Image
              className={styles.mediaImage}
              src="/images/site/restaurant-buffet.webp"
              alt="Buffet de saladas e acompanhamentos do Paladar"
              width={1440}
              height={810}
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.editorialContent}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              O almoço no Paladar
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
            <Image
              className={styles.mediaImage}
              src="/images/site/restaurant-grill.webp"
              alt="Churrasqueira do restaurante Paladar"
              width={1440}
              height={810}
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.editorialContent}>
            <h2 id="grill-title" className={styles.sectionTitle}>
              Da brasa aos cortes nobres.
            </h2>
            <p>
              O {barbecue} ocupa lugar de destaque no almoço, com {premiumCuts}{" "}
              entre as opções do Paladar.
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
            <Image
              className={styles.mediaImage}
              src="/images/site/restaurant-entrance.webp"
              alt="Entrada do restaurante Paladar em Ceilândia"
              width={1280}
              height={720}
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.editorialContent}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Desde {history.foundation.year}
            </p>
            <h2 id="story-title" className={styles.sectionTitle}>
              Uma história de família construída em Ceilândia.
            </h2>
            <p>
              Fundado em {history.foundation.location}, o Paladar mantém sua{" "}
              {history.legacy}.
            </p>
            <Link className={styles.textLink} href={siteRoutes.about}>
              Conhecer nossa história
            </Link>
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
              <p>O Paladar também oferece marmitas para o almoço.</p>
              <Link className={styles.textLink} href={siteRoutes.lunchboxes}>
                Conhecer marmitas
              </Link>
            </article>

            <article className={styles.serviceItem}>
              <h3>Festas e eventos</h3>
              <p>
                O Paladar Buffet é o serviço dedicado a festas e eventos.
              </p>
              <Link className={styles.textLink} href={siteRoutes.buffet}>
                Conhecer o Paladar Buffet
              </Link>
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
            <Image
              className={styles.mediaImage}
              src="/images/site/restaurant-facade.webp"
              alt="Fachada do Restaurante Paladar no Setor O"
              width={1440}
              height={810}
              sizes="(min-width: 48rem) 50vw, 100vw"
            />
          </div>

          <div className={styles.locationContent}>
            <p className={styles.eyebrow}>Encontre o Paladar</p>
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
              href={siteContent.externalLinks.googleMaps.href}
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
