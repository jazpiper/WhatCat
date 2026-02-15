import { Metadata } from 'next';
import breedsData from '@/data/breeds.json';
import { Breed } from '@/types';
import { generateBreedStructuredData, generateBreadcrumbStructuredData } from '@/utils/structuredData';

interface Props {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}

const breeds = breedsData as unknown as { breeds: Breed[] };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).id;
    const breed = breeds.breeds.find((b) => b.id === id);

    if (!breed) {
        return {
            title: '품종을 찾을 수 없습니다',
        };
    }

    const title = `${breed.name} - 고양이 품종 정보 | 냥이 매칭`;
    const description = `${breed.name}의 성격, 특징, 관리 방법 등 상세 정보를 확인해보세요. 냥이 매칭에서 추천하는 인기 고양이 품종!`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://what-cat-psi.vercel.app/breed/${id}`,
        },
        openGraph: {
            title,
            description,
            url: `https://what-cat-psi.vercel.app/breed/${id}`,
            images: [
                {
                    url: breed.image || `https://what-cat-psi.vercel.app/og-images/default.jpg`,
                    width: 800,
                    height: 600,
                    alt: breed.name,
                },
            ],
        },
    };
}

export default async function BreedLayout({ children, params }: Props) {
    const id = (await params).id;
    const breed = breeds.breeds.find((b) => b.id === id);

    // 구조화된 데이터 (JSON-LD)
    const structuredData = breed ? generateBreedStructuredData(breed) : null;
    const breadcrumbData = breed ? generateBreadcrumbStructuredData([
        { name: '홈', url: 'https://what-cat-psi.vercel.app' },
        { name: '품종 상세', url: `https://what-cat-psi.vercel.app/breed/${id}` },
    ]) : null;

    return (
        <>
            {structuredData && (
                <script
                    id="structured-data-breed"
                    type="application/ld+json"
                    // Render server-side so "View Source" contains it.
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}
            {breadcrumbData && (
                <script
                    id="structured-data-breadcrumb"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
                />
            )}
            {children}
        </>
    );
}
