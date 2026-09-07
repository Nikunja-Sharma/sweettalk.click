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
      "Custom mood creator & 5 daily icebreakers",
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
    <div className="min-h-screen bg-surface flex flex-col items-center justify-start antialiased text-on-surface">
      {toastMessage && (
        <div className="fixed top-20 z-[60] px-4 py-2 bg-on-surface text-surface rounded-full text-label-sm font-medium shadow-lg animate-bounce flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary-container">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  workspace_premium
                </span>
                <h3 className="font-headline-md text-on-surface">Confirm VIP Order</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-headline-md text-on-surface">{selectedPlanData.name}</span>
                <span className="font-headline-lg text-primary">{selectedPlanData.price}</span>
              </div>
              <span className="text-label-sm text-outline">{selectedPlanData.period}</span>
              <p className="text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
                Includes priority AI generation, 4 core mood modes, and unlimited icebreakers.
              </p>
            </div>

            <button
              type="button"
              onClick={confirmCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 bg-primary hover:bg-surface-tint text-on-primary font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-label-lg active:scale-95 cursor-pointer disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  <span>Activating VIP...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Confirm &amp; Pay {selectedPlanData.price}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-2xl md:border-x md:border-outline-variant/30">
        <AppHeader title="Pricing" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-28 bg-surface flex-1">
          <div className="flex flex-col w-full pb-8">
            {/* Header Title Section */}
            <div className="flex flex-col mb-6 mt-2">
              <h1 className="font-headline-lg text-on-surface">Upgrade to Rizz VIP</h1>
              <p className="font-body-md text-on-surface-variant mt-1 leading-relaxed">
                Unlock unlimited AI chat replies, advanced tone controls, and exclusive pickup lines.
              </p>
            </div>

            {/* Plan Selector Segmented Tabs */}
            <div className="flex bg-surface-container-high p-1 rounded-full mb-6">
              <button
                type="button"
                onClick={() => setCurrentPlan("monthly")}
                className={`flex-1 py-2.5 rounded-full text-label-lg font-bold transition-all cursor-pointer ${
                  currentPlan === "monthly"
                    ? "bg-surface text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setCurrentPlan("annual")}
                className={`flex-1 py-2.5 rounded-full text-label-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  currentPlan === "annual"
                    ? "bg-surface text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.5 rounded-full font-semibold">
                  Save 58%
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPlan("lifetime")}
                className={`flex-1 py-2.5 rounded-full text-label-lg font-bold transition-all cursor-pointer ${
                  currentPlan === "lifetime"
                    ? "bg-surface text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Lifetime
              </button>
            </div>

            {/* Plan Cards Stack */}
            <div className="flex flex-col gap-4">
              {PLANS.map((plan) => {
                const isSelected = currentPlan === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setCurrentPlan(plan.id)}
                    className={`relative bg-surface-container-lowest p-6 rounded-2xl transition-all duration-300 ease-out cursor-pointer border-2 active:scale-[0.99] ${
                      isSelected
                        ? "border-primary shadow-lg scale-[1.01]"
                        : "border-transparent shadow-sm hover:border-outline-variant/40 hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-6 bg-primary text-on-primary text-label-sm px-3 py-1 rounded-full font-bold shadow-sm">
                        Most Popular
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span
                          className={`text-label-sm uppercase tracking-wider font-bold ${
                            isSelected ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
                          {plan.badge}
                        </span>
                        <h3 className="font-headline-md text-on-surface mt-0.5">{plan.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-headline-lg text-on-surface whitespace-nowrap">{plan.price}</span>
                        <span className="text-label-sm text-on-surface-variant block whitespace-nowrap">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-2.5 text-body-md text-on-surface-variant">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Upgrade CTA */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleUpgrade}
                className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg hover:opacity-95 active:scale-95 transition-all text-center flex items-center justify-center gap-2 text-label-lg cursor-pointer"
              >
                <span className="material-symbols-outlined">workspace_premium</span>
                <span>Upgrade to {selectedPlanData.name}</span>
              </button>
              <p className="text-center text-label-sm text-on-surface-variant mt-3">
                Cancel anytime in your app store settings. Secure checkout.
              </p>
            </div>

            {/* Frequently Asked Questions */}
            <div className="mt-10 mb-4">
              <h3 className="font-headline-md text-on-surface mb-4">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-3">
                {FAQS.map((faq, index) => {
                  const isOpen = !!openFaqs[index];
                  return (
                    <div
                      key={index}
                      className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center text-left font-bold text-on-surface cursor-pointer gap-2"
                      >
                        <span className="text-label-lg">{faq.question}</span>
                        <span
                          className={`material-symbols-outlined transition-transform duration-200 text-outline ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <p className="text-body-md text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/15 leading-relaxed text-sm animate-in fade-in">
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
