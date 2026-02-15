import { searchParamsToFilters } from '@/utils/breedFilters';
import BreedsClient from './BreedsClient';

export default async function BreedsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const url = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === 'string') url.set(k, v);
    else if (Array.isArray(v)) v.forEach((vv) => url.append(k, vv));
  }

  const { filters, sort } = searchParamsToFilters(url);

  return <BreedsClient initialFilters={filters} initialSort={sort} />;
}
