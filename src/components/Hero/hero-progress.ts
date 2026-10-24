type ScrollGeometry = {
  scrollY: number;
  sectionTop: number;
  sectionHeight: number;
  stickyHeight: number;
  stickyTop: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function calculateScrollProgress({
  scrollY,
  sectionTop,
  sectionHeight,
  stickyHeight,
  stickyTop,
}: ScrollGeometry) {
  const scrollStart = sectionTop - stickyTop;
  const scrollDistance = sectionHeight - stickyHeight;

  if (scrollDistance <= 0) {
    return 0;
  }

  return clamp((scrollY - scrollStart) / scrollDistance, 0, 1);
}

export function progressToVideoTime(progress: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  return clamp(progress, 0, 1) * duration;
}
