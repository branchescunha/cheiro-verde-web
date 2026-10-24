# Biblioteca de mídia

Este documento registra a organização atual das imagens e vídeos do Paladar Web. As mídias de produção não devem ser substituídas sem comparação visual e validação nos breakpoints em que são usadas.

## Vídeos e posters da Hero

Os arquivos públicos usados pela Hero ficam em:

- `public/videos/hero/paladar-hero-desktop.mp4`;
- `public/videos/hero/paladar-hero-mobile.mp4`;
- `public/images/site/paladar-hero-poster-desktop.webp`;
- `public/images/site/paladar-hero-poster-mobile.webp`.

O componente `src/components/Hero/Hero.tsx` seleciona a versão adequada ao viewport e sincroniza o tempo do vídeo com o scroll. Os MP4 de produção usam H.264 ALL-INTRA para manter o seeking do scrubbing. As fontes originais preservadas ficam em `assets/hero-video-sources/` e não são servidas pelo site.

## Referências da Hero

`assets/hero-references/` contém as 12 referências aprovadas que deram origem à narrativa visual dos vídeos. A sequência é fachada → entrada → interior → buffet → churrasqueira → mesas.

| Arquivo | Dimensões | Proporção |
| --- | ---: | ---: |
| `desktop/facade.jpg` | 1664 × 936 | 16:9 |
| `desktop/entrance.jpg` | 1440 × 810 | 16:9 |
| `desktop/interior.jpg` | 1280 × 720 | 16:9 |
| `desktop/buffet.jpg` | 1664 × 936 | 16:9 |
| `desktop/grill.jpg` | 1536 × 864 | 16:9 |
| `desktop/tables.jpg` | 1664 × 936 | 16:9 |
| `mobile/facade.jpg` | 936 × 1664 | 9:16 |
| `mobile/entrance.jpg` | 576 × 1024 | 9:16 |
| `mobile/interior.jpg` | 630 × 1120 | 9:16 |
| `mobile/buffet.jpg` | 936 × 1664 | 9:16 |
| `mobile/grill.jpg` | 864 × 1536 | 9:16 |
| `mobile/tables.jpg` | 864 × 1536 | 9:16 |

Esses arquivos são referências preservadas. Apenas `facade.jpg` e `tables.jpg`, em versões específicas, também são importados pela página Sobre para composições responsivas.

## Marca e identidade

`public/images/brand/` contém os ativos públicos da marca:

| Arquivo | Finalidade |
| --- | --- |
| `paladar-logo-dark.jpg` | fonte raster preservada em fundo escuro |
| `paladar-logo-light.jpg` | fonte raster preservada em fundo claro |
| `paladar-logo-transparent.png` | logo transparente usada no Header, Footer e dados estruturados |
| `paladar-social-preview.jpg` | imagem social de 1200 × 630 para Open Graph e Twitter Cards |

Favicons, ícones comuns, Apple Touch Icon e ícone maskable ficam em `public/icons/`. O favicon do App Router também está em `src/app/favicon.ico`.

## Imagens públicas do site

| Arquivo | Uso atual |
| --- | --- |
| `restaurant-facade.webp` | Home e Sobre |
| `restaurant-entrance.webp` | Home |
| `restaurant-interior.webp` | Sobre |
| `restaurant-buffet.webp` | Home |
| `restaurant-grill.webp` | Home |
| `paladar-menu-drinks.webp` | Cardápio |
| `paladar-buffet-site-preview.webp` | página Buffet |
| `paladar-buffet-event.webp` | biblioteca aprovada, sem referência atual em `src/` |
| `paladar-hero-poster-desktop.webp` | poster desktop da Hero |
| `paladar-hero-poster-mobile.webp` | poster mobile da Hero |

As fontes preservadas para rastreabilidade ficam em `assets/site-sources/`. Esses arquivos não devem ser usados diretamente como URLs públicas.

## Regras de manutenção

- Não sobrescrever fontes preservadas ao criar derivados.
- Usar nomes em inglês, minúsculos e separados por hífen.
- Manter somente mídias com uso atual ou finalidade documentada.
- Otimizar derivados públicos sem alterar identidade, composição ou conteúdo aprovado.
- Comparar visualmente qualquer substituição com sua fonte e validar desktop e mobile.
- Atualizar este documento e as referências em `src/` na mesma mudança.
- Não armazenar arquivos temporários, candidatos, contact sheets ou exports de revisão no conjunto final.
