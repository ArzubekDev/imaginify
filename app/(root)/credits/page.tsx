import Checkout from '@/components/shared/Checkout';
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { plans } from '@/constants';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { Check, X } from 'lucide-react';
import { redirect } from 'next/navigation';

const Credits = async () => {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const user = await getUserByClerkId(userId);

  return (
    <main className="min-h-screen">
      <Header title="Buy Credits" subtitle="Choose a credit package that suits your need!" />

      {/* Plans Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none p-0">
          {plans.map((plan) => {
            const isFeatured = plan.name === 'Pro Package';
            const isFree = plan.name === 'Free';

            return (
              <li
                key={plan.name}
                className={`
        relative flex flex-col gap-5 rounded-2xl p-6
        transition-colors duration-200
        ${
          isFeatured
            ? 'border-2 border-purple-500 bg-white'
            : 'border border-white/10 bg-white/5 hover:bg-white/8'
        }
      `}
              >
                {isFeatured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[11px] font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl
        ${isFeatured ? 'bg-purple-100' : 'bg-white/10'}
      `}
                >
                  {plan.icon}
                </div>

                {/* Name */}
                <div>
                  <p
                    className={`font-bold text-base ${isFeatured ? 'text-gray-900' : 'text-white'}`}
                  >
                    {plan.name}
                  </p>
                  <p className={`text-xs mt-0.5 ${isFeatured ? 'text-gray-400' : 'text-white/40'}`}>
                    {plan.credits} credits included
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${isFeatured ? 'text-gray-900' : 'text-white'}`}
                  >
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${isFeatured ? 'text-gray-400' : 'text-white/40'}`}>
                    {isFree ? '/ forever' : '/ one-time'}
                  </span>
                </div>

                <hr className={isFeatured ? 'border-gray-200' : 'border-white/10'} />

                {/* Inclusions */}
                <ul className="flex flex-col gap-2.5 flex-1 list-none p-0">
                  {plan.inclusions.map((inclusion) => (
                    <li
                      key={plan.name + inclusion.label}
                      className={`flex items-center gap-2.5 text-sm
              ${
                inclusion.isIncluded
                  ? isFeatured
                    ? 'text-gray-700'
                    : 'text-white/90'
                  : isFeatured
                    ? 'text-gray-300'
                    : 'text-white/25'
              }
            `}
                    >
                      {inclusion.isIncluded ? (
                        <Check className="h-4 w-4 text-green-400 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-white/25 shrink-0" />
                      )}
                      {inclusion.label}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isFree ? (
                  <Button
                    variant="outline"
                    className="w-full text-sm border-white/15 text-white/50 bg-transparent hover:bg-white/5"
                  >
                    Free Consumable
                  </Button>
                ) : (
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Credits;
