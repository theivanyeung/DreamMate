import { stripe } from "../../utils/stripe";

const { TEST_PRO_PLAN } = process.env;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: TEST_PRO_PLAN,
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "subscription",
        success_url: "https://c2f4-73-93-11-139.ngrok.io/home", // Create success url
        cancel_url: "https://c2f4-73-93-11-139.ngrok.io/options/pro", // Cancel url
      });
      // Send the Stripe session URL as sa response
      res.status(200).json({ url: session.url });
    } catch (err) {
      // Handle any errors
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
