"use client";

import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

interface Plan {
  id: "monthly" | "annual" | "lifetime";
  badge: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "monthly",
    badge: "Starter",
    name: "Monthly Pass",
    price: "$9.99",
    period: "/ month",
    features: [
      "Unlimited AI Rizz Generator",
      "4 Core Mood Modes",
      "Basic saved folders",
    ],
  },
  {
    id: "annual",
    badge: "Best Value",
    name: "Annual VIP",
    price: "$49.99",
    period: "$4.16 / mo",
    popular: true,
    features: [
      "Everything in Monthly",
      "Priority AI generation speed",
      "Custom mood creator & daily icebreakers",
      "Unlimited saved folders",
    ],
  },
  {
    id: "lifetime",
    badge: "Ultimate",
    name: "Lifetime Pass",
    price: "$89.99",
    period: "one-time",
    features: [
      "Lifetime access to all VIP perks",
      "All future feature updates included",
      "VIP Discord community access",
    ],
  },
];

const FAQS = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time directly through your Apple App Store or Google Play Store account settings without any extra fees.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We offer a 3-day free trial on the Annual VIP plan so you can test out all advanced AI features before your first billing cycle starts.",
  },
  {
    question: "Does SweetTalk work on all dating apps?",
    answer:
      "SweetTalk is fully compatible with Tinder, Bumble, Hinge, Instagram DMs, and any other messaging platform via our smart overlay keyboard and copy-paste tools.",
  },
];

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState<"monthly" | "annual" | "lifetime">("annual");
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleUpgrade = () => {
    setShowCheckoutModal(true);
  };

  const confirmCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckoutModal(false);
      showToast(`🎉 Congratulations! You are now subscribed to ${currentPlan.toUpperCase()} VIP!`);
    }, 1200);
  };

  const selectedPlanData = PLANS.find((p) => p.id === currentPlan) || PLANS[1];

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col items-center justify-start antialiased text-on-surface">
      {toastMessage && (
        <div className="fixed top-20 z-[60] px-4 py-2.5 bg-zinc-900/90 text-white backdrop-blur-md rounded-full text-label-sm font-medium shadow-xl animate-fade-in-up flex items-center gap-2 border border-white/10">
          <span className="material-symbols-outlined text-[16px] text-primary-fixed">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-in border border-black/[0.08]">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  workspace_premium
                </span>
                <h3 className="font-headline-md text-on-surface text-base font-bold">
                  Confirm VIP Order
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col gap-2 border border-black/[0.04]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-on-surface">{selectedPlanData.name}</span>
                <span className="font-bold text-lg text-primary">{selectedPlanData.price}</span>
              </div>
              <span className="text-[11px] text-outline">{selectedPlanData.period}</span>
              <p className="text-[11px] text-on-surface-variant/70 pt-2 border-t border-black/[0.04]">
                Includes unlimited AI replies, custom screenshot analysis, and priority queue.
              </p>
            </div>

            <button
              type="button"
              onClick={confirmCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer active:scale-95 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">
                    progress_activity
                  </span>
                  <span>Activating VIP...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Confirm &amp; Pay {selectedPlanData.price}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-xl shadow-black/5 md:border-x md:border-black/[0.05]">
        <AppHeader title="VIP Pricing" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-32 bg-surface flex-1">
          <div className="flex flex-col w-full pb-6">
            {/* Header Title Section */}
            <div className="flex flex-col mb-5 mt-1 text-center">
              <span className="text-[11px] font-bold tracking-wider text-primary uppercase mb-1">
                Unlock Full Potential
              </span>
              <h1 className="font-headline-lg text-on-surface text-xl sm:text-2xl font-bold tracking-tight">
                Upgrade to Rizz VIP
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-1 max-w-xs mx-auto leading-relaxed">
                Unlimited AI chat replies, advanced tone controls, and exclusive openers.
              </p>
            </div>

            {/* Plan Selector Segmented Tabs */}
            <div className="flex bg-zinc-100/90 p-1 rounded-full mb-5 border border-black/[0.04]">
              <button
                type="button"
                onClick={() => setCurrentPlan("monthly")}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                  currentPlan === "monthly"
                    ? "bg-white text-zinc-900 shadow-sm font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setCurrentPlan("annual")}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 active:scale-95 ${
                  currentPlan === "annual"
                    ? "bg-white text-zinc-900 shadow-sm font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>Annual</span>
                <span className="text-[9.5px] bg-primary text-white px-1.5 py-0.5 rounded-full font-bold">
                  Save 58%
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPlan("lifetime")}
                className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                  currentPlan === "lifetime"
                    ? "bg-white text-zinc-900 shadow-sm font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Lifetime
              </button>
            </div>

            {/* Plan Cards Stack */}
            <div className="flex flex-col gap-3.5">
              {PLANS.map((plan) => {
                const isSelected = currentPlan === plan.id;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setCurrentPlan(plan.id)}
                    className={`w-full text-left relative bg-white p-5 rounded-3xl transition-all duration-300 ease-out cursor-pointer border-2 active:scale-[0.99] select-none touch-manipulation ${
                      isSelected
                        ? "border-primary shadow-soft scale-[1.01]"
                        : "border-black/[0.06] shadow-2xs hover:border-black/[0.15] hover:-translate-y-0.5"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-5 bg-gradient-to-r from-primary to-indigo-600 text-white text-[10.5px] px-3 py-0.5 rounded-full font-bold shadow-sm pointer-events-none">
                        Most Popular
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-3 pointer-events-none">
                      <div>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold ${
                            isSelected ? "text-primary" : "text-outline"
                          }`}
                        >
                          {plan.badge}
                        </span>
                        <h3 className="text-base font-bold text-on-surface mt-0.5">{plan.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-on-surface whitespace-nowrap">
                          {plan.price}
                        </span>
                        <span className="text-[11px] text-outline block whitespace-nowrap">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-2 text-xs text-on-surface-variant pt-2 border-t border-black/[0.04] pointer-events-none">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[16px]">
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {/* Upgrade CTA */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleUpgrade}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full shadow-md shadow-primary/25 hover:opacity-95 active:scale-95 transition-all text-center flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                <span>Upgrade to {selectedPlanData.name}</span>
              </button>
              <p className="text-center text-[11px] text-outline mt-2.5">
                Cancel anytime in your app store settings. Secure checkout.
              </p>
            </div>

            {/* Frequently Asked Questions */}
            <div className="mt-8 mb-4">
              <h3 className="font-headline-md text-on-surface text-sm font-bold mb-3 px-1">
                Frequently Asked Questions
              </h3>
              <div className="flex flex-col gap-2.5">
                {FAQS.map((faq, index) => {
                  const isOpen = !!openFaqs[index];
                  return (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-2xl border border-black/[0.06] transition-colors shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center text-left font-semibold text-xs sm:text-sm text-on-surface cursor-pointer gap-2"
                      >
                        <span>{faq.question}</span>
                        <span
                          className={`material-symbols-outlined transition-transform duration-200 text-outline text-[18px] ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        >
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <p className="text-xs text-on-surface-variant/80 mt-2 pt-2 border-t border-black/[0.04] leading-relaxed animate-in fade-in">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
