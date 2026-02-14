# How to Deploy to Vercel and Connect Neon Database

This guide will help you deploy your Sparx Engineering website to Vercel and connect it to the Neon database we set up.

## Prerequisites

1.  A [GitHub Account](https://github.com/) (where your code is hosted).
2.  A [Vercel Account](https://vercel.com/) (for hosting).
3.  Access to your [Neon Console](https://console.neon.tech/) (for the database connection string).

## Step 1: Push Code to GitHub

Make sure your latest code is pushed to your GitHub repository:
`https://github.com/adawaty/sparx-engineering-site`

## Step 2: Import Project to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`sparx-engineering-site`) and click **Import**.
4.  Vercel will detect it's a **Vite** project. The build settings should auto-configure:
    *   **Framework Preset:** Vite
    *   **Root Directory:** `./`
    *   **Build Command:** `npm run build` (or `pnpm run build`)
    *   **Output Directory:** `dist`

## Step 3: Configure Environment Variables

This is the most critical step to make the contact form and admin dashboard work.

1.  In the Vercel project deployment screen (or under **Settings > Environment Variables** if you already deployed), add the following variable:

    *   **Name:** `DATABASE_URL`
    *   **Value:** *Your Neon Connection String*

### How to get your Neon Connection String:

1.  Log in to the [Neon Console](https://console.neon.tech/).
2.  Select your project: **snowy-star-01684457**.
3.  Go to the **Dashboard** or **Connection Details**.
4.  Select the branch: **sparx_backend**.
5.  Copy the connection string. It looks like this:
    `postgres://neondb_owner:***********@ep-rest-of-host.aws.neon.tech/neondb?sslmode=require`

**Note:** Ensure you copy the **Pooled connection string** if available (good for serverless), or the Direct one.

## Step 4: Deploy

1.  Click **Deploy**.
2.  Wait for the build to finish.
3.  Once deployed, visit your new Vercel URL (e.g., `https://sparx-engineering-site.vercel.app`).

## Step 5: Verify Functionality

1.  Go to the **Contact Us** page and send a test message.
    *   You should see a success message.
2.  Go to `/admin` (e.g., `https://your-site.vercel.app/admin`).
    *   Login with password: `admin123`
    *   Go to the Dashboard. You should see your test message listed there!

## Troubleshooting

*   **White Screen?** Check the Vercel Logs (Functions tab) to see if there are backend errors.
*   **Database Error?** Ensure the `DATABASE_URL` is correct and includes the password.
*   **API 404?** Vercel automatically turns files in `/api` into serverless functions. If it fails, ensure your project structure has `api/contact.ts` at the root (which it does).
