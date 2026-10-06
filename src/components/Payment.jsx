import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ Imported useLocation

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Read the plan details from the Pricing page (Default to Pro if missing)
  const planName = location.state?.planName || "Pro";
  const amount = location.state?.amount || 999;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const res = await loadRazorpayScript();
    if (!res) {
      setError("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await fetch("http://localhost:8000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount }), // ✅ Dynamically uses 999 or 1999
      });

      if (!orderResponse.ok) throw new Error("Failed to create order on the server.");
      const orderData = await orderResponse.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount, 
        currency: orderData.currency,
        name: "Career Counsel",
        description: `${planName} Plan Subscription`, // ✅ Dynamic description
        order_id: orderData.id, 
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          navigate("/"); 
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#2563EB", 
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
        <div className="mb-8">
          {/* ✅ Dynamically displays the correct Plan Name and Price */}
          <h2 className="text-3xl font-extrabold text-gray-800">{planName} Plan</h2>
          <p className="text-gray-500 mt-2">Secure checkout via Razorpay</p>
          <div className="text-5xl font-black text-gray-900 mt-4 mb-2">₹{amount}</div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        <button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {loading ? "Processing..." : "Pay Securely via UPI / Cards"}
        </button>

        <div className="flex justify-center items-center gap-4 mt-6 opacity-60">
            <span className="font-bold text-sm tracking-wider">GPay</span>
            <span className="font-bold text-sm tracking-wider">PhonePe</span>
            <span className="font-bold text-sm tracking-wider">Paytm</span>
        </div>

        <div className="mt-8">
          <Link to="/pricing" className="text-gray-500 hover:text-blue-600 text-sm font-medium">
            ← Cancel and return to pricing
          </Link>
        </div>

      </div>
    </div>
  );
}