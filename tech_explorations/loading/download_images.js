const https = require('https');
const fs = require('fs');
const path = require('path');

const carOptions = [
    'Ford F-Series 2025 review',
    'Chevrolet Silverado 2025 review',
    'Toyota RAV4 2025 review',
    'Tesla Model Y 2025 review',
    'Honda CR-V 2025 review',
    'Ram Pickups 2025 review',
    'GMC Sierra 2025 review',
    'Toyota Camry 2025 review',
    'Nissan Rogue 2025 review',
    'Honda Civic 2025 review',
    'Chevrolet Equinox 2025 review',
    'Toyota Corolla 2025 review',
    'Jeep Grand Cherokee 2025 review',
    'Hyundai Tucson 2025 review',
    'Chevrolet Trax 2025 review'
];

async function fetchCarImage(carName) {
    return new Promise((resolve, reject) => {
        https.get(`https://cars.swizzl.ai/cars/images/${encodeURIComponent(carName)}`, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData && jsonData.length > 0 && jsonData[0].link) {
                        resolve(jsonData[0].link);
                    } else {
                        reject(new Error('No image URL found'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download: ${res.statusCode}`));
                return;
            }
            const fileStream = fs.createWriteStream(filename);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', reject);
    });
}

async function main() {
    for (let i = 0; i < carOptions.length; i++) {
        const car = carOptions[i];
        try {
            const imageUrl = await fetchCarImage(car);
            const filename = path.join('images', `car${i + 1}.jpg`);
            console.log(`Downloading ${car} to ${filename}...`);
            await downloadImage(imageUrl, filename);
            console.log(`Downloaded ${car}`);
        } catch (error) {
            console.error(`Error downloading ${car}:`, error.message);
        }
    }
}

main();
