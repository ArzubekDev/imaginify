import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getImageById } from '@/lib/actions/image.actions';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const UpdateTransformationPage = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');
  const user = await getUserByClerkId(userId);
  const image = await getImageById(id);

  const transformation = transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default UpdateTransformationPage;
