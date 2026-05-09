import * as fs from 'fs';
import * as path from 'path';
import { DesignGenerator } from './dataGenerator';
import { PerformanceType, TrainingDataPair } from '../types/architecture';

const OUTPUT_DIR = path.join(process.cwd(), 'data', 'training');
const FILE_PATH = path.join(OUTPUT_DIR, 'initial_dataset.json');

const PERFORMANCE_STYLES: PerformanceType[] = [
    'Concert Hall',
    'Theatre',
    'Black Box',
    'Gallery',
    'Opera House'
];

function generateDataset(count: number) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const dataset: TrainingDataPair[] = [];

    for (let i = 0; i < count; i++) {
        const style = PERFORMANCE_STYLES[Math.floor(Math.random() * PERFORMANCE_STYLES.length)];
        const design = DesignGenerator.generateSyntheticDesign(style);
        const prompt = `${DesignGenerator.getRandomSeedPrompt()} Performance Style: ${style}.`;

        dataset.push({ prompt, design });
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(dataset, null, 2));
    console.log(`Successfully generated ${count} training pairs at ${FILE_PATH}`);
}

// Generate 50 initial pairs
generateDataset(50);
