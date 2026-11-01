"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { resolveSamePageNavigation } from "./page-link";

type PageLinkProps = Omit<ComponentProps<typeof Link>, "href" | "scroll"> & {
  href: string;
};

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function PageLink({ href, onClick, ...props }: PageLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || isModifiedClick(event)) {
      return;
    }

    const samePageNavigation = resolveSamePageNavigation(
      window.location.href,
      href,
    );

    if (!samePageNavigation) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(
      window.history.state,
      "",
      samePageNavigation.href,
    );

    const target = samePageNavigation.targetId
      ? document.getElementById(samePageNavigation.targetId)
      : null;

    if (target) {
      target.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  return <Link {...props} href={href} scroll onClick={handleClick} />;
}
