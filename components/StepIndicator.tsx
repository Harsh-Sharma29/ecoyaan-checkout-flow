"use client";

/**
 * StepIndicator – Reusable progress stepper for the checkout flow.
 * Extracted from CartPageClient for modularity and reuse across pages.
 */
export default function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Cart" },
    { num: 2, label: "Shipping" },
    { num: 3, label: "Payment" },
    { num: 4, label: "Done" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 sm:gap-2">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                step.num < currentStep
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                  : step.num === currentStep
                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.num < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={`mt-1 text-[10px] font-medium ${step.num === currentStep ? "text-emerald-600" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`mx-2 sm:mx-4 h-0.5 w-8 sm:w-16 rounded-full transition-all duration-300 ${step.num < currentStep ? "bg-emerald-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
