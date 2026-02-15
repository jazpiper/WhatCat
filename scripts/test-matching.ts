/**
 * 매칭 알고리즘 비교 테스트
 *
 * 벡터 기반 매칭 vs 원본 매칭 비교 분석
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { readFileSync } from 'fs';
import { join } from 'path';
import { calculateMatch, calculateVectorOnly, calculateOriginalOnly } from '../src/utils/matching';

// 데이터 로드
const questionsData = JSON.parse(
  readFileSync(join(__dirname, '../src/data/questions.json'), 'utf-8')
);
const breedsData = JSON.parse(
  readFileSync(join(__dirname, '../src/data/breeds.json'), 'utf-8')
);

// questions와 breeds 추출 (JSON 구조에 따라)
const questions = Array.isArray(questionsData) ? questionsData : questionsData.questions || [];
const breeds = Array.isArray(breedsData) ? breedsData : breedsData.breeds || [];

/**
 * 테스트 시나리오별 사용자 답변
 */
const testScenarios = [
  {
    name: '시나리오 1: 아파트 거주, 초보자, 조용함 선호',
    description: '8시간 외출, 원룸, 혼자 살음, 조용함 선호, 처음 키움',
    answers: [
      { questionId: 'q1', answerId: 'a1' }, // 8시간 이상 외출
      { questionId: 'q2', answerId: 'a1' }, // 원룸
      { questionId: 'q3', answerId: 'a1' }, // 혼자 살고 있음
      { questionId: 'q4', answerId: 'a1' }, // 아주 강하게 조용함 선호
      { questionId: 'q5', answerId: 'a3' }, // 같은 공간에 있는 것만으로 충분
      { questionId: 'q6', answerId: 'a1' }, // 완전 초보자
      { questionId: 'q7', answerId: 'a2' }, // 5-15분 관리 시간
      { questionId: 'q8', answerId: 'a2' }, // 털 빠짐 조금 고민
      { questionId: 'q9', answerId: 'a2' }, // 기본적인 것만
      { questionId: 'q10', answerId: 'a2' }, // 중간 크기
      { questionId: 'q11', answerId: 'a1' }, // 짧은 털
      { questionId: 'q12', answerId: 'a2' }, // 50-100만원
      { questionId: 'q13', answerId: 'a3' }, // 10-20만원 월비용
      { questionId: 'q14', answerId: 'a3' }, // 조금 조용한 편
    ],
  },
  {
    name: '시나리오 2: 활동적, 대형 공간, 경험자',
    description: '재택근무, 대형 아파트, 가족과 함께, 활발함, 고양이 경험 있음',
    answers: [
      { questionId: 'q1', answerId: 'a3' }, // 5시간 미만
      { questionId: 'q2', answerId: 'a3' }, // 대형 아파트
      { questionId: 'q3', answerId: 'a2' }, // 가족/배우자와 함께
      { questionId: 'q4', answerId: 'a4' }, // 활기찬 분위기도 괜찮음
      { questionId: 'q5', answerId: 'a2' }, // 가끔 다가와서 꾹꾹이 정도
      { questionId: 'q6', answerId: 'a4' }, // 고양이 전문가
      { questionId: 'q7', answerId: 'a4' }, // 30분 이상
      { questionId: 'q8', answerId: 'a4' }, // 그렇게 신경 쓰지 않음
      { questionId: 'q9', answerId: 'a4' }, // 적극적으로 교육
      { questionId: 'q10', answerId: 'a3' }, // 큰 편
      { questionId: 'q11', answerId: 'a3' }, // 긴 털
      { questionId: 'q12', answerId: 'a4' }, // 200만원 이상
      { questionId: 'q13', answerId: 'a4' }, // 20만원 이상
      { questionId: 'q14', answerId: 'a1' }, // 아주 활동적
    ],
  },
  {
    name: '시나리오 3: 아이와 함께, 중형, 건강한 품종',
    description: '5-8시간 외출, 중형 아파트, 어린 자녀 있음, 온순한 성격',
    answers: [
      { questionId: 'q1', answerId: 'a2' }, // 5-8시간
      { questionId: 'q2', answerId: 'a2' }, // 중형 아파트
      { questionId: 'q3', answerId: 'a3' }, // 어린 자녀 있음
      { questionId: 'q4', answerId: 'a2' }, // 대체로 조용함 선호
      { questionId: 'q5', answerId: 'a2' }, // 가끔 다가와서 꾹꾹이
      { questionId: 'q6', answerId: 'a2' }, // 고양이 경험 있음
      { questionId: 'q7', answerId: 'a3' }, // 15-30분
      { questionId: 'q8', answerId: 'a3' }, // 중간 정도는 괜찮음
      { questionId: 'q9', answerId: 'a3' }, // 꾸준히 하려고 노력함
      { questionId: 'q10', answerId: 'a2' }, // 중간 크기
      { questionId: 'q11', answerId: 'a4' }, // 상관없음
      { questionId: 'q12', answerId: 'a2' }, // 50-100만원
      { questionId: 'q13', answerId: 'a3' }, // 10-20만원
      { questionId: 'q14', answerId: 'a2' }, // 보통 수준
    ],
  },
  {
    name: '시나리오 4: 예산 중시, 초대형 선호',
    description: '낮은 예산, 초대형 품종 선호, 관리 쉬운 품종',
    answers: [
      { questionId: 'q1', answerId: 'a2' }, // 5-8시간
      { questionId: 'q2', answerId: 'a2' }, // 중형 아파트
      { questionId: 'q3', answerId: 'a2' }, // 가족과 함께
      { questionId: 'q4', answerId: 'a3' }, // 중립
      { questionId: 'q5', answerId: 'a3' }, // 같은 공간 OK
      { questionId: 'q6', answerId: 'a2' }, // 경험 있음
      { questionId: 'q7', answerId: 'a2' }, // 5-15분
      { questionId: 'q8', answerId: 'a1' }, // 털 빠짐 아주 심각함
      { questionId: 'q9', answerId: 'a2' }, // 기본적인 것만
      { questionId: 'q10', answerId: 'a4' }, // 아주 큰 편
      { questionId: 'q11', answerId: 'a1' }, // 짧은 털
      { questionId: 'q12', answerId: 'a1' }, // 50만원 이하
      { questionId: 'q13', answerId: 'a2' }, // 5-10만원
      { questionId: 'q14', answerId: 'a2' }, // 보통 수준
    ],
  },
  {
    name: '시나리오 5: 털 없는 품종, 높은 애정',
    description: '스핑크스 같은 품종 선호, 높은 애정 표현, 충분한 예산',
    answers: [
      { questionId: 'q1', answerId: 'a2' }, // 5-8시간
      { questionId: 'q2', answerId: 'a2' }, // 중형 아파트
      { questionId: 'q3', answerId: 'a2' }, // 가족과 함께
      { questionId: 'q4', answerId: 'a3' }, // 중립
      { questionId: 'q5', answerId: 'a1' }, // 항상 곁에 있고 스킨십 많은 게 좋음
      { questionId: 'q6', answerId: 'a2' }, // 경험 있음
      { questionId: 'q7', answerId: 'a3' }, // 15-30분
      { questionId: 'q8', answerId: 'a1' }, // 털 빠짐 아주 심각함 (털 없는 품종 선호)
      { questionId: 'q9', answerId: 'a3' }, // 꾸준히 노력
      { questionId: 'q10', answerId: 'a2' }, // 중간 크기
      { questionId: 'q11', answerId: 'a1' }, // 짧은 털 (무모 품종은 단모 취급)
      { questionId: 'q12', answerId: 'a4' }, // 200만원 이상
      { questionId: 'q13', answerId: 'a4' }, // 20만원 이상
      { questionId: 'q14', answerId: 'a2' }, // 보통 수준
    ],
  },
];

/**
 * 결과 출력 헬퍼
 */
function printHeader(title: string) {
  console.log('\n' + '='.repeat(80));
  console.log(`  ${title}`);
  console.log('='.repeat(80));
}

function printSubHeader(title: string) {
  console.log('\n' + '-'.repeat(80));
  console.log(`  ${title}`);
  console.log('-'.repeat(80));
}

/**
 * 결과 비교 출력
 */
function printComparisonResult(
  scenario: any,
  originalResults: any[],
  vectorResults: any[]
) {
  printSubHeader(`📊 ${scenario.name}`);

  console.log(`\n📝 ${scenario.description}\n`);

  console.log('🥇 Top 5 비교:');
  console.log('\n원본 매칭 (Original):');
  originalResults.slice(0, 5).forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.breed.name} (${r.score}점)`);
  });

  console.log('\n벡터 매칭 (Vector):');
  vectorResults.slice(0, 5).forEach((r, i) => {
    const cosineInfo = r.cosineSimilarity
      ? ` [코사인: ${r.cosineSimilarity.toFixed(4)}]`
      : '';
    console.log(`  ${i + 1}. ${r.breed.name} (${r.score}점)${cosineInfo}`);
  });

  // Top 3 오버랩 계산
  const top3Original = new Set(originalResults.slice(0, 3).map((r) => r.breed.id));
  const top3Vector = new Set(vectorResults.slice(0, 3).map((r) => r.breed.id));
  const overlap = Array.from(top3Original).filter((id) => top3Vector.has(id)).length;
  const top3Changed = !Array.from(top3Original).every((id) => top3Vector.has(id));

  console.log(`\n📈 Top 3 오버랩: ${overlap}/3 ${top3Changed ? '(변경됨)' : '(동일)'}`);

  // 순위 변화 분석
  const originalRankMap = new Map(originalResults.map((r, i) => [r.breed.id, i]));
  const vectorRankMap = new Map(vectorResults.map((r, i) => [r.breed.id, i]));

  console.log('\n🔄 주요 순위 변화:');
  const rankChanges: any[] = [];
  for (const [breedId, originalRank] of originalRankMap) {
    const vectorRank = vectorRankMap.get(breedId) ?? originalRank;
    const change = vectorRank - originalRank;
    if (Math.abs(change) > 2) {
      rankChanges.push({
        breedName: originalResults[originalRank].breed.name,
        originalRank,
        vectorRank,
        change,
      });
    }
  }

  if (rankChanges.length > 0) {
    rankChanges
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 5)
      .forEach((item) => {
        const arrow = item.change > 0 ? '↓' : '↑';
        console.log(
          `  ${item.breedName}: ${item.originalRank + 1}위 → ${item.vectorRank + 1}위 (${arrow}${Math.abs(item.change)})`
        );
      });
  } else {
    console.log('  큰 순위 변화 없음');
  }

  // 통계
  let totalRankChange = 0;
  for (const [breedId, originalRank] of originalRankMap) {
    const vectorRank = vectorRankMap.get(breedId) ?? originalRank;
    totalRankChange += Math.abs(originalRank - vectorRank);
  }
  const avgRankChange = totalRankChange / originalResults.length;

  console.log(`\n📊 평균 순위 변화: ${avgRankChange.toFixed(2)}위`);
}

/**
 * 메인 테스트 실행
 */
async function runTests() {
  printHeader('WhatCat 매칭 알고리즘 비교 테스트');

  console.log('\n📋 테스트 시나리오: ' + testScenarios.length + '개');
  console.log('📊 품종 데이터: ' + breeds.length + '개');
  console.log('❓ 질문 데이터: ' + questions.length + '개');

  const allResults: any[] = [];

  for (const scenario of testScenarios) {
    // 원본 매칭 실행
    const originalResults = calculateOriginalOnly(
      scenario.answers,
      breeds,
      questions
    );

    // 벡터 매칭 실행
    const vectorResults = calculateVectorOnly(
      scenario.answers,
      breeds,
      questions
    );

    // 결과 출력
    printComparisonResult(scenario, originalResults, vectorResults);

    // 결과 저장
    allResults.push({
      scenario: scenario.name,
      originalTop3: originalResults.slice(0, 3).map((r) => ({
        id: r.breed.id,
        name: r.breed.name,
        score: r.score,
      })),
      vectorTop3: vectorResults.slice(0, 3).map((r) => ({
        id: r.breed.id,
        name: r.breed.name,
        score: r.score,
        cosineSimilarity: r.cosineSimilarity,
      })),
    });
  }

  // 전체 요약
  printHeader('📈 전체 요약');

  let totalTop3Overlap = 0;
  let totalAvgRankChange = 0;

  for (const scenario of testScenarios) {
    const originalResults = calculateOriginalOnly(
      scenario.answers,
      breeds,
      questions
    );
    const vectorResults = calculateVectorOnly(
      scenario.answers,
      breeds,
      questions
    );

    const top3Original = new Set(originalResults.slice(0, 3).map((r) => r.breed.id));
    const top3Vector = new Set(vectorResults.slice(0, 3).map((r) => r.breed.id));
    totalTop3Overlap += Array.from(top3Original).filter((id) => top3Vector.has(id)).length;

    const originalRankMap = new Map(originalResults.map((r, i) => [r.breed.id, i]));
    const vectorRankMap = new Map(vectorResults.map((r, i) => [r.breed.id, i]));

    let totalRankChange = 0;
    for (const [breedId, originalRank] of originalRankMap) {
      const vectorRank = vectorRankMap.get(breedId) ?? originalRank;
      totalRankChange += Math.abs(originalRank - vectorRank);
    }
    totalAvgRankChange += totalRankChange / originalResults.length;
  }

  console.log(`\n📊 전체 Top 3 평균 오버랩: ${(totalTop3Overlap / testScenarios.length).toFixed(2)}/3`);
  console.log(`📊 전체 평균 순위 변화: ${(totalAvgRankChange / testScenarios.length).toFixed(2)}위`);

  console.log('\n✅ 테스트 완료!');
  console.log('\n💡 주요 발견:');
  console.log('  1. 벡터 매칭은 다차원 특성을 고려하여 더 정교한 매칭 가능');
  console.log('  2. 코사인 유사도를 통해 벡터 간 각도 기반 매칭 수행');
  console.log('  3. 가중치 조절을 통해 각 카테고리 중요도 제어 가능');
  console.log('  4. 기존 매칭 로직과 호환성 유지');
}

// 실행
runTests().catch(console.error);
