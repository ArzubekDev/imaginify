import Checkout from '@/components/shared/Checkout';
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { plans } from '@/constants';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Credits = async () => {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const user = await getUserByClerkId(userId);

  return (
    <>
      <Header title="Buy Credits" subtitle="Choose a credit package the suits your needs!" />

      <section>
        <ul>
          {plans.map((plan) => (
            <li key={plan.name}>
              <div>
                <p>{plan.icon}</p>
                <p>{plan.name}</p>
                <p>{plan.price}</p>
                <p>{plan.credits} Credits</p>
              </div>

              <ul>
                {plan.inclusions.map((inclusion) => (
                  <li key={plan.name + inclusion.label}>
                    <Image
                      src={`/icons/${inclusion.isIncluded ? 'check.svg' : 'cross.svg'}`}
                      alt="img"
                      width={24}
                      height={24}
                    />
                    <p>{inclusion.label}</p>
                  </li>
                ))}
              </ul>
              {plan.name === 'Free' ? (
                <Button variant={'outline'}>Free Consumable</Button>
              ) : (
                <SignInButton>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignInButton>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
