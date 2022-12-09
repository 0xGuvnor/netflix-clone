import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const loadCheckout = async (priceId: string) => {
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

const loadBillingPortal = async () => {
  const instance = getFunctions(app, "us-central1");
  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  const { data }: any = await functionRef({
    returnUrl: `${window.location.origin}/account`,
    locale: "auto", // Optional, defaults to "auto"
  });
  window.location.assign(data.url);
};

export { loadCheckout, loadBillingPortal };
export default payments;
