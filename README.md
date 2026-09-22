# DreamHeaven

**Describe a building. Get a 3D model.**

DreamHeaven turns a written prompt into a 3D model of a house or building. Type what you want — *"a two-story modern house with a flat roof and a south-facing deck"* — and DreamHeaven generates a model you can view and rotate in the browser, so you can explore a design idea before committing to it.

**[Live Demo](https://your-demo.vercel.app)** · 

![DreamHeaven generating a 3D model from a prompt](./public/demo.gif)

---

## What it does

- **Prompt to model** — describe a house or building in plain language and get a 3D model back
- **Interactive viewer** — rotate, zoom, and inspect the result directly in the browser
- **Iterate** — refine your prompt and regenerate until the design matches what you had in mind
- **[Export]** — [download the model for use elsewhere]

## Who it's for

Anyone who wants to sketch out a building idea without CAD software — homeowners planning a renovation, designers exploring early concepts, or anyone curious what their description looks like in three dimensions.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D Rendering | [Three.js / React Three Fiber] |
| Model Generation | [your generation approach] |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/MouadSaber/DreamHeaven.git
cd DreamHeaven
npm install
