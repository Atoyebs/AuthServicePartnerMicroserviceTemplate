This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Purpose

The purpose of this repository is to demonstrate/show a proof of concept for a microservice being authenticated against a separate Authentication Service.

## Authentication Microservice

The Authentication microservice will use the [Supertokens framework](https://supertokens.com) to handle (and simplify) Authentication.

To run a working instance of the Auth Service, **fork** or **clone** from [this repo](https://github.com/Atoyebs/AuthServiceTemplate) and play around with the environment variables in the `.env.development` file or `.env` file to configure the **Auth Service** accordingly.

## Auth Service Partner Microservice Template (This Repo)

This repo will act as a POC (proof of concept), **working in tandem** with an **Authentication Microservice (Instance)**. This will largely follow the guide laid out in the [Supertokens Microservice Authentication Doc](https://supertokens.com/docs/microservice_auth/introduction).

The goal of this is to prove that, **with a working Authentication Service** _(out of the box)_ another _(separate)_ backend service _(this repo)_ can still access user information, including session verification and session data _without knowing too much about the inner workings of the Authentication Service_.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
