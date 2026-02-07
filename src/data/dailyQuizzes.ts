/**
 * Daily Quiz Data
 * Cat trivia questions for the daily quiz feature
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'behavior' | 'health' | 'care' | 'fun';
}

export const dailyQuizzes: QuizQuestion[] = [
  // Behavior Questions
  {
    id: 'q1',
    question: '고양이가 하루에 몇 시간 정도를 잠을 자나요?',
    options: ['4~8시간', '8~12시간', '12~16시간', '16~20시간'],
    correctIndex: 2,
    explanation: '고양이는 하루에 평균 12~16시간을 잡니다. 새끼 고양이는 20시간 이상 자기도 해요!',
    category: 'behavior',
  },
  {
    id: 'q2',
    question: '고양이의 꼬리가 쫑긋 서면 어떤 의미일까요?',
    options: ['화가 났다', '기분이 좋다', '무섭다', '졸리다'],
    correctIndex: 1,
    explanation: '고양이의 꼬리가 쫑긋 서면 기분이 좋거나 흥분했다는 뜻이에요!',
    category: 'behavior',
  },
  {
    id: 'q3',
    question: '고양이가 꾹꾹이를 하는 이유는 무엇일까요?',
    options: ['운동을 하려고', '편안함을 느껴서', '배가 곌라서', '장난을 치려고'],
    correctIndex: 1,
    explanation: '꾹꾹이는 고양이가 편안함과 안정감을 느낄 때 하는 행동이에요. 어미 고양이에게 젖을 먹을 때 했던 본능적인 행동이랍니다.',
    category: 'behavior',
  },
  {
    id: 'q4',
    question: '고양이가 사람의 언어로 몇 종류나 소리를 낼 수 있을까요?',
    options: ['10종류', '30종류', '50종류', '100종류 이상'],
    correctIndex: 3,
    explanation: '고양이는 목소리로만 100종류 이상의 소리를 낼 수 있어요! 각기 다른 의미를 전달하죠.',
    category: 'behavior',
  },
  {
    id: 'q5',
    question: '고양이의 코지문(코 점무늬)은 어떤 특징이 있을까요?',
    options: ['모든 고양이가 똑같다', '지문처럼 고유하다', '나이에 따라 변한다', '품종별로 같다'],
    correctIndex: 1,
    explanation: '고양이의 코지문은 사람의 지문처럼 각 고양이마다 고유해요!',
    category: 'behavior',
  },
  {
    id: 'q6',
    question: '고양이가 높은 곳을 좋아하는 이유는 무엇일까요?',
    options: ['춥지 않으려고', '주변을 관찰하기 위해', '잠을 잘 자려고', '숨으려고'],
    correctIndex: 1,
    explanation: '높은 곳은 고양이가 안전하다고 느끼면서도 주변을 내려다보며 관찰할 수 있는 좋은 위치랍니다.',
    category: 'behavior',
  },
  {
    id: 'q7',
    question: '고양이의 수염은 어떤 역할을 할까요?',
    options: ['장식용', '공간 감지', '온도 측정', '냄새 맡기'],
    correctIndex: 1,
    explanation: '고양이의 수염은 공간을 감지하는 중요한 감각 기관이에요. 좁은 통과를 할 수 있는지도 판단한다고 해요!',
    category: 'behavior',
  },
  {
    id: 'q8',
    question: '고양이가 헐떡거리면 어떤 상태일까요?',
    options: ['너무 더울 때', '배고플 때', '졸릴 때', '기쁠 때'],
    correctIndex: 0,
    explanation: '고양이가 헐떡이면 체온 조절이 어렵다는 뜻이에요. 너무 더운 환경일 수 있으니 시원한 곳으로 옮겨주세요.',
    category: 'behavior',
  },
  {
    id: 'q9',
    question: '고양이의 눈이 가늘어지면 어떤 상태일까요?',
    options: ['화가 났다', '느긋하고 편안하다', '무섭다', '아프다'],
    correctIndex: 1,
    explanation: '고양이의 눈이 가늘어지면 느긋하고 편안한 상태를 의미해요.',
    category: 'behavior',
  },
  {
    id: 'q10',
    question: '고양이가 배를 드러내고 누우면 어떤 의미일까요?',
    options: ['싸우려고', '신뢰를 표시', '배가 아파서', '스트레스받아서'],
    correctIndex: 1,
    explanation: '고양이가 배를 드러내는 것은 가장 취약한 부분을 보인다는 뜻으로, 주변에 대한 신뢰를 의미해요!',
    category: 'behavior',
  },
  // Health Questions
  {
    id: 'q11',
    question: '고양이의 평균 수명은 얼마 정도일까요?',
    options: ['5~10년', '10~15년', '15~20년', '20~25년'],
    correctIndex: 1,
    explanation: '고양이의 평균 수명은 약 15년 정도예요. 실내 고양이는 20년 이상 사는 경우도 많답니다!',
    category: 'health',
  },
  {
    id: 'q12',
    question: '고양이의 땀구멍은 어디에만 있을까요?',
    options: ['온몸', '발바닥만', '귀', '코'],
    correctIndex: 1,
    explanation: '고양이의 땀구멍은 발바닥에만 있어요! 그래서 더운 날에는 발바닥에 땀이 차기도 한답니다.',
    category: 'health',
  },
  {
    id: 'q13',
    question: '고양이가 목욕을 얼마나 자주 해줘야 할까요?',
    options: ['매일', '일주일에 한 번', '2주에 한 번', '목욕이 필요 없다'],
    correctIndex: 2,
    explanation: '고양이는 스스로 그루밍을 하지만, 2주에 한 번 정도 목욕을 해주면 피부와 털 건강에 좋아요.',
    category: 'health',
  },
  {
    id: 'q14',
    question: '고양이 손톱은 얼마나 자주 깎아줘야 할까요?',
    options: ['매일', '일주일에 한 번', '2주에 한 번', '한 달에 한 번'],
    correctIndex: 2,
    explanation: '고양이 손톱은 2주에 한 번 정도 깎아주는 것이 좋아요. 너무 길면 불편할 수 있어요!',
    category: 'health',
  },
  // Care Questions
  {
    id: 'q15',
    question: '고양이 사료를 너무 많이 주면 어떻게 될까요?',
    options: ['다 먹는다', '안 먹는다', '골라서 먹는다', '숨긴다'],
    correctIndex: 1,
    explanation: '고양이는 한 번에 너무 많은 사료를 주면 오히려 안 먹을 수 있어요. 적절한 양을 나누어 주는 것이 좋습니다.',
    category: 'care',
  },
  {
    id: 'q16',
    question: '고양이는 물을 얼마나 마시는 것을 선호할까요?',
    options: ['아주 많이', '적게', '전혀 안 마신다', '종류 상관없다'],
    correctIndex: 1,
    explanation: '고양이는 본래 물을 많이 마시는 동물이 아니에요. 충분한 물 섭취를 위해 물그릇을 여러 곳에 두는 것이 좋아요.',
    category: 'care',
  },
  {
    id: 'q17',
    question: '고양이 켄넬(집)에 있으면 좋은 것은 무엇일까요?',
    options: ['너무 추운 곳', '너무 더운 곳', '적당한 온도와 장난감', '어두운 곳'],
    correctIndex: 2,
    explanation: '고양이 켄넬은 적당한 온도를 유지하고, 장난감과 캣타워가 있으면 고양이가 훨씬 편안해해요!',
    category: 'care',
  },
  {
    id: 'q18',
    question: '고양이 캣타워는 왜 필요할까요?',
    options: ['장식용', '높은 곳에서 쉴 수 있어서', '숨으려고', '먹으려고'],
    correctIndex: 1,
    explanation: '캣타워는 고양이가 높은 곳에서 쉬고 관찰할 수 있어서 스트레스 해소에 도움이 돼요!',
    category: 'care',
  },
  // Fun Questions
  {
    id: 'q19',
    question: '고양이는 어떤 소리를 흉내 낼 수 있을까요?',
    options: ['개 소리', '새 소리', '다른 고양이 소리', '전부 가능'],
    correctIndex: 2,
    explanation: '고양이는 다른 고양이의 소리를 흉내 낼 수 있어요. 꽤 정확하게 흉내낸답니다!',
    category: 'fun',
  },
  {
    id: 'q20',
    question: '고양이는 집에서 얼마나 멀리 떨어진 곳에서도 돌아올 수 있을까요?',
    options: ['100m', '1km', '3km', '10km'],
    correctIndex: 2,
    explanation: '고양이는 놀라운 방향 감각을 가지고 있어서, 3km 떨어진 곳에서도 집으로 돌아올 수 있어요!',
    category: 'fun',
  },
  {
    id: 'q21',
    question: '새끼 고양이는 몇 주까지 "키틴"이라고 불릴까요?',
    options: ['4주', '6주', '10주', '12주'],
    correctIndex: 2,
    explanation: '고양이는 10주까지 "키틴(kitten)"이라고 불려요. 그 후에는 성묘로 성장하며 단계적으로 변해요.',
    category: 'fun',
  },
  {
    id: 'q22',
    question: '고양이는 하루에 몇 번이나 그루밍을 할까요?',
    options: ['1~5번', '10~15번', '20~30번', '50번 이상'],
    correctIndex: 2,
    explanation: '고양이는 하루에 20~30번 그루밍을 해요! 청결을 유지하고 스트레스를 해소하는 방법이랍니다.',
    category: 'fun',
  },
  {
    id: 'q23',
    question: '고양이가 귀를 돌리면 어떤 의미일까요?',
    options: ['화났다', '신나서', '졸려서', '아파서'],
    correctIndex: 1,
    explanation: '고양이가 귀를 돌리면 신나거나 주변 소리에 집중하고 있다는 뜻이에요!',
    category: 'fun',
  },
  {
    id: 'q24',
    question: '고양이가 꼬리를 사자처럼 쫑긋 세우면 어떤 상태일까요?',
    options: ['기분이 좋다', '기분이 나쁘다', '졸리다', '배고프다'],
    correctIndex: 1,
    explanation: '고양이의 꼬리가 사자처럼 쫑긋 서면 기분이 나쁘거나 경계하고 있다는 뜻이에요.',
    category: 'fun',
  },
  {
    id: 'q25',
    question: '고양이는 몇 마리부터 싸우기 시작할까요?',
    options: ['2마리', '3마리', '4마리', '5마리 이상'],
    correctIndex: 1,
    explanation: '고양이는 보통 3마리부터 영역 다툼 등으로 싸우기 시작해요. 2마리는 서로 잘 지내는 경우가 많답니다.',
    category: 'fun',
  },
];

/**
 * Get today's quiz based on the date
 * Returns the same quiz for everyone on the same day
 * @throws Error if quiz data is invalid or unavailable
 */
export function getTodaysQuiz(): QuizQuestion {
  // Validate quiz data exists
  if (!dailyQuizzes || dailyQuizzes.length === 0) {
    throw new Error('Quiz data is not available');
  }

  const today = new Date();
  // Use day of year to select quiz (changes every day)
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = dayOfYear % dailyQuizzes.length;
  const quiz = dailyQuizzes[index];

  // Validate quiz object
  if (!quiz || !quiz.question || !quiz.options || quiz.correctIndex === undefined) {
    throw new Error(`Invalid quiz data at index ${index}`);
  }

  return quiz;
}

/**
 * Safe version of getTodaysQuiz that returns null instead of throwing
 */
export function getTodaysQuizSafe(): QuizQuestion | null {
  try {
    return getTodaysQuiz();
  } catch (error) {
    console.error('[DailyQuizzes] Failed to get todays quiz:', error);
    return null;
  }
}

/**
 * Get the streak milestone badge info
 */
export interface StreakMilestone {
  days: number;
  emoji: string;
  title: string;
  message: string;
}

export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    days: 3,
    emoji: '🔥',
    title: '3일 연속!',
    message: '고양이 지킴이가 되셨네요!',
  },
  {
    days: 7,
    emoji: '⭐',
    title: '일주일 연속!',
    message: '진정한 고양이 애호가!',
  },
  {
    days: 14,
    emoji: '🌟',
    title: '2주 연속!',
    message: '고양이 박사님!',
  },
  {
    days: 30,
    emoji: '🏆',
    title: '한 달 연속!',
    message: '전설의 고양이 마스터!',
  },
];

export function getNextMilestone(streak: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m.days > streak) || null;
}

export function getMilestoneForStreak(streak: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m.days === streak) || null;
}
