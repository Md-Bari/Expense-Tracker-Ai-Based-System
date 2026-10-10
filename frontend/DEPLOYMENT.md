# Deploy frontend to Vercel

Deploy the backend first using the root `render.yaml` Blueprint. Once Render
shows the backend service URL (for example,
`https://expense-tracker-backend.onrender.com`), configure the Vercel project:

1. Import this repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Keep the detected **Next.js** framework and build command (`npm run build`).
4. In **Project Settings → Environment Variables**, add
   `INTERNAL_BACKEND_URL` with the Render backend's origin. Do not add a trailing
   slash or `/api` suffix. Enable it for Production and Preview deployments.
5. Redeploy after adding or changing the variable.

The frontend sends API requests to its own `/api` routes. Next.js rewrites proxy
those requests (and `/media` requests) to `INTERNAL_BACKEND_URL`, so the browser
does not need a public API URL or cross-origin API access. Do not set
`NEXT_PUBLIC_API_URL` for this setup.

If a custom Vercel domain is used, it can be set as `CORS_ALLOWED_ORIGINS` on
Render only if making direct cross-origin requests to the backend; the normal
Vercel rewrite/proxy setup does not require it.
