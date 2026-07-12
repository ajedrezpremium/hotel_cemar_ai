const Stripe = require('stripe');
const { getSupabaseAdmin, handleOptions, jsonResponse, errorResponse } = require('./_lib');

export default async function handler(request) {
  const options = handleOptions(request);
  if (options) return options;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      return errorResponse(`Webhook signature verification failed: ${err.message}`, 400);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const reservationId = paymentIntent.metadata.reservation_id;

      const supabase = getSupabaseAdmin();
      await supabase
        .from('reservations')
        .update({
          status: 'confirmed',
          payment_method: 'stripe',
          payment_id: paymentIntent.id,
          paid_at: new Date().toISOString(),
        })
        .eq('id', reservationId);
    }

    return jsonResponse({ received: true });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
