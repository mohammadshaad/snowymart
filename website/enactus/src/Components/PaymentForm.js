import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8000/payment", {
          amount: 10000,
          id,
        });

        if (response.data.requiresAction) {
          // Payment requires additional action, like 3D Secure authentication
          const { error: confirmError } = await stripe.confirmPayment(
            response.data.clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            }
          );

          if (confirmError) {
            console.log("Error confirming payment", confirmError);
          } else {
            console.log("Payment confirmed successfully");
            setSuccess(true);
          }
        } else if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white">
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4 h-full">
          <div className="space-y-2">
            <CardElement className="p-2 border rounded-md" />
          </div>
          <button className="w-full px-4 py-2 pay-btn transition duration-300 ease-in-out">
            Pay
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            You just bought a sweet product! Congratulations, this is the best
            decision of your life.
          </h2>
        </div>
      )}
    </div>
  );
}
