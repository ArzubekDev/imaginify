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
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 px-6 py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_40%)]" />

        <div className="relative z-10">
          <span className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-zinc-400">
            AI Powered Image Transformations
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Unleash Your Creative Vision
          </h1>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/2 p-4 transition-all duration-300 hover:border-white/12 hover:bg-white/4"
              >
                {/* Bottom accent line */}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-[60%] -translate-x-1/2 scale-x-0 rounded-full bg-indigo-400 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-x-100" />

                <li className="flex list-none flex-col items-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white transition-all duration-300 group-hover:-translate-y-0.75">
                    {link.icon}
                  </div>
                  <p className="text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
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
