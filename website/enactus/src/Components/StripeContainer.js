import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51Ng6g9SIBQglOEVYtetSeCBbbUtPZp2pkTUBhhXLkUKHUxeBQMNWervxfxsjohL814T525kiKQ5idvLEiJKbozhh00WIB6Znze"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}