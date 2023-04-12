const { STRIPE_SECRET_KEY } = process.env;

import Stripe from "stripe";

export const stripe = Stripe(STRIPE_SECRET_KEY);
