# Biblioteca de mídia

As mídias públicas do Cheiro Verde ficam centralizadas em `public/media/`. Os arquivos-fonte oficiais da marca permanecem em `assets/branding/` e não devem ser usados diretamente como URLs públicas.

## Estrutura pública

```text
public/media/
├── brand/
├── icons/
├── menu/
├── photos/
│   ├── desktop/
│   └── mobile/
└── videos/
```

## Fotografias

`public/media/photos/desktop/` e `public/media/photos/mobile/` contêm sete pares responsivos do Cheiro Verde:

- `barbecue-corner`;
- `buffet-hot-food`;
- `buffet-salads`;
- `dining-room-center`;
- `dining-room-side`;
- `facade-close`;
- `facade-wide`.

As versões desktop possuem 1448 × 1086 pixels e as versões mobile possuem 1086 × 1448 pixels. Os 14 arquivos são as fotografias definitivas do Cheiro Verde.

`public/media/photos/paladar-buffet-site-preview.webp` apresenta o site externo da parceria legítima com o Paladar Buffet.

## Vídeos e posters da Hero

Os recursos definitivos da Hero ficam em `public/media/videos/`:

- `cheiro-verde-hero-desktop.mp4`;
- `cheiro-verde-hero-mobile.mp4`;
- `cheiro-verde-hero-desktop-poster.webp`;
- `cheiro-verde-hero-mobile-poster.webp`.

Os vídeos usam H.264, 60 FPS, `yuv420p`, faststart e keyframes a cada 250 ms para equilibrar qualidade, tamanho e resposta do scroll scrub. O componente `src/components/Hero/Hero.tsx` seleciona a versão adequada ao viewport e mantém o carregamento e o suporte a movimento reduzido. Os posters WebP correspondem ao primeiro quadro dos vídeos.

A versão definitiva utiliza os vídeos de 60 FPS em todos os ambientes. O experimento de 120 FPS e sua rota A/B foram encerrados. O scroll scrub mede a geometria na inicialização e no resize, evita seeks redundantes e mantém apenas o alvo pendente mais recente, sem inércia.

## Marca e ícones

`public/media/brand/` contém as logos Light e Dark de produção e a imagem social do Cheiro Verde. Os masters continuam em `assets/branding/`.

`public/media/icons/` contém favicons PNG de 16 e 32 pixels, Apple Touch Icon de 180 pixels e ícones PWA de 192 e 512 pixels. O ícone maskable de 512 pixels possui margem de segurança ampliada. O favicon do App Router fica em `src/app/favicon.ico`.

## Cardápio

`public/media/menu/menu-drinks.webp` é a fotografia compartilhada do cardápio de bebidas. O conteúdo e a compressão do arquivo original foram preservados.

## Regras de manutenção

- Usar nomes em inglês, minúsculos e separados por hífen.
- Manter apenas mídias com uso atual ou finalidade documentada.
- Não alterar os masters em `assets/branding/`.
- Comparar visualmente substituições e validar desktop e mobile.
- Atualizar este documento e as referências em `src/` na mesma mudança.
- Não armazenar arquivos temporários, candidatos ou exports de revisão no conjunto público final.
