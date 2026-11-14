import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../api/api";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const txRef = searchParams.get("tx_ref");

    if (!txRef) {
      setStatus("failed");
      setMessage("Transaction reference was not found.");
      return;
    }

    let cancelled = false;

    const checkPayment = async () => {
      try {
        const result = await verifyPayment(txRef);

        if (cancelled) return;

        if (result.success && result.paymentStatus === "paid") {
          setStatus("success");
          setMessage("Your payment was successful!");
        } else if (result.success && result.data?.paymentStatus === "paid") {
          setStatus("success");
          setMessage("Your payment was successful!");
        } else {
          setStatus("failed");
          setMessage(result.message || "Payment could not be verified.");
        }
      } catch (error) {
        if (cancelled) return;

        setStatus("failed");
        setMessage(
          error.message || "Payment verification failed. Please check your orders."
        );
      }
    };

    checkPayment();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="border rounded-2xl p-8 shadow-sm">
        {status === "verifying" && (
          <>
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <h1 className="text-2xl font-bold">Verifying Payment</h1>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl text-green-600 mb-4">✓</div>
            <h1 className="text-2xl font-bold text-green-700">
              Payment Successful
            </h1>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="text-5xl text-red-600 mb-4">!</div>
            <h1 className="text-2xl font-bold text-red-700">
              Payment Not Confirmed
            </h1>
          </>
        )}

        <p className="mt-4 text-gray-600">{message}</p>

        {status !== "verifying" && (
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/orders"
              className="rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
            >
              View My Orders
            </Link>

            {status === "failed" && (
              <Link
                to="/checkout"
                className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50"
              >
                Return to Checkout
              </Link>
            )}

            <Link
              to="/"
              className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-50"
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;