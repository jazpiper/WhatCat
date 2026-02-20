'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import TestPreviewModal from '@/components/TestPreviewModal';

export default function StartTestCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStorageValue = (key: string) => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const handleStartTest = () => {
    const hasSeenPreview = getStorageValue('hasSeenTestPreview');
    const hasCompletedTest = getStorageValue('lastTestResult');

    if (!hasSeenPreview && !hasCompletedTest) {
      setIsModalOpen(true);
    } else {
      window.location.href = '/nyongmatch';
    }
  };

  const handleModalStart = () => {
    setIsModalOpen(false);
    window.location.href = '/nyongmatch';
  };

  return (
    <>
      <button
        onClick={handleStartTest}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        냥이매치 시작
        <ArrowRight size={24} />
      </button>

      <TestPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStart={handleModalStart}
      />
    </>
  );
}
