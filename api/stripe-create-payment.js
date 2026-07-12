const Stripe = require('stripe');
const { handleOptions, jsonResponse, errorResponse } = require('./_lib');

export default async function handler(request) {
  const options = handleOptions(request);
  if (options) return options;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { reservation_id, total_amount, description } = await request.json();

    if (!reservation_id || !total_amount) {
      return errorResponse('Missing reservation_id or total_amount');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_amount * 100),
      currency: 'eur',
      description: description || `Reserva Hotel CEMAR #${reservation_id}`,
      metadata: { reservation_id },
      automatic_payment_methods: { enabled: true },
    });

    return jsonResponse({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
