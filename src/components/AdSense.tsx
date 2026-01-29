'use client';

import Script from 'next/script';

export default function AdSense({ adSlot }: { adSlot: string }) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4896634202351610"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className="w-full flex justify-center my-6">
        <ins
          className="adsbygoogle"
          data-ad-client="ca-pub-4896634202351610"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          style={{ display: 'block' }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
          }}
        />
      </div>
    </>
  );
}
