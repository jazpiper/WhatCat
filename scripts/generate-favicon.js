const sharp = require('sharp');
const fs = require('fs');
const https = require('https');

// 러시안 블루 이미지 URL
const CAT_IMAGE_URL = 'https://i3ylwjx1czcnizgm.public.blob.vercel-storage.com/whatcat/c1-z7CPwMgrp0uJDSZBo8YiDubjIgX46Z.jpeg';

// public 폴더 경로
const PUBLIC_DIR = '/home/ubuntu/clawd/WhatCat/public';

// 이미지 다운로드
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(outputPath);
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// favicon 생성
async function generateFavicon() {
  try {
    console.log('🐱 고양이 이미지 다운로드 중...');

    const tempImage = `${PUBLIC_DIR}/temp-cat.jpg`;
    await downloadImage(CAT_IMAGE_URL, tempImage);

    console.log('✅ 이미지 다운로드 완료');
    console.log('🎨 favicon 변환 중...');

    // 원본 이미지 로드
    const image = sharp(tempImage);
    const metadata = await image.metadata();

    // 정사각형 크롭 (가로와 세로 중 더 작은 크기 기준)
    const size = Math.min(metadata.width, metadata.height);
    const x = Math.floor((metadata.width - size) / 2);
    const y = Math.floor((metadata.height - size) / 2);

    // 다양한 favicon 크기 생성
    const sizes = [
      { name: 'favicon-16x16.png', size: 16 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'icon-192x192.png', size: 192 },
      { name: 'icon-512x512.png', size: 512 },
    ];

    for (const { name, size: iconSize } of sizes) {
      await image
        .clone()
        .extract({ left: x, top: y, width: size, height: size })
        .resize(iconSize, iconSize, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(`${PUBLIC_DIR}/${name}`);

      console.log(`✅ ${name} 생성 완료 (${iconSize}x${iconSize})`);
    }

    // ICO 형식 생성 (32x32 PNG로 대체)
    await image
      .clone()
      .extract({ left: x, top: y, width: size, height: size })
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(`${PUBLIC_DIR}/favicon.ico`);

    console.log('✅ favicon.ico 생성 완료 (PNG 포맷)');

    // 임시 파일 삭제
    fs.unlinkSync(tempImage);
    console.log('🗑️ 임시 파일 삭제 완료');

    console.log('\n🎉 favicon 생성 완료!');
    console.log('\n생성된 파일:');
    sizes.forEach(({ name }) => console.log(`  - public/${name}`));
    console.log('  - public/favicon.ico');

  } catch (error) {
    console.error('❌ 오류:', error.message);
    process.exit(1);
  }
}

generateFavicon();
