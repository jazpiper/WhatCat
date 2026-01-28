'use client';

export default function AdSense({ adSlot }: { adSlot: string }) {
  return (
    <div className="w-full flex justify-center my-6">
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[100px]">
        <p className="text-gray-400 text-sm">
          AdSense 광고 영역
          <br />
          <span className="text-xs">(승인 후 표시)</span>
          <br />
          <span className="text-xs text-gray-300">Slot: {adSlot}</span>
        </p>
      </div>
    </div>
  );
}
