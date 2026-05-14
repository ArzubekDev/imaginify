// Home.tsx
import Collection from '@/components/shared/Collection';
import { navLinks } from '@/constants';
import { getAllImages } from '@/lib/actions/image.actions';
import Link from 'next/link';

const Home = async ({ searchParams }: SearchParamProps) => {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams?.page) || 1;
  const searchQuery = (resolvedParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-8 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)]" />

        <div className="relative z-10 max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-zinc-300 backdrop-blur">
            AI Powered Image Transformations
          </span>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Unleash Your Creative Vision with Imaginigy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Transform, enhance and generate visually striking content with a
            modern AI workflow designed for creators.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/10"
              >
                <li className="flex list-none flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg transition-all duration-300 group-hover:bg-indigo-500">
                    {link.icon}
                  </div>

                  <p className="text-sm font-medium text-zinc-200">
                    {link.label}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
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