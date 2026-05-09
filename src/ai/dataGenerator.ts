import { PerformanceArchitectureSchema, PerformanceType, SpatialZone, Vector2 } from '../types/architecture';

export class DesignGenerator {
    private static SEED_PROMPTS = [
        "A minimalist black box theatre for experimental dance performances.",
        "A grand opera house with gold-leaf accents and perfect acoustics.",
        "A modern concert hall with floating acoustic panels and a glass lobby.",
        "A boutique gallery space designed for immersive VR installations.",
        "A community theatre with an open-air stage and flexible seating."
    ];

    public static generateSyntheticDesign(style: PerformanceType): PerformanceArchitectureSchema {
        const dimensions = this.getDimensionsForStyle(style);
        const zones = this.calculateZones(style, dimensions);

        return {
            projectName: `Project ${style.split(' ')[0]} ${Math.floor(Math.random() * 1000)}`,
            performanceType: style,
            totalCapacity: this.calculateCapacity(style, dimensions),
            dimensions,
            zones,
            metadata: {
                styleSource: "AI Generated Baseline",
                isSynthetic: true,
                aiModelVersion: "dreamhaven-architect-v1-seed"
            }
        };
    }

    private static getDimensionsForStyle(style: PerformanceType) {
        switch (style) {
            case 'Black Box': return { width: 20, length: 20, height: 8 };
            case 'Opera House': return { width: 80, length: 120, height: 35 };
            case 'Concert Hall': return { width: 40, length: 60, height: 18 };
            default: return { width: 30, length: 50, height: 12 };
        }
    }

    private static calculateZones(style: PerformanceType, dim: { width: number, length: number, height: number }): SpatialZone[] {
        const zones: SpatialZone[] = [];

        // Simple Stage Generation
        const stageWidth = dim.width * 0.8;
        const stageLength = dim.length * 0.3;
        zones.push({
            id: 'zone-stage-1',
            name: 'Main Stage',
            type: 'stage',
            area: stageWidth * stageLength,
            polygon: [
                { x: (dim.width - stageWidth) / 2, y: dim.length - stageLength },
                { x: (dim.width + stageWidth) / 2, y: dim.length - stageLength },
                { x: (dim.width + stageWidth) / 2, y: dim.length },
                { x: (dim.width - stageWidth) / 2, y: dim.length }
            ],
            technicalRequirements: { ceilingHeight: dim.height, acousticRating: 'A+' }
        });

        // Simple Seating Generation
        const seatingWidth = dim.width * 0.9;
        const seatingLength = dim.length * 0.5;
        zones.push({
            id: 'zone-seating-1',
            name: 'Auditorium Seating',
            type: 'seating',
            area: seatingWidth * seatingLength,
            polygon: [
                { x: (dim.width - seatingWidth) / 2, y: 0.2 * dim.length },
                { x: (dim.width + seatingWidth) / 2, y: 0.2 * dim.length },
                { x: (dim.width + seatingWidth) / 2, y: 0.2 * dim.length + seatingLength },
                { x: (dim.width - seatingWidth) / 2, y: 0.2 * dim.length + seatingLength }
            ],
            technicalRequirements: { ceilingHeight: dim.height * 0.8, acousticRating: 'A' }
        });

        // Technical Zone (Control Booth)
        zones.push({
            id: 'zone-tech-1',
            name: 'Technical Control Booth',
            type: 'technical',
            area: dim.width * 0.1 * 4,
            polygon: [
                { x: (dim.width * 0.45), y: 0 },
                { x: (dim.width * 0.55), y: 0 },
                { x: (dim.width * 0.55), y: 4 },
                { x: (dim.width * 0.45), y: 4 }
            ],
            technicalRequirements: { ceilingHeight: 3, powerCapacity: '100kW' }
        });

        // Backstage / Dressing Rooms
        const backstageWidth = dim.width;
        const backstageLength = dim.length * 0.1;
        zones.push({
            id: 'zone-backstage-1',
            name: 'Backstage & Loading',
            type: 'backstage',
            area: backstageWidth * backstageLength,
            polygon: [
                { x: 0, y: dim.length },
                { x: dim.width, y: dim.length },
                { x: dim.width, y: dim.length + backstageLength },
                { x: 0, y: dim.length + backstageLength }
            ],
            technicalRequirements: { ceilingHeight: dim.height * 0.6 }
        });

        return zones;
    }

    private static calculateCapacity(style: PerformanceType, dim: { width: number, length: number }): number {
        const seatingArea = (dim.width * 0.9) * (dim.length * 0.5);
        return Math.floor(seatingArea * 0.8); // 0.8 persons per sqm roughly
    }

    public static getRandomSeedPrompt(): string {
        return this.SEED_PROMPTS[Math.floor(Math.random() * this.SEED_PROMPTS.length)];
    }
}
