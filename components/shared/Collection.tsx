// Collection.tsx
'use client';

import { IImage } from '@/lib/database/models/image.model';
import { formUrlQuery } from '@/lib/utils';
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
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Recent Edits
          </h2>

          <p className="mt-2 text-zinc-400">
            Browse recently transformed AI generated visuals.
          </p>
        </div>

        {hasSearch && (
          <div className="w-full sm:max-w-md">
            <Search />
          </div>
        )}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image._id.toString()} />
          ))}
        </ul>
      ) : (
        <div className="flex min-h-75 items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-zinc-900/40">
          <p className="text-lg font-medium text-zinc-400">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-14">
          <PaginationContent className="gap-4">
            <Button
              variant="outline"
              disabled={Number(page) <= 1}
              onClick={() => onPageChange('prev')}
              className="h-11 rounded-xl border-white/10 bg-zinc-900 px-5 text-white hover:bg-zinc-800"
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <div className="flex h-11 items-center rounded-xl border border-white/10 bg-zinc-900 px-6 text-sm font-semibold text-zinc-300">
              {page} / {totalPages}
            </div>

            <Button
              variant="outline"
              className="h-11 rounded-xl border-white/10 bg-zinc-900 px-5 text-white hover:bg-zinc-800"
              onClick={() => onPageChange('next')}
              disabled={Number(page) >= totalPages}
            >
              Next
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li className="group overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/70 shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur">
      <Link href={`/transformations/${image._id}`}>
        <div className="relative overflow-hidden">
          <CldImage
            src={image.publicId}
            alt={image.title}
            width={image.width}
            height={image.height}
            loading="lazy"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex items-center justify-between p-5">
          <div>
            <p className="line-clamp-1 text-lg font-bold tracking-tight text-white">
              {image.title}
            </p>

            <span className="mt-1 inline-block text-sm text-zinc-400">
              AI Transformation
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:text-white">
            View
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Collection;