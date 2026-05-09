export interface QuestionnaireData {
    dreamStatement: string;
    feelingWords: string;
    targetAudience: string;
    params: {
        style: string;
        floors: string;
        bedrooms: string;
        roof: string;
    };
    materials: {
        houseColor: string;
        roofColor: string;
        hasPool: boolean;
        hasSkylight: boolean;
        hasGarden: boolean;
    };
}

export function generateCinematicPrompt(data: QuestionnaireData): string {
    return `CINEMATIC AI VIDEO GENERATION DIRECTIVES
----------------------------------------
Project Goal: Transform the client's design brief into a hyper-realistic, emotionally evocative, and cinematic 3D video walkthrough of their dream home. The final output must not look like a sterile architectural rendering. It must feel lived-in, inviting, and deeply personal.

PHASE 1: THE CORE ESSENCE
-------------------------
- The Dream Statement: "${data.dreamStatement || 'A serene, light-filled sanctuary perfect for quiet weekends.'}"
- The Feeling: ${data.feelingWords || 'Serene, Warm, Organic'}
- Target Audience: ${data.targetAudience || 'The client and their family.'}
Every visual choice must answer: "Would this delight them?"

PHASE 2: CINEMATIC DIRECTIVES (THE "HOW")
-----------------------------------------
1. Camera as a Curious Guest: The camera moves with intention and a slight, natural human float. Gentle pans and pauses to admire details.
2. Lens Selection: 
   - Wide-angle (24-35mm): To establish spaciousness (${data.params.style} architecture, ${data.params.floors} floors).
   - Standard (50mm): For natural perspective of living spaces.
   - Portrait (85mm+): For intimate detail shots (steam from a coffee cup, texture of a throw blanket).
3. Lighting (The Lead Actor): Layered lighting. ${data.params.style} interior requires practical lamps, task lighting, accent lighting, and candlelight. The climax must feature the golden hour.
4. Atmosphere & Sound: Soft overcast morning light transitioning to sunny day, ending in golden hour. 
   [Sound Design Note: Layered ambient track. Gentle wind, faint birds, hum of a high-end refrigerator, delicate clink of ceramic, crackle of a fireplace.]

PHASE 3: MATERIAL & TEXTURE DIRECTIVES (THE "WHAT")
---------------------------------------------------
- Exterior Color: Hex ${data.materials.houseColor}
- Roof Material & Color: ${data.params.roof} style, Hex ${data.materials.roofColor}
- Wood: Show grain, slight color variations, subtle knots with a matte sheen.
- Stone: Depth, translucency, glossy veins.
- Glass: Accurate reflectivity/refraction, slight distortion of artisan-crafted glass.
${data.materials.hasPool ? '- Pool Water: Realistic ripples and caustics reflecting on adjacent walls.' : ''}
${data.materials.hasSkylight ? '- Skylight: Soft diffused god-rays entering the living space.' : ''}
${data.materials.hasGarden ? '- Garden: Organic foliage, distinct leaves moving in a subtle breeze.' : ''}
- Textiles: Soft linen, textured bouclé, or leather. Must have a slight, believable slouch.
- Imperfections: Faint smudges on stainless steel, fallen leaves outside, an askew book, a single autumn leaf on the windowsill.

PHASE 4: THE NARRATIVE JOURNEY (THE "WHERE")
--------------------------------------------
1. The Approach: Drone-style shot revealing the house nestled in its site. Soft morning light.
2. The Threshold: The camera moves to the front door, which gracefully opens.
3. The Great Reveal: Wide reveal of the main living space in this ${data.params.style} home.
4. The Heart: Move into the kitchen. Focus on hardware. A bowl of fresh fruit on the island.
5. The Connection: Glide toward large glass doors opening seamlessly to the outdoor living area.
6. Private Retreat: A slow move toward the primary bedroom (1 of ${data.params.bedrooms} bedrooms) with high-quality linens.
7. The Sanctuary: Deep soaking tub, steam rising. Reflection of sky in a large mirror.
8. The Finale: Climax back in the living space. Deep, warm golden hour light. Lamps lit, fireplace on.
9. Fade: Slowly fade to black with the crackling fire sound.

PHASE 5: FINAL TECHNICAL POLISH
-------------------------------
- Depth of Field: Shallow for close-ups, deep for wide establishing shots.
- Motion Blur: Minute, almost imperceptible motion blur to eliminate CGI strobing.
- Color Grading: Subtle, cinematic color grade. Desaturated warm tones, deep shadows, soft highlights (Kinfolk magazine aesthetic).
`;
}

export function getVideoAsset(style: string): { url: string, poster: string } {
    // Mapping architectural styles to high-quality cinematic stock videos (Mixkit)
    // These are reliable direct links that correctly provide duration metadata.
    const assets: Record<string, { url: string, poster: string }> = {
        'Modernist': {
            url: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-house-exterior-41315-large.mp4",
            poster: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        'Mid-century': {
            url: "https://assets.mixkit.co/videos/preview/mixkit-modern-house-exterior-with-a-pool-41316-large.mp4",
            poster: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        'Traditional': {
            url: "https://assets.mixkit.co/videos/preview/mixkit-modern-suburban-house-exterior-41313-large.mp4",
            poster: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    };

    // Default to Modernist if style not found
    return assets[style] || assets['Modernist'];
}
