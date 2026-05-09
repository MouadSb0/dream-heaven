export type PerformanceType = 'Concert Hall' | 'Theatre' | 'Black Box' | 'Gallery' | 'Opera House';

export interface Vector2 {
    x: number;
    y: number;
}

export interface SpatialZone {
    id: string;
    name: string;
    type: 'stage' | 'seating' | 'backstage' | 'lobby' | 'technical';
    polygon: Vector2[]; // Coordinates for SVG drawing
    area: number; // in square meters
    technicalRequirements?: {
        acousticRating?: string;
        powerCapacity?: string;
        ceilingHeight: number;
    };
}

export interface PerformanceArchitectureSchema {
    projectName: string;
    performanceType: PerformanceType;
    totalCapacity: number;
    dimensions: {
        width: number;
        length: number;
        height: number;
    };
    zones: SpatialZone[];
    metadata: {
        styleSource: string; // e.g., "Modernist", "Brutalist"
        aiModelVersion?: string;
        isSynthetic: boolean;
    };
}

export interface TrainingDataPair {
    prompt: string;
    design: PerformanceArchitectureSchema;
}
