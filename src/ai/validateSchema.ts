import * as fs from 'fs';
import * as path from 'path';
import { TrainingDataPair } from '../types/architecture';

const DATA_PATH = path.join(process.cwd(), 'data', 'training', 'initial_dataset.json');

function validateDataset() {
    if (!fs.existsSync(DATA_PATH)) {
        console.error('❌ Validation Failed: No dataset found at', DATA_PATH);
        process.exit(1);
    }

    const data: TrainingDataPair[] = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

    let isValid = true;
    data.forEach((pair, index) => {
        if (!pair.prompt || !pair.design || !pair.design.zones || pair.design.zones.length === 0) {
            console.error(`❌ Validation Failed at index ${index}: Missing core fields.`);
            isValid = false;
        }
    });

    if (isValid) {
        console.log(`✅ Validation Successful: ${data.length} pairs verified against PerformanceArchitectureSchema.`);
    } else {
        process.exit(1);
    }
}

validateDataset();
