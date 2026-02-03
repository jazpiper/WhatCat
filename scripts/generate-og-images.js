#!/usr/bin/env node

/**
 * OG 이미지 생성 스크립트
 * 각 품종별로 OG 이미지를 생성합니다.
 */

const fs = require('fs');
const path = require('path');

const breeds = require('../src/data/breeds.json');
const publicDir = path.join(__dirname, '..', 'public');
const ogImagesDir = path.join(publicDir, 'og-images');

// OG 이미지 디렉토리가 없으면 생성
if (!fs.existsSync(ogImagesDir)) {
  fs.mkdirSync(ogImagesDir, { recursive: true });
}

// 기본 OG 이미지 생성
const defaultOgContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      text-align: center;
      padding: 40px;
    }
    .emoji {
      font-size: 120px;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 64px;
      font-weight: 800;
      margin: 0 0 20px 0;
      background: linear-gradient(to right, #ec4899, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .description {
      font-size: 28px;
      color: #4b5563;
      margin: 20px 0;
    }
    .features {
      font-size: 20px;
      color: #6b7280;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🐱</div>
    <h1>냥이 매치</h1>
    <div class="description">나와 가장 잘 맞는 고양이 품종 찾기</div>
    <div class="features">MBTI 스타일 테스트 • 20종의 인기 품종 • 인생냥이 발견</div>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(ogImagesDir, 'default.html'), defaultOgContent);
console.log('✅ 기본 OG 이미지 생성 완료: public/og-images/default.html');

// 각 품종별 OG 이미지 HTML 생성
breeds.breeds.forEach((breed) => {
  const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      display: flex;
      align-items: center;
      gap: 60px;
      padding: 60px;
    }
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
      text-align: right;
    }
    .emoji {
      font-size: 200px;
      line-height: 1;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 56px;
      font-weight: 800;
      margin: 0 0 16px 0;
      color: #1f2937;
    }
    h2 {
      font-size: 32px;
      font-weight: 600;
      margin: 0 0 20px 0;
      color: #6b7280;
    }
    .traits {
      font-size: 20px;
      color: #9ca3af;
      margin-top: 20px;
    }
    .match {
      font-size: 40px;
      font-weight: 700;
      background: linear-gradient(to right, #ec4899, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left">
      <div class="emoji">${breed.emoji}</div>
      <h1>${breed.name}</h1>
      <h2>${breed.nameEn}</h2>
      <div class="traits">${breed.traits.slice(0, 3).join(' • ')}</div>
    </div>
    <div class="right">
      <div class="match">나의 인생냥이!</div>
      <div style="font-size: 24px; color: #6b7280; margin-top: 20px;">
        냥이 매치로 발견
      </div>
    </div>
  </div>
</body>
</html>
`;

  fs.writeFileSync(path.join(ogImagesDir, `${breed.id}.html`), content);
});

console.log(`✅ ${breeds.breeds.length}개의 품종별 OG 이미지 HTML 생성 완료`);
console.log('\n📝 참고: 실제 이미지 생성은 Vercel OG 라이브러리 또는 Puppeteer를 사용하세요.');
console.log('https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation');
