# Backend deployment

## Local environment

The backend loads the repository-root `.env` file when starting Django. Copy
`.env.example` from the repository root to `.env` and adjust the local values.
The `.env` file is ignored by Git; do not commit real credentials.

## Deploy to Render

1. Push the repository to GitHub and create a Render Blueprint from the
   repository root. Render reads `render.yaml` to create the backend and
   PostgreSQL database.
2. Add the real `GROQ_API_KEY` and `ELEVENLABS_API_KEY` values in the Render
   service environment if those integrations are used.
3. Deploy the frontend to Vercel with `frontend` as its root directory. Set
   `INTERNAL_BACKEND_URL` in Vercel to the Render backend origin (no trailing
   slash or `/api` suffix), then redeploy. See [frontend deployment](../frontend/DEPLOYMENT.md).

The Blueprint provisions a Starter web service, a small managed PostgreSQL
database, and a persistent disk mounted at `/var/data`. The Starter service and
database may incur charges. The disk keeps receipt and report uploads across
deploys; removing it or changing its mount path can make existing uploads
unavailable. Django migrations and static collection run at service startup.
