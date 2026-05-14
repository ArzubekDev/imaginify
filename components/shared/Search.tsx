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
    <div className="group flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-4 backdrop-blur transition-all duration-300 focus-within:border-indigo-500/50 focus-within:bg-zinc-900">
      <SearchIcon className="h-5 w-5 text-zinc-400 transition-colors duration-300 group-focus-within:text-indigo-400" />

      <Input
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="border-none bg-transparent p-0 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
