'use client';

import { memo } from 'react';

export default memo(function AnswerOptionButton({
  id,
  text,
  selected,
  onSelect,
}: {
  id: string;
  text: string;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`w-full text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg active:scale-[0.98] min-h-[56px] md:min-h-auto ${
        selected
          ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 ring-2 ring-pink-200 dark:ring-pink-700'
          : 'border-[var(--border-default)] dark:border-[var(--border-default)] hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-pink-900/20'
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-center gap-4">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            selected
              ? 'border-pink-500 bg-pink-500'
              : 'border-[var(--border-default)] dark:border-[var(--border-default)]'
          }`}
        >
          {selected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
        </div>
        <span className="text-[var(--text-primary)] dark:text-[var(--text-secondary)] font-medium">{text}</span>
      </div>
    </button>
  );
});
