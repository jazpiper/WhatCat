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
          : 'border-gray-200 dark:border-gray-600 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-pink-900/20'
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-center gap-4">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            selected
              ? 'border-pink-500 bg-pink-500'
              : 'border-gray-300 dark:border-gray-500'
          }`}
        >
          {selected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
        </div>
        <span className="text-gray-800 dark:text-gray-200 font-medium">{text}</span>
      </div>
    </button>
  );
});
