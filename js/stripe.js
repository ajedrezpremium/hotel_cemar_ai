/* === HOTEL CEMAR - STRIPE PAYMENT === */

let stripeInstance = null;
let stripeElements = null;
let stripePaymentElement = null;

function getStripe() {
  if (stripeInstance) return stripeInstance;
  if (typeof Stripe !== 'undefined' && window.ENV?.STRIPE_PUBLISHABLE_KEY) {
    stripeInstance = Stripe(window.ENV.STRIPE_PUBLISHABLE_KEY);
  }
  return stripeInstance;
}

async function initStripePayment(reservationId, totalAmount, description) {
  const stripe = getStripe();
  if (!stripe) return { error: 'Stripe no configurado' };

  try {
    const res = await fetch('/api/stripe-create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservation_id: reservationId, total_amount: totalAmount, description }),
    });

    const { clientSecret, error } = await res.json();
    if (error) return { error };

    const elements = stripe.elements({ clientSecret, locale: currentLang || 'es' });
    const paymentElement = elements.create('payment', {
      layout: { type: 'tabs', defaultCollapsed: false },
    });

    return { stripe, elements, paymentElement, clientSecret };
  } catch (err) {
    return { error: err.message };
  }
}

async function confirmStripePayment(stripe, elements, clientSecret, returnUrl) {
  const { error: submitError } = await elements.submit();
  if (submitError) return { error: submitError.message };

  const { error } = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: { return_url: returnUrl },
    redirect: 'if_required',
  });

  return { error: error?.message || null };
}
