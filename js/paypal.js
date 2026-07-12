/* === HOTEL CEMAR - PAYPAL PAYMENT === */

async function initPayPalButton(containerId, reservationId, totalAmount, onSuccess, onError) {
  if (typeof paypal === 'undefined') {
    await loadPayPalSDK();
  }

  if (typeof paypal === 'undefined') {
    console.warn('PayPal SDK no disponible');
    return;
  }

  if (document.getElementById('paypal-button-container')) {
    paypal.Buttons({
      createOrder: async () => {
        const res = await fetch('/api/paypal-create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reservation_id: reservationId, total_amount: totalAmount }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data.orderId;
      },
      onApprove: async (data) => {
        const res = await fetch('/api/paypal-capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: data.orderID, reservation_id: reservationId }),
        });
        const capture = await res.json();
        if (capture.status === 'COMPLETED' || capture.status === 'COMPLETED') {
          onSuccess?.(capture);
        } else {
          onError?.(new Error('Payment not completed'));
        }
      },
      onError: (err) => {
        onError?.(err);
      },
    }).render(`#${containerId}`);
  }
}

function loadPayPalSDK() {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="paypal"]')) {
      resolve();
      return;
    }
    const clientId = window.ENV?.PAYPAL_CLIENT_ID;
    if (!clientId) { reject(new Error('PayPal Client ID no configurado')); return; }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&locale=es_ES`;
    script.async = true;
    script.onload = () => setTimeout(resolve, 500);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
