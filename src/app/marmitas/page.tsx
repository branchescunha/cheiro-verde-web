import Link from "next/link";
import { restaurantContent, type Money } from "@/data/restaurant";
import { seoConfig } from "@/data/seo";
import { siteLinks } from "@/data/site-links";
import { siteContent, siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Marmitas e delivery em Ceilândia",
    description:
      "Conheça as marmitas do Restaurante Paladar e consulte horário e taxas de delivery para o Setor O e Ceilândia.",
    path: "/marmitas",
  },
  seoConfig,
);

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatMoney(money: Money) {
  return currencyFormatter.format(money.amountInCents / 100);
}

export default function LunchboxesPage() {
  const { delivery, lunchboxes } = restaurantContent;
  const { lunchboxWhatsApp } = siteContent.contacts;

  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="lunchboxes-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Almoço para levar</p>
            <h1 id="lunchboxes-title" className={styles.heroTitle}>
              Marmitas do seu jeito.
            </h1>
            <p className={styles.heroText}>
              Monte sua marmita no buffet ou escolha uma opção da casa para
              tornar o almoço mais prático.
            </p>

            <div className={styles.actions}>
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={siteLinks.whatsApp.lunchboxes.general}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir marmita
                <span className={styles.visuallyHidden}>
                  {" "}(abre o WhatsApp em nova aba)
                </span>
              </a>
              <Link
                className={`${styles.button} ${styles.buttonSecondary}`}
                href={siteRoutes.menu}
              >
                Ver cardápio
              </Link>
            </div>
          </div>

          <dl className={styles.heroDetails}>
            <div>
              <dt>Restaurante</dt>
              <dd>{siteContent.restaurantHours.days}</dd>
              <dd>
                <time dateTime={siteContent.restaurantHours.opensAt}>
                  {siteContent.restaurantHours.opensAtLabel}
                </time>{" "}
                às{" "}
                <time dateTime={siteContent.restaurantHours.closesAt}>
                  {siteContent.restaurantHours.closesAtLabel}
                </time>
              </dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>
                <time dateTime={delivery.hours.opensAt}>
                  {delivery.hours.opensAtLabel}
                </time>{" "}
                às{" "}
                <time dateTime={delivery.hours.closesAt}>
                  {delivery.hours.closesAtLabel}
                </time>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.lightSection}`}
        aria-labelledby="formats-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionIntroduction}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Escolha como montar
            </p>
            <h2 id="formats-title">Duas formas de levar o Paladar.</h2>
          </div>

          <div className={styles.formatList}>
            <article>
              <p className={styles.formatNumber} aria-hidden="true">
                01
              </p>
              <h3>Monte no peso</h3>
              <p>
                Use o buffet para montar sua própria marmita, do mesmo jeito
                que monta o prato no atendimento presencial.
              </p>
            </article>
            <article>
              <p className={styles.formatNumber} aria-hidden="true">
                02
              </p>
              <h3>Marmitas da Casa</h3>
              <p>
                Escolha entre quatro opções pensadas para facilitar o pedido.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.houseSection}`}
        aria-labelledby="house-lunchboxes-title"
        data-surface="dark"
      >
        <div className={styles.container}>
          <div className={styles.houseIntroduction}>
            <div>
              <p className={styles.eyebrow}>Marmitas da Casa</p>
              <h2 id="house-lunchboxes-title">
                Quatro opções para o seu almoço.
              </h2>
            </div>
          </div>

          <ol className={styles.lunchboxGrid}>
            {lunchboxes.options.map((lunchbox, index) => (
              <li key={lunchbox.id}>
                <article className={styles.lunchboxCard}>
                  <div className={styles.cardHeading}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>Marmita da Casa</p>
                  </div>
                  <h3>{lunchbox.name}</h3>
                  <p className={styles.description}>{lunchbox.description}</p>
                  <ul className={styles.composition}>
                    {lunchbox.composition.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={styles.cardFooter}>
                    <p>
                      <span>Preço</span>
                      <strong>{formatMoney(lunchbox.price)}</strong>
                    </p>
                    <a
                      className={styles.orderLink}
                      href={
                        siteLinks.whatsApp.lunchboxes.options[
                          lunchbox.id as keyof typeof siteLinks.whatsApp.lunchboxes.options
                        ]
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pedir esta opção
                      <span className={styles.visuallyHidden}>
                        {" "}(abre o WhatsApp em nova aba)
                      </span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.deliverySection}`}
        aria-labelledby="delivery-title"
        data-surface="brand"
      >
        <div className={`${styles.container} ${styles.deliveryGrid}`}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Delivery
            </p>
            <h2 id="delivery-title">Seu almoço pode ir até você.</h2>
            <p className={styles.deliveryText}>
              Pedidos pelo WhatsApp durante o horário de delivery informado.
            </p>
          </div>

          <div className={styles.deliveryDetails}>
            <dl>
              <div>
                <dt>Horário</dt>
                <dd>
                  <time dateTime={delivery.hours.opensAt}>
                    {delivery.hours.opensAtLabel}
                  </time>{" "}
                  às{" "}
                  <time dateTime={delivery.hours.closesAt}>
                    {delivery.hours.closesAtLabel}
                  </time>
                </dd>
              </div>
              {delivery.areas.map((area) => (
                <div key={area.name}>
                  <dt>{area.name}</dt>
                  <dd>
                    {formatMoney(area.fee)}
                    <span>
                      Taxa de entrega
                    </span>
                  </dd>
                </div>
              ))}
              <div>
                <dt>WhatsApp</dt>
                <dd>{lunchboxWhatsApp.display}</dd>
              </div>
            </dl>

            <ol className={styles.orderGuide} aria-label="Como fazer o pedido">
              <li>
                <span>01</span>
                <p>Escolha entre montar no peso ou pedir uma opção da casa.</p>
              </li>
              <li>
                <span>02</span>
                <p>Envie sua escolha para o WhatsApp de marmitas.</p>
              </li>
              <li>
                <span>03</span>
                <p>Confirme os detalhes diretamente com a equipe.</p>
              </li>
            </ol>

            <a
              className={`${styles.button} ${styles.buttonDark}`}
              href={siteLinks.whatsApp.lunchboxes.general}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fazer pedido pelo WhatsApp
              <span className={styles.visuallyHidden}>
                {" "}(abre o WhatsApp em nova aba)
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
