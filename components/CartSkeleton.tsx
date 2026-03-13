"use client";

/**
 * CartSkeleton – Animated placeholder UI shown while cart data is loading.
 * Uses Tailwind's `animate-pulse` for a polished loading experience.
 */
export default function CartSkeleton() {
  return (
    <div className="animate-fade-in-up">
      {/* Step indicator skeleton */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              <div className="mt-1 h-2 w-10 rounded bg-gray-100 animate-pulse" />
            </div>
            {n < 4 && (
              <div className="mx-2 sm:mx-4 h-0.5 w-8 sm:w-16 rounded-full bg-gray-200 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title skeleton */}
          <div className="flex items-baseline gap-2">
            <div className="h-8 w-40 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-5 w-20 rounded-lg bg-gray-100 animate-pulse" />
          </div>

          {/* Item skeletons */}
          {[1, 2].map((n) => (
            <div
              key={n}
              className="flex items-center gap-4 sm:gap-6 rounded-2xl border border-gray-100 bg-white/60 p-4 sm:p-5"
            >
              {/* Image placeholder */}
              <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-xl bg-gray-200 animate-pulse" />

              {/* Text placeholders */}
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <div className="h-2.5 w-8 rounded bg-gray-100 animate-pulse" />
                    <div className="h-4 w-12 rounded bg-gray-200 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2.5 w-6 rounded bg-gray-100 animate-pulse" />
                    <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2.5 w-10 rounded bg-gray-100 animate-pulse" />
                    <div className="h-5 w-14 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white/70 p-5 sm:p-7 space-y-4">
              <div className="h-6 w-36 rounded bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3.5 w-40 rounded bg-gray-100 animate-pulse" />
                  <div className="h-3.5 w-10 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-44 rounded bg-gray-100 animate-pulse" />
                  <div className="h-3.5 w-10 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between">
                  <div className="h-3.5 w-16 rounded bg-gray-100 animate-pulse" />
                  <div className="h-3.5 w-14 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-16 rounded bg-gray-100 animate-pulse" />
                  <div className="h-3.5 w-10 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <div className="h-5 w-12 rounded bg-gray-200 animate-pulse" />
                <div className="h-6 w-16 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>

            {/* Button skeleton */}
            <div className="h-12 w-full rounded-xl bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
