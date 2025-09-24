#!/usr/bin/env node

// Simple script to identify and suggest compression for large images
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const LARGE_IMAGE_THRESHOLD = 1024 * 1024; // 1MB

async function findLargeImages(dir, basePath = '') {
  const largeImages = [];
  
  try {
    const entries = await readdir(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        const subImages = await findLargeImages(fullPath, join(basePath, entry));
        largeImages.push(...subImages);
      } else if (stats.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry)) {
        if (stats.size > LARGE_IMAGE_THRESHOLD) {
          largeImages.push({
            path: join(basePath, entry),
            size: stats.size,
            sizeFormatted: (stats.size / 1024 / 1024).toFixed(2) + 'MB'
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return largeImages;
}

async function main() {
  console.log('🔍 Scanning for large images...\n');
  
  const largeImages = [
    ...(await findLargeImages('src/assets')),
    ...(await findLargeImages('public/images'))
  ];
  
  if (largeImages.length === 0) {
    console.log('✅ No large images found!');
    return;
  }
  
  largeImages.sort((a, b) => b.size - a.size);
  
  console.log(`⚠️  Found ${largeImages.length} large images (>1MB):\n`);
  
  largeImages.forEach((img, index) => {
    console.log(`${index + 1}. ${img.path} (${img.sizeFormatted})`);
  });
  
  console.log('\n💡 Recommendations:');
  console.log('1. Use online tools like TinyPNG or Squoosh.app to compress images');
  console.log('2. Convert large JPEGs to WebP format for better compression');
  console.log('3. Consider using different image sizes for mobile vs desktop');
  console.log('4. For hero images, aim for under 500KB after compression');
}

main().catch(console.error);