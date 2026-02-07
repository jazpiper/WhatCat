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
  platform: 'instagram' | 'thread' | 'kakaotalk' | 'copy' | 'default'
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
