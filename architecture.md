# DreamHaven Architect: Technical Architecture & Vision

## 1. Project Overview
DreamHaven Architect is an AI-powered platform that democratizes architectural design. By combining LLMs, generative 3D modeling, and cinematic rendering, it allows anyone to visualize their dream home.

## 2. Core Components

### Frontend (Next.js + Three.js)
- **Design Studio**: The primary workspace where users interact with the AI.
- **3D Preview Engine**: Uses `@react-three/fiber` to render a real-time, interactive preview of the house. 
- **Dynamic Materials**: Reflects color and material choices (wood, glass, steel) instantly.
- **Responsive Layout**: Designed for high-end desktop experience with glassmorphism aesthetics.

### Backend Orchestration (Conceptual)
- **Prompt Parser**: An LLM (e.g., GPT-4o) that transforms natural language into architectural parameters (style: "mid-century", rooms: 4, roof: "flat").
- **Design Generator**: A specialized diffusion model that generates 2D floor plans (vector/SVG) and 3D meshes (GLTF).
- **Video Pipeline**: Integrates with APIs like Sora or a cloud-based Unreal Engine instance to render 4K walkthroughs based on the 3D scene.

## 3. Implementation Progress
- [x] Initial Project Setup (Next.js 15, TypeScript).
- [x] Global Design System (globals.css).
- [x] Landing Page with Pricing Tiers.
- [x] Functional 3D Component with Asymmetrical Modern Architecture.
- [x] Design Studio with Prompt Interface & Material Controls.
- [ ] Backend API Integration for Persistence.
- [ ] 2D Floor Plan Generation logic.
- [ ] Video Walkthrough API Integration.

## 4. Design Philosophy
- **Rich Aesthetics**: High contrast, subtle gradients, and glass blur for a premium feel.
- **User-Centric**: Natural language is the primary input, lowering the barrier to entry for architectural visualization.
- **Iterative Refinement**: The "Refinement Engine" allows users to tweak designs without losing the core concept.

## 5. Next Steps
1. Implement a mock "Floor Plan" view in the Studio.
2. Add a "Showcase" gallery to the Landing Page.
3. Set up the API routes for user authentication and design saving.
