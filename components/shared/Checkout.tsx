"use client"

import { checkoutCredits } from '@/lib/actions/transaction.actions';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = ({ plan, amount, credits, buyerId }: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      toast.success('Order placed!', {
        description: 'You will receive an email confirmation',
        duration: 5000,
        className: 'success-toast',
      });
    }
    if (query.get('canceled')) {
      toast.error('Order canceled!', {
        description: 'Continue to shop around and checkout when you\'re ready',
        duration: 5000,
        className: 'error-toast',
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = { plan, amount, credits, buyerId };
    await checkoutCredits(transaction);
  };

  return (
  <Button
    onClick={onCheckout}
    className={`w-full text-sm font-semibold
      ${plan === 'Premium Package'
        ? 'bg-white text-gray-900 hover:bg-white/90'
        : 'bg-purple-600 hover:bg-purple-700 text-white'}
    `}
  >
    Buy Credits
  </Button>

  );
};

export default Checkout;