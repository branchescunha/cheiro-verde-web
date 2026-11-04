# Guia técnico e operacional

Este documento resume a arquitetura, o processo de implantação e os cuidados de manutenção do Cheiro Verde. Dados comerciais e detalhes da biblioteca de mídia permanecem em seus módulos e documentos específicos.

## Arquitetura e organização

### Visão geral

O Cheiro Verde é uma aplicação Next.js 16 com App Router, React 19 e TypeScript. As páginas são pré-renderizadas no build e o projeto não possui backend, banco de dados, API própria, autenticação ou CMS.

A aplicação é organizada por responsabilidade:

- `src/app/`: rotas, layout global, metadata, arquivos especiais do App Router e estilos de página;
- `src/components/`: componentes globais e interativos;
- `src/data/`: conteúdo estático tipado, links e configuração de SEO;
- `src/lib/`: funções puras de tema e SEO;
- `public/media/`: marca, ícones, cardápio, fotografias, vídeos e posters usados em produção;
- `assets/branding/`: fontes e exports oficiais da marca, preservados fora das URLs públicas;
- `docs/`: documentação técnica do repositório.

### Rotas públicas

| Rota | Responsabilidade |
| --- | --- |
| `/` | apresentação do restaurante e Hero cinematográfica |
| `/cardapio` | bebidas e disponibilidade de sobremesas |
| `/marmitas` | opções de marmitas, taxas, horários e pedidos por WhatsApp |
| `/sobre` | história e evolução do restaurante |
| `/buffet` | integração editorial com o site oficial do Paladar Buffet |
| `/contato` | endereço, horários, contatos, benefícios e perguntas frequentes |

O App Router também gera `/robots.txt`, `/sitemap.xml` e `/manifest.webmanifest`. URLs inexistentes usam a página 404 personalizada.

### Componentes globais

- `Header`: marca, navegação responsiva, CTA de marmitas e controle do menu mobile;
- `Footer`: endereço, funcionamento, navegação, contatos e dados legais;
- `Hero`: seleção de vídeo oficial de 60 FPS por viewport e sincronização com o scroll, sem seeks concorrentes ou inércia;
- `ThemeToggle`: alternância e persistência local dos temas claro e escuro.
- `PageLink`: navegação interna com retorno ao topo, inclusive para a rota atual;
- `ResponsivePhoto`: seleção das fotografias desktop e mobile com otimização do Next.js.

Somente componentes que dependem de APIs do navegador usam a diretiva `"use client"`. As páginas e o layout permanecem como Server Components.

### Conteúdo e integrações

Os dados comerciais ficam em módulos TypeScript de `src/data/`. Alterações de cardápio, marmitas, horários, contatos e links devem começar nesses módulos para evitar divergências entre páginas.

As integrações são apenas links externos para WhatsApp, Google Maps, Instagram, e-mail e Paladar Buffet. Não há envio de formulários nem comunicação com serviços externos durante a renderização.

### Tema, acessibilidade e SEO

O design system e os temas ficam em `src/app/globals.css`. O tema claro é o padrão e a preferência manual é armazenada no navegador.

A aplicação inclui HTML semântico, foco visível, navegação por teclado, textos alternativos e tratamento de movimento reduzido. O SEO utiliza o domínio `https://restaurantecheiroverdedf.com.br`, centralizado em `src/data/seo.ts`: metadata e canonical por rota, Open Graph, Twitter Cards, imagem social oficial, JSON-LD `Restaurant`, robots e sitemap com as seis páginas públicas. A regra geral de rastreamento permite os buscadores, incluindo OAI-SearchBot, sem estabelecer uma política específica para treinamento de IA. A disponibilidade pública e a indexação devem ser verificadas após atualizar a hospedagem e concluir a propagação DNS.

## Preparação para implantação

O pacote de implantação deve ser criado somente depois que as alterações aprovadas estiverem integradas à `main`. Domínio e hospedagem do Cheiro Verde ainda precisam ser confirmados; as instruções abaixo pressupõem um ambiente Node.js compatível.

### 1. Preparar a branch

```bash
git switch main
git pull --ff-only origin main
git status --short
```

O último comando não deve exibir alterações. Nunca inclua arquivos locais, credenciais ou artefatos de build no pacote.

### 2. Instalar e validar

```powershell
npm ci
$testFiles = Get-ChildItem src -Recurse -Filter *.test.mjs | ForEach-Object { $_.FullName }
node --experimental-strip-types --test $testFiles
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

Se qualquer comando falhar, interrompa a publicação e corrija o problema em uma branch própria.

### 3. Gerar o ZIP rastreável

```bash
git archive --format=zip --output=cheiro-verde-web-deploy.zip HEAD
```

Esse comando empacota exatamente o commit atual. O arquivo `cheiro-verde-web-deploy.zip` é ignorado pelo Git e não deve ser commitado.

Antes do upload, registre o commit usado:

```bash
git rev-parse HEAD
git log -1 --oneline
```

### 4. Publicar na hospedagem confirmada

No ambiente Node.js configurado para o Cheiro Verde:

1. envie e extraia `cheiro-verde-web-deploy.zip` no diretório configurado para a aplicação;
2. instale as dependências com `npm ci`;
3. gere a aplicação com `npm run build`;
4. inicie ou reinicie o processo com `npm run start`;
5. mantenha configurações de domínio e infraestrutura no painel da hospedagem, nunca no ZIP.

O projeto não usa exportação estática e depende do servidor Next.js, inclusive para otimização de imagens. Redirecionamentos de domínio serão definidos somente após confirmação do endereço oficial.

### 5. Verificar após a publicação

- abrir o domínio oficial confirmado em mobile e desktop;
- testar as seis rotas públicas;
- confirmar temas claro e escuro, menu mobile e Hero;
- testar links de WhatsApp, Google Maps, Instagram, e-mail e Buffet;
- validar uma URL inexistente e a página 404;
- validar `/robots.txt`, `/sitemap.xml` e `/manifest.webmanifest`;
- validar os redirecionamentos de domínio quando forem configurados, preservando caminho e query string;
- verificar console do navegador, imagens e vídeos.

## Checklist de manutenção

### Dependências e segurança

Na auditoria de 03/11/2026, `npm audit --omit=dev` não apontou vulnerabilidades. O audit completo apontou 16 ocorrências moderadas associadas ao [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), sobre consumo excessivo de CPU e memória ao processar padrões glob maliciosos. A árvore contém `minimatch@3.1.5` e `10.2.6` nas ferramentas de desenvolvimento.

Pacotes sinalizados: `minimatch`, `eslint`, `eslint-config-next`, `@eslint-community/eslint-utils`, `@eslint/config-array`, `@eslint/eslintrc`, `@next/eslint-plugin-next`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `@typescript-eslint/type-utils`, `@typescript-eslint/typescript-estree`, `@typescript-eslint/utils`, `typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y` e `eslint-plugin-react`.

O risco residual envolve a disponibilidade do lint/CI ao processar entradas não confiáveis. Revisar alterações de configuração e dependências antes de executar contribuições externas. A correção deve ser avaliada em uma atualização compatível dos consumidores de `minimatch`; não aplicar automaticamente os downgrades principais sugeridos pelo audit nem forçar um override incompatível. Revalidar o audit antes da publicação.

### Conteúdo

- [ ] Atualizar dados comerciais em `src/data/`, sem duplicar strings nas páginas.
- [ ] Confirmar preços, horários, taxas, contatos e regras com o responsável pelo restaurante.
- [ ] Atualizar ou adicionar testes quando a estrutura dos dados mudar.
- [ ] Revisar mensagens de WhatsApp quando nomes ou preços de marmitas mudarem.

### Interface e mídia

- [ ] Validar alterações nos temas claro e escuro.
- [ ] Conferir mobile, tablet e desktop sem overflow horizontal.
- [ ] Preservar proporção, qualidade e direitos de uso das mídias.
- [ ] Não substituir vídeos, posters ou imagens aprovadas sem revisão visual.
- [ ] Atualizar `docs/media-assets.md` ao adicionar, substituir ou remover mídia.

### SEO e acessibilidade

- [ ] Manter um único `h1` e hierarquia de headings por página.
- [ ] Fornecer texto alternativo adequado para imagens informativas.
- [ ] Validar foco visível, teclado, contraste e `prefers-reduced-motion`.
- [ ] Atualizar metadata, sitemap e dados estruturados ao criar ou remover rotas.
- [ ] Não publicar dados estruturados não confirmados.

### Release

- [ ] Executar testes, lint, build e `git diff --check`.
- [ ] Revisar o diff completo e o status do Git.
- [ ] Integrar a mudança aprovada à `main` antes de gerar o ZIP.
- [ ] Gerar o pacote com `git archive` a partir do commit validado.
- [ ] Registrar o hash publicado e executar o checklist pós-implantação.
