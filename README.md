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
## Browse the application

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## prisma refresh
when you update schema don't forget to refresh the prisma generated files:
```
npx prisma generate
npx prisma db push
```
## reset DB (DEV ONLY)
when you need to start the DB from zero (after a major DB change)
```
npx prisma migrate reset
npx prisma db push
```
then you need to regen the category collection:
```
node scripts/seed.ts
```
## Setting up Stripe payment processing
To set up the Stripe payment in test mode:
```
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```
last line forwards the simulated webhooks to the listener.  It will also forward calls from PROD in TEST mode.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
- COURSE UPDATE:: 1:59:38/10:41:03 https://www.youtube.com/watch?v=Big_aFLmekI
- COURSE PROGRESSURL:: https://youtu.be/Big_aFLmekI?t=7178
---
- COURSE UPDATE:: 2:00:43/10:41:03 https://www.youtube.com/watch?v=Big_aFLmekI
- COURSE PROGRESSURL:: https://youtu.be/Big_aFLmekI?t=7243
---
- comment: uploader completed
- OLEGARIO PROGRESS TIMESTAMP REF: 3:15:12 https://youtu.be/Big_aFLmekI?t=11712
---