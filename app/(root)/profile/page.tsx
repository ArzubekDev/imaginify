import Collection from '@/components/shared/Collection';
import Header from '@/components/shared/Header';
import { getUserImages } from '@/lib/actions/image.actions';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { Coins, ImageIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await getUserByClerkId(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-4">

        {/* Credits */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/40">
            Credits Available
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">
              <Coins className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              {user.creditBalance}
            </h2>
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/40">
            Image Manipulations Done
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">
              <ImageIcon className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              {images?.data.length}
            </h2>
          </div>
        </div>

      </section>

      {/* Gallery */}
      <section className="mt-8">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default ProfilePage;