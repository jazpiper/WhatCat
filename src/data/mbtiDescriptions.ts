import { MBTICode, CatMBTI } from '@/utils/catMBTI';

export const mbtiDescriptions: Record<MBTICode, CatMBTI> = {
  INTJ: {
    code: 'INTJ',
    nickname: '전략가 냥이',
    description: '독립적이고 분석적인 성격으로, 목표를 향해 전략적으로 행동합니다. 조용하지만 자신만의 방식으로 주인에게 깊은 애정을 표현합니다.',
    emoji: '🎯',
  },
  INTP: {
    code: 'INTP',
    nickname: '철학자 냥이',
    description: '호기심이 많고 사고력이 뛰어난 성격입니다. 혼자 있는 시간을 즐기며, 새로운 장난감이나 환경을 탐구하는 것을 좋아합니다.',
    emoji: '🤔',
  },
  ENTJ: {
    code: 'ENTJ',
    nickname: '대장 냥이',
    description: '리더십이 강하고 자신감 넘치는 성격입니다. 집안의 다른 반려동물이나 가족들을 이끄는 듯한 모습을 보이기도 합니다.',
    emoji: '👑',
  },
  ENTP: {
    code: 'ENTP',
    nickname: '발명가 냥이',
    description: '창의적이고 적응력이 뛰어난 성격입니다. 새로운 것을 시도하는 것을 좋아하며, 장난감을 이것저것 시도해보는 호기심이 많습니다.',
    emoji: '💡',
  },
  INFJ: {
    code: 'INFJ',
    nickname: '예언자 냥이',
    description: '직관력이 뛰어나고 깊이 있는 성격입니다. 주인의 기분을 잘 읽어내며, 조용히 곁을 지켜주는 다정한 성격입니다.',
    emoji: '🔮',
  },
  INFP: {
    code: 'INFP',
    nickname: '몽상가 냥이',
    description: '감성이 풍부하고 로맨틱한 성격입니다. 창문 밖을 바라보며 꿈꾸는 듯한 모습을 자주 보이며, 주인과의 깊은 유대감을 중요시합니다.',
    emoji: '💫',
  },
  ENFJ: {
    code: 'ENFJ',
    nickname: '외교관 냥이',
    description: '사교적이고 따뜻한 성격입니다. 집안의 화합을 도모하듯 가족 모두에게 골고루 사랑을 나눠주며, 손님에게도 친근하게 다가갑니다.',
    emoji: '🤝',
  },
  ENFP: {
    code: 'ENFP',
    nickname: '응원가 냥이',
    description: '열정적이고 긍정적인 에너지의 성격입니다. 주인을 기쁘게 해주려 노력하며, 장난기 넘치는 모습으로 웃음을 주는 행동파입니다.',
    emoji: '🎉',
  },
  ISTJ: {
    code: 'ISTJ',
    nickname: '감시자 냥이',
    description: '신중하고 책임감 있는 성격입니다. 일과 같은 루틴을 좋아하며, 집안 곳곳을 순찰하듯 살피는 습관이 있습니다.',
    emoji: '👀',
  },
  ISFJ: {
    code: 'ISFJ',
    nickname: '수호자 냥이',
    description: '헌신적이고 따뜻한 성격입니다. 주인을 지키듯 곁을 지키며, 조용하지만 깊은 애정으로 가족을 돌보는 듯한 모습을 보입니다.',
    emoji: '🛡️',
  },
  ESTJ: {
    code: 'ESTJ',
    nickname: '관리자 냥이',
    description: '체계적이고 실용적인 성격입니다. 집안의 규칙을 정하듯 영토를 관리하며, 질서 있는 환경을 선호합니다.',
    emoji: '📋',
  },
  ESFJ: {
    code: 'ESFJ',
    nickname: '돌봄이 냥이',
    description: '사교적이고 배려심 깊은 성격입니다. 가족의 기분을 살피고 함께 어울리는 것을 좋아하며, 친화력이 뛰어납니다.',
    emoji: '💕',
  },
  ISTP: {
    code: 'ISTP',
    nickname: '장인 냥이',
    description: '실용적이고 분석적인 성격입니다. 무언가를 조작하거나 분해하는 듯한 호기심을 보이며, 민첩하고 독립적인 행동파입니다.',
    emoji: '🔧',
  },
  ISFP: {
    code: 'ISFP',
    nickname: '예술가 냥이',
    description: '감각적이고 자유로운 영혼의 성격입니다. 아름다움에 민감하며, 햇살이 비치는 창가에서 우아하게 있는 모습이 어울립니다.',
    emoji: '🎨',
  },
  ESTP: {
    code: 'ESTP',
    nickname: '모험가 냥이',
    description: '활동적이고 대담한 성격입니다. 높은 곳에 오르거나 좁은 공간을 탐험하는 것을 좋아하며, 에너지가 넘치는 행동파입니다.',
    emoji: '🚀',
  },
  ESFP: {
    code: 'ESFP',
    nickname: '연예인 냥이',
    description: '밝고 활기찬 성격으로 주목받는 것을 좋아합니다. 가족의 시선을 끄는 귀여운 행동을 자주 하며, 분위기 메이커입니다.',
    emoji: '⭐',
  },
};

export function getMBTIDescription(code: MBTICode): CatMBTI {
  return mbtiDescriptions[code];
}

export function getAllMBTIDescriptions(): CatMBTI[] {
  return Object.values(mbtiDescriptions);
}
