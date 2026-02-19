/**
 * Analytics Hooks
 * Custom hooks for Google Analytics event tracking
 */
'use client'

import { useEffect, useRef } from 'react'
import {
  logTestStart,
  logQuestionViewed,
  logQuestionAnswered,
  logTestCompleted,
  logTestAbandoned,
  logFriendComparisonClicked,
  logResultRetry,
  logBreedExplore,
  logResultShared,
  logUserFeedback,
  logAdPerformance,
  logFamousMatchViewed,
  logMatchExplanationViewed,
  logRelatedBreedViewed,
  logRelatedBreedClicked,
  type TestStartEvent,
  type QuestionViewedEvent,
  type QuestionAnsweredEvent,
  type TestCompletedEvent,
  type TestAbandonedEvent,
  type FriendComparisonClickedEvent,
  type ResultRetryEvent,
  type BreedExploreEvent,
  type ResultSharedEvent,
  type UserFeedbackEvent,
  type AdPerformanceEvent,
  type FamousMatchViewedEvent,
  type MatchExplanationViewedEvent,
  type RelatedBreedViewedEvent,
  type RelatedBreedClickedEvent,
} from '../lib/google-analytics'

/**
 * Test Start Hook
 * Tracks when a user starts the test
 */
export function useTestStart() {
  useEffect(() => {
    const params: TestStartEvent = {
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
    }

    logTestStart(params)
  }, [])
}

/**
 * Question Viewed Hook
 * Tracks when a user views a question
 */
export function useQuestionViewed(questionIndex: number) {
  useEffect(() => {
    const params: QuestionViewedEvent = {
      question_index: questionIndex,
      time_spent: 0, // Will be calculated when answered
    }

    logQuestionViewed(params)
  }, [questionIndex])
}

/**
 * Question Answered Hook
 * Tracks when a user answers a question
 */
export function useQuestionAnswered() {
  const startTime = useRef<number>(Date.now())

  const trackAnswer = (questionIndex: number, answerValue: string) => {
    const params: QuestionAnsweredEvent = {
      question_index: questionIndex,
      answer_value: answerValue,
      time_to_answer: Date.now() - startTime.current,
    }

    logQuestionAnswered(params)
    startTime.current = Date.now() // Reset for next question
  }

  return { trackAnswer }
}

/**
 * Test Completed Hook
 * Tracks when a user completes the test
 *
 * NOTE: Returns an imperative tracker function so callers can safely invoke it
 * inside effects/handlers without violating Rules of Hooks.
 */
export function useTestCompleted() {
  const trackCompleted = (totalTime: number, resultBreed: string, confidenceScore: number) => {
    const params: TestCompletedEvent = {
      total_time: totalTime,
      result_breed: resultBreed,
      confidence_score: confidenceScore,
    }

    logTestCompleted(params)
  }

  return { trackCompleted }
}

/**
 * Test Abandoned Hook
 * Tracks when a user abandons the test
 */
export function useTestAbandoned(questionIndex: number, timeSpent: number, reason?: string) {
  useEffect(() => {
    const params: TestAbandonedEvent = {
      question_index: questionIndex,
      time_spent: timeSpent,
      reason,
    }

    logTestAbandoned(params)
  }, [questionIndex, timeSpent, reason])
}

/**
 * Friend Comparison Hook
 * Tracks when user clicks friend comparison
 */
export function useFriendComparison() {
  const trackComparison = (ownBreed: string, friendBreed: string) => {
    const params: FriendComparisonClickedEvent = {
      own_breed: ownBreed,
      friend_breed: friendBreed,
    }

    logFriendComparisonClicked(params)
  }

  return { trackComparison }
}

/**
 * Result Retry Hook
 * Tracks when user retries the test
 */
export function useResultRetry() {
  const trackRetry = (breedChange: boolean, newAnswers: boolean) => {
    const params: ResultRetryEvent = {
      breed_change: breedChange,
      new_answers: newAnswers,
    }

    logResultRetry(params)
  }

  return { trackRetry }
}

/**
 * Breed Explore Hook
 * Tracks when user explores a breed
 */
export function useBreedExplore() {
  const startTime = useRef<number>(Date.now())

  const trackExplore = (breedViewed: string) => {
    const params: BreedExploreEvent = {
      breed_viewed: breedViewed,
      time_spent: Date.now() - startTime.current,
    }

    logBreedExplore(params)
    startTime.current = Date.now() // Reset for next explore
  }

  return { trackExplore }
}

/**
 * Result Shared Hook
 * Tracks when user shares result
 */
export function useResultShared() {
  const trackShare = (platform: 'instagram' | 'instagram_story' | 'celebrity_story' | 'thread' | 'kakaotalk' | 'copy' | 'default', breedShared: string) => {
    const params: ResultSharedEvent = {
      platform,
      breed_shared: breedShared,
      timestamp: new Date().toISOString(),
    }

    logResultShared(params)
  }

  return { trackShare }
}

/**
 * User Feedback Hook
 * Tracks user feedback
 */
export function useUserFeedback() {
  const trackFeedback = (rating: number, comments?: string, feedbackType?: 'satisfaction' | 'suggestion' | 'bug') => {
    const params: UserFeedbackEvent = {
      rating,
      comments,
      feedback_type: feedbackType,
    }

    logUserFeedback(params)
  }

  return { trackFeedback }
}

/**
 * Ad Performance Hook
 * Tracks ad performance
 */
export function useAdPerformance() {
  const trackAdPerformance = (adSlot: string, adType: 'banner' | 'interstitial' | 'reward', page: string, testCompleted?: boolean) => {
    const params: AdPerformanceEvent = {
      ad_slot: adSlot,
      ad_type: adType,
      page,
      test_completed: testCompleted,
    }

    logAdPerformance(params)
  }

  return { trackAdPerformance }
}

/**
 * Famous Match Hook
 * Tracks when user views a famous match
 */
export function useFamousMatch() {
  const trackView = (breedId: string, matchName: string, matchType: 'celebrity' | 'character' | 'historical', isRare: boolean, resultPercentage: number) => {
    const params: FamousMatchViewedEvent = {
      breed_id: breedId,
      match_name: matchName,
      match_type: matchType,
      is_rare: isRare,
      result_percentage: resultPercentage,
    }

    logFamousMatchViewed(params)
  }

  return { trackView }
}

/**
 * Match Explanation Hook
 * Tracks match explanation engagement
 */
export function useMatchExplanation() {
  const trackView = (breedId: string, timeSpent: number, scrollDepth: number) => {
    const params: MatchExplanationViewedEvent = {
      breed_id: breedId,
      time_spent: timeSpent,
      scroll_depth: scrollDepth,
    }

    logMatchExplanationViewed(params)
  }

  return { trackView }
}

/**
 * Related Breed Hook
 * Tracks related breed interactions
 */
export function useRelatedBreed() {
  const trackView = (mainBreedId: string, relatedBreedId: string, similarityScore: number, position: number) => {
    const params: RelatedBreedViewedEvent = {
      main_breed_id: mainBreedId,
      related_breed_id: relatedBreedId,
      similarity_score: similarityScore,
      position,
    }

    logRelatedBreedViewed(params)
  }

  const trackClick = (mainBreedId: string, relatedBreedId: string, similarityScore: number) => {
    const params: RelatedBreedClickedEvent = {
      main_breed_id: mainBreedId,
      related_breed_id: relatedBreedId,
      similarity_score: similarityScore,
    }

    logRelatedBreedClicked(params)
  }

  return { trackView, trackClick }
}
