import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  // Extract the 'stripe-signature' header from the request
  const signature = req.headers["stripe-signature"];

  // If the 'stripe-signature' header is not present, return a 400 Bad Request error
  if (!signature) {
    return res.status(400).send("Missing 'stripe-signature' header");
  }

  // Verify that the request is a valid Stripe webhook event
  let event;
  try {
    // Pass the request body and the 'stripe-signature' header to the function
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.WEBHOOK_ID
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Extract the customer ID from the webhook event
  const customerId = event.data.object.customer;

  // Return the customer ID in the response
  res.status(200).json({ customerId });
};
