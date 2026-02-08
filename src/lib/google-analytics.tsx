"use client"

import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * Google Analytics 4 Configuration
 * @see https://nextjs.org/docs/app/third-parties/google-analytics
 */

export function GoogleAnalyticsScript() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not found')
    return null
  }

  return (
    <GoogleAnalytics gaId={measurementId} />
  )
}

/**
 * Google Analytics Event Tracking
 * Based on Sophia's event schema recommendation
 */

// Event Types
export interface GAEvent {
  name: string
  params?: any
}

// Test Events
export interface TestStartEvent {
  timestamp: string
  referrer: string
  device: string
  utm_source?: string
}

export interface QuestionViewedEvent {
  question_index: number
  time_spent: number
}

export interface QuestionAnsweredEvent {
  question_index: number
  answer_value: string
  time_to_answer: number
}

export interface TestCompletedEvent {
  total_time: number
  result_breed: string
  confidence_score: number
}

export interface TestAbandonedEvent {
  question_index: number
  time_spent: number
  reason?: string
}

// User Behavior Events
export interface FriendComparisonClickedEvent {
  own_breed: string
  friend_breed: string
}

export interface ResultRetryEvent {
  breed_change: boolean
  new_answers: boolean
}

export interface BreedExploreEvent {
  breed_viewed: string
  time_spent: number
}

// Social Share Events
export interface ResultSharedEvent {
  platform: 'instagram' | 'instagram_story' | 'thread' | 'kakaotalk' | 'copy' | 'default'
  breed_shared: string
  timestamp: string
}

// Utility function to log events
export function logEvent(event: GAEvent) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', event.name, event.params)
  }
}

// Specific event logging functions
export function logTestStart(params: TestStartEvent) {
  logEvent({
    name: 'test_start',
    params
  })
}

export function logQuestionViewed(params: QuestionViewedEvent) {
  logEvent({
    name: 'question_viewed',
    params
  })
}

export function logQuestionAnswered(params: QuestionAnsweredEvent) {
  logEvent({
    name: 'question_answered',
    params
  })
}

export function logTestCompleted(params: TestCompletedEvent) {
  logEvent({
    name: 'test_completed',
    params
  })
}

export function logTestAbandoned(params: TestAbandonedEvent) {
  logEvent({
    name: 'test_abandoned',
    params
  })
}

export function logFriendComparisonClicked(params: FriendComparisonClickedEvent) {
  logEvent({
    name: 'friend_comparison_clicked',
    params
  })
}

export function logResultRetry(params: ResultRetryEvent) {
  logEvent({
    name: 'result_retry',
    params
  })
}

export function logBreedExplore(params: BreedExploreEvent) {
  logEvent({
    name: 'breed_explore',
    params
  })
}

export function logResultShared(params: ResultSharedEvent) {
  logEvent({
    name: 'result_shared',
    params
  })
}

// Custom events for user feedback
export interface UserFeedbackEvent {
  rating: number // 1-5 stars
  comments?: string
  feedback_type?: 'satisfaction' | 'suggestion' | 'bug'
}

export function logUserFeedback(params: UserFeedbackEvent) {
  logEvent({
    name: 'user_feedback',
    params
  })
}

// Ad performance events
export interface AdPerformanceEvent {
  ad_slot: string
  ad_type: 'banner' | 'interstitial' | 'reward'
  page: string
  test_completed?: boolean
}

export function logAdPerformance(params: AdPerformanceEvent) {
  logEvent({
    name: 'ad_performance',
    params
  })
}

// Result storage events
export interface ResultSavedEvent {
  breed_id: string
  breed_name: string
  score: number
  total_saved: number
}

export function logResultSaved(params: ResultSavedEvent) {
  logEvent({
    name: 'result_saved',
    params
  })
}

export interface ResultsViewedEvent {
  total_results: number
  has_trends: boolean
}

export function logResultsViewed(params: ResultsViewedEvent) {
  logEvent({
    name: 'results_viewed',
    params
  })
}

// Daily quiz events
export interface DailyQuizViewedEvent {
  current_streak: number
  total_completed: number
  is_completed_today: boolean
}

export function logDailyQuizViewed(params: DailyQuizViewedEvent) {
  logEvent({
    name: 'daily_quiz_viewed',
    params
  })
}

export interface DailyQuizAnsweredEvent {
  question_id: string
  is_correct: boolean
  current_streak: number
}

export function logDailyQuizAnswered(params: DailyQuizAnsweredEvent) {
  logEvent({
    name: 'daily_quiz_answered',
    params
  })
}

export interface StreakMilestoneEvent {
  milestone: number
  total_completed: number
}

export function logStreakMilestone(params: StreakMilestoneEvent) {
  logEvent({
    name: 'streak_milestone_reached',
    params
  })
}

// Journey events
export interface JourneyViewedEvent {
  total_tests: number
  unique_breeds: number
  has_data: boolean
}

export interface JourneyClearedEvent {
  results_count: number
}

export interface JourneyExportedEvent {
  results_count: number
}

export interface JourneyImportedEvent {
  imported_count: number
}

export function logJourneyViewed(params: JourneyViewedEvent) {
  logEvent({
    name: 'journey_viewed',
    params
  })
}

export function logJourneyCleared(params: JourneyClearedEvent) {
  logEvent({
    name: 'journey_cleared',
    params
  })
}

export function logJourneyExported(params: JourneyExportedEvent) {
  logEvent({
    name: 'journey_exported',
    params
  })
}

export function logJourneyImported(params: JourneyImportedEvent) {
  logEvent({
    name: 'journey_imported',
    params
  })
}

// Breed of the day events
export interface BreedOfTheDayViewedEvent {
  breed_id: string
  breed_name: string
}

export interface BreedOfTheDayClickedEvent {
  breed_id: string
  breed_name: string
}

export interface BreedOfTheDaySharedEvent {
  breed_id: string
  breed_name: string
  platform: 'copy' | 'kakaotalk' | 'default'
}

export function logBreedOfTheDayViewed(params: BreedOfTheDayViewedEvent) {
  logEvent({
    name: 'breed_of_day_viewed',
    params
  })
}

export function logBreedOfTheDayClicked(params: BreedOfTheDayClickedEvent) {
  logEvent({
    name: 'breed_of_day_clicked',
    params
  })
}

export function logBreedOfTheDayShared(params: BreedOfTheDaySharedEvent) {
  logEvent({
    name: 'breed_of_day_shared',
    params
  })
}

// Breed search events
export interface BreedSearchUsedEvent {
  search_query: string
  result_count: number
}

export function logBreedSearchUsed(params: BreedSearchUsedEvent) {
  logEvent({
    name: 'breed_search_used',
    params
  })
}

export interface BreedFilterAppliedEvent {
  filters: string
  result_count: number
}

export function logBreedFilterApplied(params: BreedFilterAppliedEvent) {
  logEvent({
    name: 'breed_filter_applied',
    params
  })
}

// Achievement events
export interface AchievementUnlockedEvent {
  achievement_id: string
  achievement_name: string
  rarity: string
}

export function logAchievementUnlocked(params: AchievementUnlockedEvent) {
  logEvent({
    name: 'achievement_unlocked',
    params
  })
}

export interface AchievementViewedEvent {
  achievement_id: string
  source: 'gallery' | 'result' | 'profile'
}

export function logAchievementViewed(params: AchievementViewedEvent) {
  logEvent({
    name: 'achievement_viewed',
    params
  })
}

export interface AchievementsPageViewedEvent {
  total_unlocked: number
  total_achievements: number
}

export function logAchievementsPageViewed(params: AchievementsPageViewedEvent) {
  logEvent({
    name: 'achievements_page_viewed',
    params
  })
}

// Famous match events
export interface FamousMatchViewedEvent {
  breed_id: string
  match_name: string
  match_type: 'celebrity' | 'character' | 'historical'
  is_rare: boolean
  result_percentage: number
}

export function logFamousMatchViewed(params: FamousMatchViewedEvent) {
  logEvent({
    name: 'famous_match_viewed',
    params
  })
}

export interface FamousMatchSharedEvent {
  breed_id: string
  match_name: string
  platform: 'copy' | 'kakaotalk' | 'default'
}

export function logFamousMatchShared(params: FamousMatchSharedEvent) {
  logEvent({
    name: 'famous_match_shared',
    params
  })
}

// Match explanation events
export interface MatchExplanationViewedEvent {
  breed_id: string
  time_spent: number
  scroll_depth: number
}

export function logMatchExplanationViewed(params: MatchExplanationViewedEvent) {
  logEvent({
    name: 'match_explanation_viewed',
    params
  })
}

// Related breed events
export interface RelatedBreedViewedEvent {
  main_breed_id: string
  related_breed_id: string
  similarity_score: number
  position: number
}

export function logRelatedBreedViewed(params: RelatedBreedViewedEvent) {
  logEvent({
    name: 'related_breed_viewed',
    params
  })
}

export interface RelatedBreedClickedEvent {
  main_breed_id: string
  related_breed_id: string
  similarity_score: number
}

export function logRelatedBreedClicked(params: RelatedBreedClickedEvent) {
  logEvent({
    name: 'related_breed_clicked',
    params
  })
}

// Test preview modal events
export interface PreviewModalShownEvent {
  seen_before: boolean
}

export interface PreviewModalDismissedEvent {
  action: 'later' | 'start' | 'close'
}

export interface TestStartedAfterPreviewEvent {
  time_to_start: number
}

export function logPreviewModalShown(params: PreviewModalShownEvent) {
  logEvent({
    name: 'preview_modal_shown',
    params
  })
}

export function logPreviewModalDismissed(params: PreviewModalDismissedEvent) {
  logEvent({
    name: 'preview_modal_dismissed',
    params
  })
}

export function logTestStartedAfterPreview(params: TestStartedAfterPreviewEvent) {
  logEvent({
    name: 'test_started_after_preview',
    params
  })
}

// Error tracking events
export interface ErrorEvent {
  error_type: 'localStorage' | 'quizData' | 'streakCalc' | 'share' | 'unknown'
  error_message: string
  error_context?: string
  user_action?: string
}

export function logError(params: ErrorEvent) {
  logEvent({
    name: 'error_occurred',
    params
  })
}

export interface ErrorRecoveredEvent {
  error_type: string
  recovery_method: 'retry' | 'fallback' | 'user_action'
}

export function logErrorRecovered(params: ErrorRecoveredEvent) {
  logEvent({
    name: 'error_recovered',
    params
  })
}
