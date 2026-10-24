"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import {
  homeStartHref,
  navigationItems,
  siteContent,
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

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    closeMenu();

    const isModifiedClick =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;

    if (pathname !== siteRoutes.home || isModifiedClick) {
      return;
    }

    const homeStart = document.getElementById("inicio");

    if (!homeStart) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(window.history.state, "", homeStartHref);
    homeStart.scrollIntoView({ block: "start" });
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          className={styles.brandLink}
          href={homeStartHref}
          aria-label={`${siteContent.brand.primaryName} — início da página`}
          onClick={handleBrandClick}
        >
          <Image
            className={styles.logo}
            src="/images/brand/paladar-logo-transparent.png"
            alt=""
            width={1480}
            height={916}
            sizes="110px"
            loading="eager"
          />
        </Link>

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
                  <Link
                    className={`${styles.navigationLink} ${
                      isActive ? styles.navigationLinkActive : ""
                    }`}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            className={styles.cta}
            href={siteRoutes.lunchboxes}
            onClick={closeMenu}
          >
            Pedir marmita
          </Link>
        </nav>
      </div>
    </header>
  );
}
