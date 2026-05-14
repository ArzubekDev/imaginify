// Collection.tsx
'use client';

import { IImage } from '@/lib/database/models/image.model';
import { cn, formUrlQuery } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
} from '../ui/pagination';
import { Search } from './Search';

const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  hasSearch?: boolean;
  page: number;
  totalPages: number | undefined;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue =
      action === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newURL = formUrlQuery({
      searchParams: searchParams,
      key: 'page',
      value: pageValue,
    });

    router.push(newURL, { scroll: false });
  };

  return (
   <>
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-lg font-bold text-white">Recent Edits</h2>
    {hasSearch && (
      <div className="flex gap-1 rounded-lg bg-zinc-900 p-1">
        <span className="rounded-md bg-zinc-800 px-3 py-1 text-xs text-zinc-200">All</span>
        <span className="px-3 py-1 text-xs text-zinc-500">Restore</span>
        <span className="px-3 py-1 text-xs text-zinc-500">Fill</span>
      </div>
    )}
  </div>

  {hasSearch && (
    <div className="mb-6">
      <Search />
    </div>
  )}

  {images.length > 0 ? (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => (
        <Card image={image} key={image._id.toString()} />
      ))}
    </ul>
  ) : (
    <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-900/40">
      <p className="text-sm font-medium text-zinc-500">No images yet</p>
    </div>
  )}

  {totalPages > 1 && (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        disabled={Number(page) <= 1}
        onClick={() => onPageChange('prev')}
        className="text-sm text-indigo-400 hover:bg-transparent hover:text-indigo-300 disabled:text-zinc-700"
      >
        ← Previous
      </Button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i + 1 === page
                ? 'w-5 bg-indigo-500'
                : 'w-1.5 bg-zinc-700'
            )}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        disabled={Number(page) >= totalPages}
        onClick={() => onPageChange('next')}
        className="text-sm text-indigo-400 hover:bg-transparent hover:text-indigo-300 disabled:text-zinc-700"
      >
        Next →
      </Button>
    </div>
  )}
</>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformations/${image._id}`} className="group relative block overflow-hidden rounded-2xl border border-white/[0.06]">
        <div className="relative h-52 w-full">
          <CldImage
            src={image.publicId}
            alt={image.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-sm font-semibold text-white">{image.title}</p>
          <p className="text-xs text-white/50">{image.transformationType}</p>
        </div>
      </Link>
    </li>
  );
};

export default Collection;