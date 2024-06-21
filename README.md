### Michał Silski C4 157132
# Zaliczenie "Popularne frameworki JavaScript"

## Użyte narzędzia oraz biblioteki/frameworki:

- TypeScript
- Next.js 13  (Wraz z server components, oraz wbudowanym webServerem - REST API również przy pomocy next.js)
- React
- PostgreSQL
- Prisma ORM 
- CSS Modules
- Puppeteer 

## Przykładowe rozwiązane problemy:

- Korzystając z obfitości udogodnień które dostarcza next.js, pozwoliłem sobie na wykorzystanie SSG (Static-Site-Generation) oraz SSR (Server-Side-Rendering) tam gdzie to tylko możliwe. Generując strony przy pomocy SSG (np. "About us"), zyskujemy bardzo dużo na wydajności i zmniejszamy obciązenie backendu i bazy, bo serwer odrazu zwraca nam pre-renderowany HTML. 
- Dzięki korzystaniu z CSS Modules zadbałem o lepszą modularność i porządek w pisaniu styli CSS. Każdy komponent reacta, ma swój moduł CSS.
- Użyłem Prismy jako konektora do bazy danych PostgreSQL, oraz jako ORM gdzie zmapowałem encje oraz widoki
- Po stronie bazy, użyłem zmaterializowanych widoków dla rankingów cen i wartości odżywzych (jako że produkty zmieniają się bardzo rzadko). Dzięki temu mniej obciążam bazę danych.
- Użyłem również triggerów oraz funkcji w PostgreSQL do generowania slug-ów, czyli skróconych nazw produktów w URL  (np. male-frytki)
- Puppeteer użyłem jako web-scrapera do pobrania cen produktów
- Za pomocą LRU-Cache, zaimplementowałem rate-limit do aplikacji
- Bardzo mocno również polegałem na cachowaniu, wszystkie strony z pojedynczymi produktami, cachują się u klienta


------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
