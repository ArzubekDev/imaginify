'use client';
import { IImage } from '@/lib/database/models/image.model';
import { formUrlQuery } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { Pagination, PaginationContent, PaginationPrevious } from '../ui/pagination';
import Image from 'next/image';
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
  totalPages: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newURL = formUrlQuery({
      searchParams: searchParams,
      key: 'page',
      value: pageValue,
    });

    router.push(newURL, { scroll: false });
  };

  return (
    <>
      <div className="">
        <h2 className="">Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul>
          {images.map((image) => (
            <Card image={image} key={image._id.toString()} />
          ))}
        </ul>
      ) : (
        <div>
          <p>Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <Button disabled={Number(page) <= 1} onClick={() => onPageChange('prev')}>
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex items-center p-16 w-fit flex-1">
              {page} / {totalPages}
            </p>
            <Button
              className="w-32"
              onClick={() => onPageChange('next')}
              disabled={Number(page) >= totalPages}
            ></Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformations/${image._id}`}>
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="w-full h-52 rounded-md object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex justify-between">
          <p className="p-20 font-semibold mr-3">{image.title}</p>
          {/* <Image
          src={} 3: 37: 32
          /> */}
        </div>
      </Link>
    </li>
  );
};

export default Collection;
