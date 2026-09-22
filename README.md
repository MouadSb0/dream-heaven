# DreamHeaven

**Describe a building. Get a 3D model.**

DreamHeaven turns a written prompt into a 3D model of a house or building. Type what you want — *"a two-story modern house with a flat roof and a south-facing deck"* — and DreamHeaven generates a model you can view and rotate in the browser, so you can explore a design idea before committing to it.

**[Live Demo](https://your-demo.vercel.app)** · 

<img width="1892" height="816" alt="Image" src="https://github.com/user-attachments/assets/2f8e930e-25fe-4898-8202-d57f1182a795" />
<img width="1896" height="501" alt="Image" src="https://github.com/user-attachments/assets/ad22e948-5a0b-4ef6-9bc4-ea91f982b436" />
<img width="1892" height="903" alt="Image" src="https://github.com/user-attachments/assets/a0a0eacf-dde6-43a4-bb1c-e20f49744977" />
<img width="1917" height="896" alt="Image" src="https://github.com/user-attachments/assets/2226526b-ff09-4436-b5eb-f4f564226889" />
<img width="1897" height="783" alt="Image" src="https://github.com/user-attachments/assets/33a03b0e-425d-475f-99ce-5b0d5e715a23" />

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
