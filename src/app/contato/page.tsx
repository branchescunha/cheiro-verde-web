import Link from "next/link";
import { restaurantContent } from "@/data/restaurant";
import { seoConfig } from "@/data/seo";
import { siteLinks } from "@/data/site-links";
import { siteContent, siteRoutes } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createPageMetadata(
  {
    title: "Contato e localização em Ceilândia",
    description:
      "Consulte o endereço, horários, contatos e informações de funcionamento do Restaurante Paladar em Ceilândia.",
    path: "/contato",
  },
  seoConfig,
);

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const listFormatter = new Intl.ListFormat("pt-BR", {
  style: "long",
  type: "conjunction",
});

export default function ContactPage() {
  const { address, contacts, externalLinks, restaurantHours } = siteContent;
  const { benefits, delivery, service } = restaurantContent;
  const mapsHref = externalLinks.googleMaps.href;
  const generalWhatsAppHref = siteLinks.whatsApp.general;
  const lunchboxWhatsAppHref = siteLinks.whatsApp.lunchboxes.general;
  const uniformedPrice = currencyFormatter.format(
    benefits.uniformedPersonnel.price.amountInCents / 100,
  );
  const eligibleGroups = listFormatter.format(
    benefits.uniformedPersonnel.eligibleGroups,
  );

  return (
    <main className={styles.main}>
      <header className={styles.hero} aria-labelledby="contact-page-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Venha nos visitar</p>
            <h1 id="contact-page-title" className={styles.heroTitle}>
              Seu almoço no Paladar começa por aqui.
            </h1>
            <p className={styles.heroText}>
              Endereço, horários e canais oficiais para planejar sua visita ou
              falar com a equipe.
            </p>
          </div>

          <dl className={styles.schedulePanel}>
            <div>
              <dt>Restaurante</dt>
              <dd>{restaurantHours.days}</dd>
              <dd>
                <time dateTime={restaurantHours.opensAt}>
                  {restaurantHours.opensAtLabel}
                </time>{" "}
                às{" "}
                <time dateTime={restaurantHours.closesAt}>
                  {restaurantHours.closesAtLabel}
                </time>
              </dd>
              <dd>{service.mealService}</dd>
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
      </header>

      <section
        className={`${styles.section} ${styles.informationSection}`}
        aria-labelledby="information-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionIntroduction}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Informações principais
            </p>
            <h2 id="information-title" className={styles.sectionTitle}>
              Escolha o caminho certo.
            </h2>
          </div>

          <div className={styles.informationGrid}>
            <article className={styles.locationCard}>
              <p className={styles.cardLabel}>Onde estamos</p>
              <h3>Paladar em Ceilândia</h3>
              <address>
                {address.line1}
                <br />
                {address.line2}
              </address>
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no Google Maps
                <span className={styles.visuallyHidden}>
                  {" "}(abre em nova aba)
                </span>
              </a>
            </article>

            <article className={styles.serviceCard}>
              <p className={styles.cardLabel}>Atendimento</p>
              <h3>Almoço e delivery</h3>
              <dl>
                <div>
                  <dt>Restaurante</dt>
                  <dd>
                    {restaurantHours.days}, {restaurantHours.opensAtLabel} às{" "}
                    {restaurantHours.closesAtLabel}
                  </dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>
                    {delivery.hours.opensAtLabel} às {delivery.hours.closesAtLabel}
                  </dd>
                </div>
              </dl>
            </article>

            <article className={styles.contactsCard}>
              <p className={styles.cardLabel}>Canais oficiais</p>
              <h3>Fale com o Paladar</h3>
              <ul className={styles.contactActions}>
                <li>
                  <a
                    href={generalWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>WhatsApp geral</span>
                    <strong>{contacts.generalWhatsApp.display}</strong>
                    <span className={styles.visuallyHidden}>
                      {" "}(abre em nova aba)
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={lunchboxWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Marmitas e delivery</span>
                    <strong>{contacts.lunchboxWhatsApp.display}</strong>
                    <span className={styles.visuallyHidden}>
                      {" "}(abre em nova aba)
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={contacts.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Instagram</span>
                    <strong>{contacts.instagram.handle}</strong>
                    <span className={styles.visuallyHidden}>
                      {" "}(abre em nova aba)
                    </span>
                  </a>
                </li>
                <li>
                  <a href={contacts.email.href}>
                    <span>E-mail</span>
                    <strong>{contacts.email.address}</strong>
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.benefitsSection}`}
        aria-labelledby="benefits-title"
        data-surface="red"
      >
        <div className={`${styles.container} ${styles.benefitsGrid}`}>
          <div className={styles.benefitsIntroduction}>
            <p className={styles.eyebrow}>Benefícios</p>
            <h2 id="benefits-title" className={styles.sectionTitle}>
              Condições especiais, apresentadas com clareza.
            </h2>
          </div>

          <div className={styles.benefitList}>
            <article>
              <p className={styles.benefitValue}>
                {benefits.birthday.discountPercentage}%
              </p>
              <div>
                <h3>Aniversariante do dia</h3>
                <p>
                  Desconto de {benefits.birthday.discountPercentage}% aplicado{" "}
                  {benefits.birthday.appliesTo}.
                </p>
              </div>
            </article>

            <article>
              <p className={styles.benefitValue}>{uniformedPrice}</p>
              <div>
                <h3>Militares fardados e em serviço</h3>
                <p>
                  {benefits.uniformedPersonnel.offer} por {uniformedPrice} para
                  profissionais {benefits.uniformedPersonnel.conditions.join(" e ")}.
                </p>
                <p className={styles.eligibleLabel}>Público incluído:</p>
                <p className={styles.eligibleGroups}>{eligibleGroups}.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.faqSection}`}
        aria-labelledby="faq-title"
      >
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div className={styles.faqIntroduction}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Perguntas frequentes
            </p>
            <h2 id="faq-title" className={styles.sectionTitle}>
              Respostas diretas para planejar seu almoço.
            </h2>
          </div>

          <div className={styles.faqList}>
            <details>
              <summary>Quais são os dias e horários de funcionamento?</summary>
              <p>
                O Paladar funciona {restaurantHours.days.toLowerCase()}, das{" "}
                {restaurantHours.opensAtLabel} às {restaurantHours.closesAtLabel}.
              </p>
            </details>
            <details>
              <summary>Onde fica o Paladar?</summary>
              <p>
                {address.line1}, {address.line2}.
              </p>
            </details>
            <details>
              <summary>O restaurante serve jantar?</summary>
              <p>Não. O Paladar funciona apenas no almoço.</p>
            </details>
            <details>
              <summary>O Paladar trabalha com marmitas?</summary>
              <p>
                Sim. Conheça as opções e informações disponíveis na página de{" "}
                <Link href={siteRoutes.lunchboxes}>Marmitas &amp; Delivery</Link>.
              </p>
            </details>
            <details>
              <summary>Há delivery de marmitas?</summary>
              <p>
                Sim. O delivery funciona das {delivery.hours.opensAtLabel} às{" "}
                {delivery.hours.closesAtLabel}. Os pedidos são feitos pelo
                WhatsApp de marmitas.
              </p>
            </details>
            <details>
              <summary>Como funciona o benefício para aniversariantes?</summary>
              <p>
                O aniversariante do dia recebe{" "}
                {benefits.birthday.discountPercentage}% de desconto{" "}
                {benefits.birthday.appliesTo}.
              </p>
            </details>
            <details>
              <summary>Como funciona o valor especial para militares?</summary>
              <p>
                Profissionais fardados e em serviço dos públicos informados têm{" "}
                {benefits.uniformedPersonnel.offer} por {uniformedPrice}.
              </p>
            </details>
            <details>
              <summary>O Paladar realiza festas e eventos?</summary>
              <p>
                O Paladar Buffet é a frente dedicada a festas e eventos. Saiba
                mais na <Link href={siteRoutes.buffet}>página do Buffet</Link> ou
                acesse o{" "}
                <a
                  href={externalLinks.buffet.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  site oficial do Paladar Buffet
                  <span className={styles.visuallyHidden}>
                    {" "}(abre em nova aba)
                  </span>
                </a>
                .
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
