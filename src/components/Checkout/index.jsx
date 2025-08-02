//clear cart on thank you page
// clearCart() on thank-you page	✅ Recommended	Cart is only cleared after confirmed success
// clearCart() via webhook	✅✅ Best for backend logic	Fully safe, especially for backend-synced cart

"use client";
import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  createPaymentOrder,
  verifyRazorpayPayment,
} from "../../app/lib/API/razorpayApi";
import { createOrder } from "../../app/lib/API/orderApi";
import { useCart } from "../../app/context/CartContext";
import ProgressSteps from "./ProgressSteps";
import ContactInfo from "./ContactInfo";
import ShippingAddress from "./ShippingAddress";
import BillingAddress from "./BillingAddress";
import OrderNotes from "./OrderNotes";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const { cartItems: cart } = useCart();
  const [shipping, setShipping] = useState({
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();

  // Calculate subtotal (products + variant modifiers)
  const subtotal = cart.reduce((sum, item) => {
    const basePrice = item.product.price;
    const variantPrice =
      item.selectedVariants?.reduce(
        (vsum, v) => vsum + (v.priceModifier || 0),
        0
      ) || 0;

    return sum + (basePrice + variantPrice) * item.quantity;
  }, 0);

  // Example shipping calculation (flat or dynamic logic)
  const shippingAmount = subtotal > 1000 ? 0 : 50; // Free shipping above ₹1000
  const shippingInfo = { name: "Standard Shipping", amount: shippingAmount };

  // Example tax calculation (e.g., 18% GST)
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const taxInfo = { name: "GST 18%", amount: taxAmount };

  // Final total
  const total = subtotal + shippingAmount + taxAmount;

  // Handle input changes
  const handleBillingChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleBillingAddressChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  // Update billing address when same as shipping is toggled
  React.useEffect(() => {
    if (sameAsBilling) {
      setBillingAddress(shipping);
    }
  }, [sameAsBilling, shipping]);

  // Streamlined Checkout Flow: Order → Razorpay → Payment → Webhook handles rest
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare order products from cart
      const products = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        selectedVariants: item.selectedVariants,
      }));

      const shippingAddress = shipping;

      // 2. Create Order in DB (pending status)
      const savedOrder = await createOrder({
        products,
        total,
        subtotal,
        shippingAddress,
        billingAddress: sameAsBilling ? shipping : billingAddress,
        shipping: shippingInfo,
        tax: taxInfo,
        status: "pending",
        paymentInfo: {
          paymentStatus: "pending",
        },
        notes,
      });

      // 3. Create Razorpay Order via backend API
      const razorpayOrder = await createPaymentOrder({
        amount: total * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: savedOrder._id,
        payment_capture: 1,
        notes: {
          merchant_order_id: savedOrder._id,
          shipping_email: billing.email,
        },
      });

      // 4. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "QuickCart",
        description: "Product Purchase",
        prefill: {
          name: `${billing.firstName} ${billing.lastName}`,
          email: billing.email,
          contact: billing.phone,
        },
        handler: async function (response) {
          try {
            // 5. Verify payment signature (frontend verification)
            await verifyRazorpayPayment(response);

            // 6. Success! Webhook will handle all order updates
            console.log(
              "Payment successful! Webhook will process splits and transfers."
            );
            router.push("/(customer)/mail-success");
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
          },
        },
        theme: { color: "#6366f1" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Checkout error", error);
      alert("Failed to start payment. Please try again.");
    }
    setLoading(false);
  };

  const steps = [
    {
      id: 1,
      name: "Contact Info",
      completed: billing.firstName && billing.email,
    },
    { id: 2, name: "Shipping", completed: shipping.street && shipping.city },
    { id: 3, name: "Payment", completed: false },
  ];

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="mt-2 text-gray-600">Complete your purchase</p>
          </div>

          {/* Progress Steps */}
          <ProgressSteps steps={steps} activeStep={activeStep} />

          <form
            onSubmit={handleCheckout}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <ContactInfo
                billing={billing}
                handleBillingChange={handleBillingChange}
              />

              {/* Shipping Address */}
              <ShippingAddress
                shipping={shipping}
                handleShippingChange={handleShippingChange}
              />

              {/* Billing Address */}
              <BillingAddress
                sameAsBilling={sameAsBilling}
                setSameAsBilling={setSameAsBilling}
                billingAddress={billingAddress}
                handleBillingAddressChange={handleBillingAddressChange}
                shipping={shipping}
              />

              {/* Order Notes */}
              <OrderNotes notes={notes} setNotes={setNotes} />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cart={cart}
                subtotal={subtotal}
                shippingInfo={shippingInfo}
                taxInfo={taxInfo}
                total={total}
                loading={loading}
                handleCheckout={handleCheckout}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
