# CliffCode

Portfólio responsivo em português com React, Vite, Tailwind CSS e Three.js. Inclui notebook / celular 3D com transformação do código em site ao rolar, catálogo de conceitos com filtros e prévias, formulário de orçamento para WhatsApp, perguntas frequentes e contato.

## Executar

Requer Node.js 22.12+ ou 24 LTS.

```sh
npm install
npm run dev
```

## Gerar e revisar o build

```sh
npm run build
npm run preview
```

O resultado está em `dist/`. Publique **o conteúdo** de `dist/` no diretório público da hospedagem (por exemplo `public_html` na Hostinger). Não envie `node_modules`, fontes ou arquivos `.env` para o servidor. O site não requer Node.js em produção nem um backend. O `base: './'` permite servir o build em uma subpasta.

## Contato

WhatsApp confirmado: **+55 (85) 99138-5292**. O formulário monta uma mensagem com nome, tipo de site e detalhes e abre `wa.me`; nenhum dado do formulário é armazenado ou enviado automaticamente. O cliente conclui o envio no WhatsApp.

Para mudar o número, copie `.env.example` para `.env`, preencha `VITE_WHATSAPP_NUMBER` com código do país, DDD e número, apenas dígitos, e gere um novo build. Sem configuração, o número confirmado acima é usado. Variáveis `VITE_` são públicas: não armazene segredos nelas.

Instagram: https://www.instagram.com/cliffcodedev/

## Estrutura e personalização

- `src/App.jsx`: seções, catálogo e componentes reutilizáveis de marca, arte, modal e orçamento. A lista `templates` centraliza textos, categorias e temas. As prévias são conceitos ilustrativos, não portfólios de clientes reais.
- `src/DeviceScene.jsx`: cena Three.js, texturas geradas por canvas e ciclo de vida do renderizador. Carregamento separado, descarte de recursos e alternativa caso WebGL não esteja disponível.
- `src/styles.css`: Tailwind e estilos responsivos. As cores principais são definidas em `:root`; fonte Neulis local enviada pela marca, sem dependência de Google Fonts.
- `src/main.jsx`: entrada React.

O slogan, os textos e a identidade visual foram propostos para esta primeira versão. As artes do catálogo são construídas em CSS e podem ser substituídas por capturas reais. O site respeita movimento reduzido, usa campos com rótulos e permite fechar a prévia com Escape. Sem analytics ou cookies adicionados.

## Revisão da identidade e do scroll

A identidade usa os PNGs originais em `public/brand` e quatro pesos Neulis em `public/fonts`. A paleta é preto, grafite e prata, extraída visualmente da marca. O pacote Salks não estava disponível nesta sessão, então essa família não foi incorporada.

`ScrollExperience` mantém a cena fixa durante 290svh e passa progresso normalizado ao Three.js: o notebook é revelado e o conteúdo percorre sua tela. No celular, a mesma sequência usa um telefone. Movimento reduzido elimina a etapa longa de scroll. O contato tem acesso no cabeçalho, no hero, após a cena e no botão flutuante.

Em ambientes Windows que bloqueiam o executável do esbuild, execute `npm run build:portable`. Essa alternativa usa esbuild WebAssembly dentro do processo Node e produz o mesmo diretório estático `dist`, com JavaScript minificado. O build Vite convencional continua disponível em `npm run build`.
