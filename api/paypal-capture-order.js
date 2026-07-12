const { getSupabaseAdmin, handleOptions, jsonResponse, errorResponse } = require('./_lib');

const PAYPAL_API = process.env.PAYPAL_CLIENT_ID
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  return data.access_token;
}

export default async function handler(request) {
  const options = handleOptions(request);
  if (options) return options;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const { order_id, reservation_id } = await request.json();

    if (!order_id || !reservation_id) {
      return errorResponse('Missing order_id or reservation_id');
    }

    const accessToken = await getPayPalAccessToken();

    const capture = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${order_id}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = await capture.json();

    if (captureData.status === 'COMPLETED') {
      const supabase = getSupabaseAdmin();
      await supabase
        .from('reservations')
        .update({
          status: 'confirmed',
          payment_method: 'paypal',
          payment_id: order_id,
          paid_at: new Date().toISOString(),
        })
        .eq('id', reservation_id);
    }

    return jsonResponse(captureData);
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
