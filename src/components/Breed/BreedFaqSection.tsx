'use client';

import { useState } from 'react';
import { FaqItem } from '@/data/breedFaqs';

interface BreedFaqSectionProps {
  breedName: string;
  faqs: FaqItem[];
}

export default function BreedFaqSection({ breedName, faqs }: BreedFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-[var(--bg-surface)] rounded-3xl shadow-xl p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-4 text-center">
        <span className="mr-2">❓</span>
        {breedName} 자주 묻는 질문
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[var(--border-default)] dark:border-[var(--border-default)] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-[var(--bg-page)] dark:hover:bg-[var(--bg-surface)] transition-colors duration-200"
            >
              <span className="text-[var(--text-primary)] dark:text-[var(--text-secondary)] font-medium flex-1">
                {faq.question}
              </span>
              <div
                className={`flex-shrink-0 mt-1 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <svg
                  className="w-5 h-5 text-purple-500 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-4 pt-0">
                <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] leading-relaxed pl-4 border-l-4 border-purple-400 dark:border-purple-500">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
