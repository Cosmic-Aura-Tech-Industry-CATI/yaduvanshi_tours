const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const manojSrc = 'C:/Users/Shubh/Downloads/manoj yadav.png';
const anirudhSrc = 'C:/Users/Shubh/Downloads/anirudhra yadav.png';

const outputDir = 'c:/Users/Shubh/Desktop/DIMISI Client/yaduvanshi_tours/public/images';

async function processImages() {
  const manojMeta = await sharp(manojSrc).metadata();
  console.log('Manoj metadata:', manojMeta.width, 'x', manojMeta.height, manojMeta.format);

  const anirudhMeta = await sharp(anirudhSrc).metadata();
  console.log('Anirudh metadata:', anirudhMeta.width, 'x', anirudhMeta.height, anirudhMeta.format);

  // Convert Manoj Yadav photo to WebP
  await sharp(manojSrc)
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(outputDir, 'manoj-yadav.webp'));
  console.log('Processed manoj-yadav.webp');

  // Convert Anirudh Yadav photo to WebP
  await sharp(anirudhSrc)
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(outputDir, 'anirudh-yadav.webp'));
  console.log('Processed anirudh-yadav.webp');
}

processImages().catch(err => console.error(err));
