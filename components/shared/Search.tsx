'use client';

import { formUrlQuery, removeKeyFromQuery } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newURL = formUrlQuery({
          searchParams: searchParams,
          key: 'query', 
          value: query,
        });
        router.push(newURL, { scroll: false });
      } else {
        const newURL = removeKeyFromQuery({
          searchParams: searchParams,
          keysToRemove: ['query'],
        });
        router.push(newURL, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div>
      <SearchIcon />
      <Input placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
};