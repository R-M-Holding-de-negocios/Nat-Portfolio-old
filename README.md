# Natália Menezes Reis — landing page

Site estático em português do Brasil, preparado para tráfego pago com foco em levar o visitante ao WhatsApp. Segue AGENTS.md e DESIGN.md. Astro + TypeScript + CSS nativo, sem framework de UI no cliente. Dados de contato em `src/data/professional.ts`; textos em `src/data/content.ts`.

## Comandos

Requer Node.js 22.12+.

- `npm ci` — instalar versões do lockfile.
- `npm run dev` — desenvolvimento em http://127.0.0.1:4321.
- `npm run check` — conferir tipos e arquivos Astro.
- `npm run build` — gerar o site estático em `dist/`.
- `npm run preview` — visualizar o build local.
- `node scripts/verify-animation-lifecycle.mjs` — teste do ciclo das animações de entrada.

## Conversão (WhatsApp)

- Todos os CTAs abrem `wa.me/557588634101` com mensagem neutra já preenchida ("Olá, Natália! Gostaria de saber mais sobre o atendimento online."). Nada é enviado automaticamente.
- CTAs no cabeçalho (desktop), topo, após os temas, em "Como funciona", após as dúvidas e no contato. Os principais trazem a nota "Abre uma conversa no WhatsApp para você tirar dúvidas antes de agendar."
- Mobile: barra fixa de WhatsApp aparece depois que o CTA do topo sai da tela e some na seção de contato. Sem JavaScript, fica sempre visível.
- Contato mostra WhatsApp e e-mail; o Instagram foi para o rodapé para não desviar o clique.

## Desempenho

- Sem React, GSAP, Motion, Tailwind ou Animate.css. Navegação com destaque deslizante, cards dos temas e botões são HTML/CSS com um script pequeno (`src/scripts/site.ts`).
- Build atual: CSS ~16,5 kB e JavaScript inline de poucos kB (antes: ~430 kB de JS e ~87 kB de CSS).
- O topo (título e retrato) não passa pela animação de entrada, para aparecer já na primeira pintura. Retrato em WebP com `srcset`, `loading=eager` e `fetchpriority=high`.
- LCP, CLS e INP ainda não foram medidos em dispositivo real; medir com PageSpeed Insights após publicar.

## SEO e compartilhamento

- Favicon NM em `public/favicon.svg`.
- Imagem Open Graph 1200×630 gerada do retrato no build. Ela só vira URL absoluta (exigida por WhatsApp/Facebook) quando `site` for definido em `astro.config.mjs` com o domínio real.
- Preview com `noindex, nofollow`. Ao publicar: definir `site`, revisar robots, canonical e sitemap.

## Pendências

- Domínio definitivo (ativa a imagem de prévia e canonical).
- Medição de conversão (pixel/Google Ads) depende de aprovação da Natália, aviso de privacidade e consentimento (LGPD); o AGENTS.md hoje não permite.
- Informações opcionais que podem reduzir objeções, se a Natália quiser fornecer: duração da sessão, plataforma da chamada, valor.
- Fontes Aileron/Poppins licenciadas; hoje usam Arial como fallback.
- Verificado em navegador (desktop e 390px): navegação ativa, menu mobile com Escape, barra fixa, sem rolagem horizontal. Auditoria automatizada de acessibilidade e zoom 200% ainda pendentes.
