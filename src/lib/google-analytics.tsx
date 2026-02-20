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

type GtagCommand = 'event' | 'config' | 'js' | 'set'
type GtagParams = Record<string, unknown>

type WindowWithGtag = {
  gtag?: (command: GtagCommand, eventName: string, params?: GtagParams) => void
}

declare global {
  interface Window {
    gtag?: WindowWithGtag['gtag']
  }
}

interface TrackEvent {
  name: string
  params?: GtagParams
}

function trackEvent(event: TrackEvent) {
  const { name, params } = event

  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

// Event Types
export interface GAEvent extends GtagParams {
  name: string
  params?: GtagParams
}

// Test Events
export interface TestStartEvent extends GtagParams {
  timestamp: string
  referrer: string
  device: string
  utm_source?: string
}

export interface QuestionViewedEvent extends GtagParams {
  question_index: number
  time_spent: number
}

export interface QuestionAnsweredEvent extends GtagParams {
  question_index: number
  answer_value: string
  time_to_answer: number
}

export interface TestCompletedEvent extends GtagParams {
  total_time: number
  result_breed: string
  confidence_score: number
}

export interface TestAbandonedEvent extends GtagParams {
  question_index: number
  time_spent: number
  reason?: string
}

// User Behavior Events
export interface FriendComparisonClickedEvent extends GtagParams {
  own_breed: string
  friend_breed: string
}

export interface ResultRetryEvent extends GtagParams {
  breed_change: boolean
  new_answers: boolean
}

export interface BreedExploreEvent extends GtagParams {
  breed_viewed: string
  time_spent: number
}

// Social Share Events
export interface ResultSharedEvent extends GtagParams {
  platform: 'instagram' | 'instagram_story' | 'celebrity_story' | 'thread' | 'kakaotalk' | 'copy' | 'default'
  breed_shared: string
  timestamp: string
}

// Utility function to log events
export function logEvent(event: GAEvent) {
  trackEvent(event)
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
export interface UserFeedbackEvent extends GtagParams {
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
export interface AdPerformanceEvent extends GtagParams {
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
export interface ResultSavedEvent extends GtagParams {
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

export interface ResultsViewedEvent extends GtagParams {
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
export interface DailyQuizViewedEvent extends GtagParams {
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

export interface DailyQuizAnsweredEvent extends GtagParams {
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

export interface StreakMilestoneEvent extends GtagParams {
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
export interface JourneyViewedEvent extends GtagParams {
  total_tests: number
  unique_breeds: number
  has_data: boolean
}

export interface JourneyClearedEvent extends GtagParams {
  results_count: number
}

export interface JourneyExportedEvent extends GtagParams {
  results_count: number
}

export interface JourneyImportedEvent extends GtagParams {
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
export interface BreedOfTheDayViewedEvent extends GtagParams {
  breed_id: string
  breed_name: string
}

export interface BreedOfTheDayClickedEvent extends GtagParams {
  breed_id: string
  breed_name: string
}

export interface BreedOfTheDaySharedEvent extends GtagParams {
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
export interface BreedSearchUsedEvent extends GtagParams {
  search_query: string
  result_count: number
}

export function logBreedSearchUsed(params: BreedSearchUsedEvent) {
  logEvent({
    name: 'breed_search_used',
    params
  })
}

export interface BreedFilterAppliedEvent extends GtagParams {
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
export interface AchievementUnlockedEvent extends GtagParams {
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

export interface AchievementViewedEvent extends GtagParams {
  achievement_id: string
  source: 'gallery' | 'result' | 'profile'
}

export function logAchievementViewed(params: AchievementViewedEvent) {
  logEvent({
    name: 'achievement_viewed',
    params
  })
}

export interface AchievementsPageViewedEvent extends GtagParams {
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
export interface FamousMatchViewedEvent extends GtagParams {
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

export interface FamousMatchSharedEvent extends GtagParams {
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
export interface MatchExplanationViewedEvent extends GtagParams {
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
export interface RelatedBreedViewedEvent extends GtagParams {
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

export interface RelatedBreedClickedEvent extends GtagParams {
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
export interface PreviewModalShownEvent extends GtagParams {
  seen_before: boolean
}

export interface PreviewModalDismissedEvent extends GtagParams {
  action: 'later' | 'start' | 'close'
}

export interface TestStartedAfterPreviewEvent extends GtagParams {
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
export interface ErrorEvent extends GtagParams {
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

export interface ErrorRecoveredEvent extends GtagParams {
  error_type: string
  recovery_method: 'retry' | 'fallback' | 'user_action'
}

export function logErrorRecovered(params: ErrorRecoveredEvent) {
  logEvent({
    name: 'error_recovered',
    params
  })
}
