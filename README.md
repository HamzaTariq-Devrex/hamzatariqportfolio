# Hamza Tariq — Portfolio

Personal portfolio site for Hamza Tariq, Founder & Frontend Developer. A single-page, animation-heavy site featuring an interactive 3D character, scroll-driven GSAP timelines, and a project showcase carousel.

**Live site:** [hamzatariq.site](https://hamzatariq.site)

## Tech Stack

- **React 18** + **TypeScript** — UI and app structure
- **Vite** — dev server and build tooling
- **GSAP** (`ScrollTrigger`, `ScrollSmoother`, `SplitText`) — scroll-linked animation and text reveals
- **Three.js** / `three-stdlib` — the hero 3D character scene (GLTF + DRACO loading, custom lighting and animation mixing)
- **React Three Fiber**, **Drei**, **Rapier**, **@react-three/postprocessing** — the physics-based tech stack section
- **react-fast-marquee**, **react-icons** — UI utilities

## Running Locally

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

The dev server runs at `http://localhost:5173` by default (started with `--host`, so it's also reachable on your local network).

## Notes

- `ScrollSmoother` and `SplitText` are GSAP Club plugins. This project currently uses their trial builds (see `src/gsap-trial.d.ts`) — a paid GSAP Club membership is required to license them for a production deployment.
- The 3D character model (`public/models/character.glb`) ships encrypted (`character.enc`) and is decrypted client-side at load time as a light deterrent against casual asset copying.
