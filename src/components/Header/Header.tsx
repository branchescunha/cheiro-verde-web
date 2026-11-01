"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageLink } from "@/components/PageLink/PageLink";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import {
  homeStartHref,
  navigationItems,
  siteRoutes,
} from "@/data/site";
import styles from "./Header.module.css";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <PageLink
          className={styles.brandLink}
          href={homeStartHref}
          aria-label="Ir para o início da página"
          onClick={closeMenu}
        >
          <Image
            className={`${styles.logo} ${styles.logoLight}`}
            src="/images/brand/cheiro-verde-logo-light.png"
            alt=""
            aria-hidden="true"
            width={768}
            height={565}
            sizes="100px"
            loading="eager"
          />
          <Image
            className={`${styles.logo} ${styles.logoDark}`}
            src="/images/brand/cheiro-verde-logo-dark.png"
            alt=""
            aria-hidden="true"
            width={768}
            height={565}
            sizes="100px"
            loading="eager"
          />
        </PageLink>

        <div className={styles.controls}>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </span>
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`${styles.navigation} ${
            isMenuOpen ? styles.navigationOpen : ""
          }`}
          aria-label="Navegação principal"
        >
          <ul className={styles.navigationList}>
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              return (
                <li key={item.href}>
                  <PageLink
                    className={`${styles.navigationLink} ${
                      isActive ? styles.navigationLinkActive : ""
                    }`}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </PageLink>
                </li>
              );
            })}
          </ul>

          <PageLink
            className={styles.cta}
            href={siteRoutes.lunchboxes}
            onClick={closeMenu}
          >
            Pedir marmita
          </PageLink>
        </nav>
      </div>
    </header>
  );
}
