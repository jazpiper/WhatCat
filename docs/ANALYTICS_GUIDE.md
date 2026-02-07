# Google Analytics 4 Implementation Guide

## Overview

This guide explains how to use Google Analytics 4 event tracking in WhatCat.

## Setup

### 1. Environment Variables

Add your Google Analytics Measurement ID to your `.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Google Analytics is automatically loaded

The Google Analytics script is automatically loaded in the root layout (`src/app/layout.tsx`).

## Event Tracking

### Available Hooks

#### `useTestStart()`
Tracks when a user starts the test.

```tsx
'use client'

import { useTestStart } from '@/hooks/useAnalytics'

export default function TestPage() {
  useTestStart()

  return <div>...</div>
}
```

#### `useQuestionViewed(questionIndex: number)`
Tracks when a user views a question.

```tsx
'use client'

import { useQuestionViewed } from '@/hooks/useAnalytics'

export default function Question({ index }: { index: number }) {
  useQuestionViewed(index)

  return <div>Question {index}</div>
}
```

#### `useQuestionAnswered()`
Tracks when a user answers a question.

```tsx
'use client'

import { useQuestionAnswered } from '@/hooks/useAnalytics'

export default function Question({ index }: { index: number }) {
  const { trackAnswer } = useQuestionAnswered()

  const handleAnswer = (value: string) => {
    trackAnswer(index, value)
    // ... handle answer
  }

  return <button onClick={() => handleAnswer('A')}>A</button>
}
```

#### `useTestCompleted(totalTime, resultBreed, confidenceScore)`
Tracks when a user completes the test.

```tsx
'use client'

import { useTestCompleted } from '@/hooks/useAnalytics'

export default function ResultPage({ breed, score }: { breed: string, score: number }) {
  const totalTime = 300 // seconds

  useTestCompleted(totalTime, breed, score)

  return <div>...</div>
}
```

#### `useTestAbandoned(questionIndex, timeSpent, reason?)`
Tracks when a user abandons the test.

```tsx
'use client'

import { useTestAbandoned } from '@/hooks/useAnalytics'

export default function TestPage() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      useTestAbandoned(currentQuestion, timeSpent, 'page_close')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return <div>...</div>
}
```

#### `useFriendComparison()`
Tracks when a user clicks friend comparison.

```tsx
'use client'

import { useFriendComparison } from '@/hooks/useAnalytics'

export default function ComparisonPage() {
  const { trackComparison } = useFriendComparison()

  const handleCompare = (ownBreed: string, friendBreed: string) => {
    trackComparison(ownBreed, friendBreed)
    // ... handle comparison
  }

  return <button onClick={() => handleCompare('A', 'B')}>Compare</button>
}
```

#### `useResultRetry()`
Tracks when a user retries the test.

```tsx
'use client'

import { useResultRetry } from '@/hooks/useAnalytics'

export default function ResultPage({ breed }: { breed: string }) {
  const { trackRetry } = useResultRetry()

  const handleRetry = () => {
    trackRetry(false, true) // breed changed: false, new answers: true
    // ... handle retry
  }

  return <button onClick={handleRetry}>Retry</button>
}
```

#### `useBreedExplore()`
Tracks when a user explores a breed.

```tsx
'use client'

import { useBreedExplore } from '@/hooks/useAnalytics'

export default function BreedCard({ breed }: { breed: string }) {
  const { trackExplore } = useBreedExplore()

  return <div onClick={() => trackExplore(breed)}>{breed}</div>
}
```

#### `useResultShared()`
Tracks when a user shares a result.

```tsx
'use client'

import { useResultShared } from '@/hooks/useAnalytics'

export default function ShareButtons({ breed }: { breed: string }) {
  const { trackShare } = useResultShared()

  const handleShare = (platform: 'instagram' | 'thread' | 'kakaotalk' | 'copy' | 'default') => {
    trackShare(platform, breed)
    // ... handle share
  }

  return (
    <div>
      <button onClick={() => handleShare('instagram')}>Instagram</button>
      <button onClick={() => handleShare('thread')}>Thread</button>
      <button onClick={() => handleShare('kakaotalk')}>KakaoTalk</button>
      <button onClick={() => handleShare('copy')}>Copy Link</button>
    </div>
  )
}
```

#### `useUserFeedback()`
Tracks user feedback.

```tsx
'use client'

import { useUserFeedback } from '@/hooks/useAnalytics'

export default function FeedbackForm() {
  const { trackFeedback } = useUserFeedback()

  const handleSubmit = (rating: number, comments?: string) => {
    trackFeedback(rating, comments, 'satisfaction')
    // ... handle submit
  }

  return (
    <form onSubmit={handleSubmit}>
      <Rating onChange={(rating) => setRating(rating)} />
      <textarea onChange={(e) => setComments(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

#### `useAdPerformance()`
Tracks ad performance.

```tsx
'use client'

import { useAdPerformance } from '@/hooks/useAnalytics'

export default function AdSlot({ slotId, type }: { slotId: string, type: 'banner' | 'interstitial' | 'reward' }) {
  const { trackAdPerformance } = useAdPerformance()

  useEffect(() => {
    // Track when ad is loaded
    trackAdPerformance(slotId, type, 'result', true)
  }, [])

  return <div>...</div>
}
```

## Direct Event Logging

You can also use the direct logging functions from `@/lib/google-analytics`:

```tsx
import {
  logEvent,
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
} from '@/lib/google-analytics'

// Log a custom event
logEvent({
  name: 'custom_event',
  params: { key: 'value' }
})

// Log a test start event
logTestStart({
  timestamp: new Date().toISOString(),
  referrer: document.referrer,
  device: 'mobile',
  utm_source: 'instagram',
})
```

## Event Schema

All events follow this schema based on Sophia's recommendation:

### Funnel Metrics
- `test_start`: When user starts test
- `question_viewed`: When user views a question
- `question_answered`: When user answers a question
- `test_completed`: When user completes test
- `test_abandoned`: When user abandons test

### User Behavior
- `friend_comparison_clicked`: When user clicks friend comparison
- `result_retry`: When user retries test
- `breed_explore`: When user explores a breed

### Social Sharing
- `result_shared`: When user shares result

### Feedback
- `user_feedback`: When user submits feedback

### Ad Performance
- `ad_performance`: Ad slot performance metrics

## Testing

### Verify Events

1. Open Google Analytics Realtime view
2. Open WhatCat in a new tab
3. Navigate through the test
4. Check if events appear in Realtime view

### Debug Mode

To enable debug mode, add `debug_mode=true` to your event logging:

```typescript
logEvent({
  name: 'test_start',
  params: {
    debug_mode: true,
    // ... other params
  }
})
```

## Best Practices

1. **Event Naming**: Use snake_case for event names
2. **Parameter Naming**: Use snake_case for parameter names
3. **Event Volume**: Don't log too many events (max 10 per second)
4. **PII**: Never log personally identifiable information (email, phone, etc.)
5. **Data Types**: Use correct data types for parameters (string, number, boolean)

## Google Analytics Dashboard

Key reports to monitor:

### Realtime
- Active users
- Events
- Conversions

### Engagement
- Page views
- Average session duration
- Bounce rate

### Events
- Test start vs completed
- Question answered rate
- Share rate
- Friend comparison rate

### Conversion
- Test completion rate
- Share conversion rate
- Ad click rate

## Support

For issues or questions, please contact the development team.
