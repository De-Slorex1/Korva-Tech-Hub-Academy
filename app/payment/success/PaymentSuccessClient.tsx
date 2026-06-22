"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { GridBackground } from "@/components/grid-background";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);


  const handleDownloadReceipt = async () => {
    if (!reference) {
      alert("Missing reference");
      return;
    }

    try {
      const res = await fetch("/api/receipt/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.trim() }),
      });

      if (!res.ok) {
        const text = await res.text();

        console.error("Receipt error response:", text);

        let err;
        try {
          err = JSON.parse(text);
        } catch {
          err = { error: text };
        }

        alert(err?.error || "Failed to generate receipt");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `korva-receipt-${reference}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Download failed:", err);
      alert("Something went wrong downloading receipt");
    }
  };
    
  useEffect(() => {
  const verifyPayment = async () => {
    if (!reference) return;

    try {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const result = await res.json();

      if (result.success) {
        setData(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  verifyPayment();
}, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking payment status...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
      <GridBackground />
      <div className="relative max-w-3xl w-full text-center">

        {/* ICON */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          </div>
        </div>

        {/* TAG */}
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs">
          ENROLLMENT CONFIRMED
        </div>

        {/* TITLE */}
        <h1 className="mt-6 text-4xl font-bold">
          Welcome to the Next Generation of African Tech.
        </h1>

        <p className="mt-4 text-white/60">
          You’ve successfully secured your spot. Your journey starts now.
        </p>

        {/* CARD */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left">
          <div className="grid md:grid-cols-3 gap-4 text-sm">

            <div>
              <p className="text-white/40">PAYMENT STATUS</p>
              <p className="text-emerald-400 font-medium">Successful</p>
            </div>

            <div>
              <p className="text-white/40">REFERENCE</p>
              <p className="text-white/80">{reference}</p>
            </div>

            <div>
              <p className="text-white/40">NEXT STEP</p>
              <p className="text-violet-300 font-medium">
                Access Learning Portal
              </p>
            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadReceipt}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition flex items-center justify-center gap-2"
            >
            Download Receipt
          </button>

          <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">
            Proceed to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}