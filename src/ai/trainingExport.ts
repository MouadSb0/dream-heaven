import * as fs from 'fs';
import * as path from 'path';
import { TrainingDataPair } from '../types/architecture';

const RAW_DATA_PATH = path.join(process.cwd(), 'data', 'training', 'initial_dataset.json');
const OUTPUT_PATH = path.join(process.cwd(), 'data', 'training', 'lora_dataset.jsonl');

interface LoraFormat {
    instruction: string;
    input: string;
    output: string;
}

function exportForLoRA() {
    if (!fs.existsSync(RAW_DATA_PATH)) {
        console.error('No raw data found at', RAW_DATA_PATH);
        return;
    }

    const rawData: TrainingDataPair[] = JSON.parse(fs.readFileSync(RAW_DATA_PATH, 'utf-8'));

    // In a real scenario, we would also fetch data from our feedback database/localstorage here
    // but for this implementation, we'll format the synthetic data we have.

    const loraData: LoraFormat[] = rawData.map(pair => ({
        instruction: "Generate a structured architectural design based on the following prompt.",
        input: pair.prompt,
        output: JSON.stringify(pair.design, null, 2)
    }));

    const jsonlContent = loraData.map(item => JSON.stringify(item)).join('\n');

    fs.writeFileSync(OUTPUT_PATH, jsonlContent);
    console.log(`Successfully exported ${loraData.length} samples to ${OUTPUT_PATH}`);
}

exportForLoRA();
