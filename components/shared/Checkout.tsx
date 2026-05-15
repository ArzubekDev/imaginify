import { checkoutCredits } from '@/lib/actions/transaction.actions';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = ({plan, amount, credits, buyerId}: {plan: string, amount: number, credits: number, buyerId: string}) => {
    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    }, [])
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
      toast.success('Order canceled!', {
        description: 'Continue to shop around and checkout when youre ready',
        duration: 5000,
        className: 'error-toast',
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };
    await checkoutCredits(transaction);
  };
  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button type="submit" role="link">
          Buy Credits
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
