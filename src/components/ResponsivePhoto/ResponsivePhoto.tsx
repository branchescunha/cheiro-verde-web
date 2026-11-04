import { getImageProps } from "next/image";

const desktopMediaQuery = "(min-width: 48rem)";

type ResponsivePhotoProps = {
  alt: string;
  className?: string;
  desktopSrc: string;
  mobileSrc: string;
  sizes: string;
};

export function ResponsivePhoto({
  alt,
  className,
  desktopSrc,
  mobileSrc,
  sizes,
}: ResponsivePhotoProps) {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    alt,
    className,
    src: desktopSrc,
    width: 1448,
    height: 1086,
    sizes,
  });
  const {
    props: { srcSet: mobileSrcSet, alt: resolvedAlt, ...imageProps },
  } = getImageProps({
    alt,
    className,
    src: mobileSrc,
    width: 1086,
    height: 1448,
    sizes,
  });

  return (
    <picture>
      <source media={desktopMediaQuery} srcSet={desktopSrcSet} />
      <img {...imageProps} srcSet={mobileSrcSet} alt={resolvedAlt} />
    </picture>
  );
}
