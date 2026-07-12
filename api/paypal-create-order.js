const { handleOptions, jsonResponse, errorResponse } = require('./_lib');

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
    const { reservation_id, total_amount } = await request.json();

    if (!reservation_id || !total_amount) {
      return errorResponse('Missing reservation_id or total_amount');
    }

    const accessToken = await getPayPalAccessToken();

    const order = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: reservation_id,
          description: `Reserva Hotel CEMAR #${reservation_id}`,
          amount: {
            currency_code: 'EUR',
            value: total_amount.toFixed(2),
          },
        }],
      }),
    });

    const orderData = await order.json();

    return jsonResponse({
      orderId: orderData.id,
      status: orderData.status,
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
