const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
export function client () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
export function environment () {
  const clientId = process.env.PAYPAL_SANDBOX_CLIENT || 'PAYPAL-SANDBOX-CLIENT-ID';
  const clientSecret = process.env.PAYPAL_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET';

  return new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId, clientSecret
  );
}

async function prettyPrint (jsonData, pre = '') {
  let pretty = '';

  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      pretty += pre + (parseInt(key) + 1) + ': ';

      if (typeof jsonData[key] === 'object') {
        pretty += '\n';
        pretty += await prettyPrint(jsonData[key], pre + '    ');
      } else {
        pretty += jsonData[key] + '\n';
      }
    }
  }
  return pretty;
}
