import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params }: { params: { type: string } }) => {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const user = await getUserByClerkId(userId!);
  const { type } = await params;

  const transformation = transformationTypes[type];

  if (!transformation) return null;

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <TransformationForm
        action="create"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </>
  );
};

export default AddTransformationTypePage;
