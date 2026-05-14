import Collection from '@/components/shared/Collection';
import { navLinks } from '@/constants';
import { getAllImages } from '@/lib/actions/image.actions';
import Link from 'next/link';

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="">
        <h1 className="">Unleash Your Creative Vision with Imaginigy</h1>

        <ul className="flex items-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center flex-col gap-2">
              <li>{link.icon}</li>
              <p>{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
