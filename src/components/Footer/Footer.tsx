import Image from "next/image";
import Link from "next/link";
import { siteLinks } from "@/data/site-links";
import {
  homeStartHref,
  navigationItems,
  siteContent,
} from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link
              className={styles.brandLink}
              href={homeStartHref}
              aria-label={`${siteContent.brand.primaryName} — início da página`}
            >
              <Image
                className={styles.logo}
                src="/images/brand/paladar-logo-transparent.png"
                alt=""
                width={1480}
                height={916}
                sizes="136px"
              />
            </Link>
          </div>

          <section
            className={styles.details}
            aria-labelledby="footer-location-title"
          >
            <h2 id="footer-location-title" className={styles.sectionTitle}>
              Onde estamos
            </h2>
            <address className={styles.address}>
              {siteContent.address.line1}
              <br />
              {siteContent.address.line2}
            </address>
            <div className={styles.schedule}>
              <span className={styles.detailTitle}>Funcionamento</span>
              <p>
                {siteContent.restaurantHours.days},{" "}
                <time dateTime={siteContent.restaurantHours.opensAt}>
                  {siteContent.restaurantHours.opensAtLabel}
                </time>{" "}
                às{" "}
                <time dateTime={siteContent.restaurantHours.closesAt}>
                  {siteContent.restaurantHours.closesAtLabel}
                </time>
              </p>
            </div>
          </section>

          <nav
            className={styles.navigation}
            aria-labelledby="footer-navigation-title"
          >
            <h2 id="footer-navigation-title" className={styles.sectionTitle}>
              Navegação
            </h2>
            <ul className={styles.navigationList}>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link className={styles.footerLink} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section
            className={styles.contacts}
            aria-labelledby="footer-contact-title"
          >
            <h2 id="footer-contact-title" className={styles.sectionTitle}>
              Contato
            </h2>
            <ul className={styles.contactList}>
              <li>
                <a
                  className={styles.contactLink}
                  href={siteLinks.whatsApp.general}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactLabel}>WhatsApp</span>
                  <span>{siteContent.contacts.generalWhatsApp.display}</span>
                  <span className={styles.visuallyHidden}>
                    {" "}
                    (abre em nova aba)
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={styles.contactLink}
                  href={siteLinks.whatsApp.lunchboxes.general}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactLabel}>Marmitas</span>
                  <span>{siteContent.contacts.lunchboxWhatsApp.display}</span>
                  <span className={styles.visuallyHidden}>
                    {" "}
                    (abre em nova aba)
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={styles.contactLink}
                  href={siteContent.contacts.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactLabel}>Instagram</span>
                  <span>{siteContent.contacts.instagram.handle}</span>
                  <span className={styles.visuallyHidden}>
                    {" "}
                    (abre em nova aba)
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <div className={styles.copyright}>
            <p>
              © {currentYear} {siteContent.brand.primaryName}. Todos os direitos
              reservados.
            </p>
            <p>CNPJ {siteContent.legal.cnpj}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
