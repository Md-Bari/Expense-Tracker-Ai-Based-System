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

The Blueprint currently uses Render's Free web service and Free PostgreSQL
plans. This avoids selecting paid plans, but Render may suspend free services
when included usage is exhausted. The web service spins down after inactivity,
and its local filesystem is ephemeral, so uploaded receipts and reports can be
lost on restart, spin-down, or redeploy. Free PostgreSQL is limited to 1 GB and
expires 30 days after creation; export or migrate your data before then.
Render's included usage limits and terms can change. Django migrations and
static collection run at service startup.
