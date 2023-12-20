import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";

import { IEvent } from "@/lib/db/models/event.model"
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  event: IEvent;
  userId: string;
}

const Checkout = ({ event, userId }: CheckoutProps) => {

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async() => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order)
  }
  
  return (
    <form action={onCheckout}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? " Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  )
}

export default Checkout