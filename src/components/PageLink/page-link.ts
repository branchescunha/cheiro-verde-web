export type SamePageNavigation = {
  href: string;
  targetId: string | null;
};

export function resolveSamePageNavigation(
  currentHref: string,
  destinationHref: string,
): SamePageNavigation | null {
  const currentUrl = new URL(currentHref);
  const destinationUrl = new URL(destinationHref, currentUrl);

  if (
    destinationUrl.origin !== currentUrl.origin ||
    destinationUrl.pathname !== currentUrl.pathname ||
    destinationUrl.search !== currentUrl.search
  ) {
    return null;
  }

  return {
    href: `${destinationUrl.pathname}${destinationUrl.search}${destinationUrl.hash}`,
    targetId: destinationUrl.hash
      ? decodeURIComponent(destinationUrl.hash.slice(1))
      : null,
  };
}
