import fs from 'fs';
import path from 'path';

interface Draw {
  id: string;
  author?: string;
  tags: string[];
  data: string; // base64
}

const sampleTags = [
  'nature', 'city', 'portrait', 'animal', 'abstract', 'sunset', 'mountain', 'ocean',
  'forest', 'night', 'day', 'colorful', 'dark', 'light', 'urban', 'fantasy', 'space',
  'people', 'flower', 'sky', 'river', 'beach', 'art', 'digital', 'painting', 'sketch'
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTags(arr: string[], count: number): string[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function useDrawings(): Promise<Draw[]> {
  try {
    if (randomInt(1, 10) > 5) {
        const drawingsFolder = path.join(process.cwd(), 'public/listTest');

        const files = fs.readdirSync(drawingsFolder)
        .filter((f) => f.endsWith('.png'))
        .sort((a, b) => parseInt(a) - parseInt(b));

        const response: Draw[] = files.map((file, index) => {
        const filePath = path.join(drawingsFolder, file);
        const fileBuffer = fs.readFileSync(filePath);
        const base64Data = `data:image/png;base64,${fileBuffer.toString('base64')}`;

        const tagCount = randomInt(5, 20);
        const tags = getRandomTags(sampleTags, tagCount);

        return {
            id: (index + 1).toString(),
            author: `Author ${index + 1}`,
            tags,
            data: base64Data,
        };
        });

        response.push({
            id: (response.length + 1).toString(),
            author: '',
            tags: [],
            data: '',
        });

        return response;
    } else {
        throw new Error('Simulated data loading error');
    }
    
  } catch (error) {
    console.error('Error loading drawings:', error);
    if (randomInt(1, 10) > 5) {
        return [];
    } else {
        throw new Error('Simulated error on retry');
    }

  }
}
