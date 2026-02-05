interface StructuredDataProps {
  type: 'WebSite' | 'BreadcrumbList' | 'Organization' | 'FAQPage';
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...data,
        }),
      }}
    />
  );
}
