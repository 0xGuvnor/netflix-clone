import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import app from "../firebase";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export const loadCheckout = async (priceId: string) => {
  try {
    const session = await createCheckoutSession(payments, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    window.location.assign(session.url);
  } catch (error) {
    console.error(error);
    window.alert(error);
  }
};

export default payments;
