"use client";

import { useState, FormEvent, useMemo, useEffect } from "react";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";

interface FieldError {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

const emptyAddress: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

interface AddressFormProps {
  onSubmit?: () => void;
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const { shippingAddresses, setShippingAddresses, hydrated } = useCheckout();

  const [errorsMap, setErrorsMap] = useState<Record<number, FieldError>>({});
  const [touchedMap, setTouchedMap] = useState<
    Record<number, Record<string, boolean>>
  >({});

  // Ensure there's always at least one address block after hydration
  useEffect(() => {
    if (hydrated && shippingAddresses.length === 0) {
      setShippingAddresses([{ ...emptyAddress }]);
    }
  }, [hydrated, shippingAddresses.length, setShippingAddresses]);

  // Use context as the single source of truth; fallback to empty address for SSR
  const addresses =
    shippingAddresses.length > 0 ? shippingAddresses : [{ ...emptyAddress }];

  // ---------- Validation ----------
  function validate(data: ShippingAddress): FieldError {
    const errs: FieldError = {};
    if (!data.fullName.trim()) errs.fullName = "Full Name is required";
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!data.phone.trim()) {
      errs.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }
    if (!data.pinCode.trim()) {
      errs.pinCode = "PIN Code is required";
    } else if (!/^\d{6}$/.test(data.pinCode)) {
      errs.pinCode = "Enter a valid 6-digit PIN code";
    }
    if (!data.city.trim()) errs.city = "City is required";
    if (!data.state.trim()) errs.state = "State is required";
    return errs;
  }

  const isFormValid = useMemo(() => {
    if (!hydrated || shippingAddresses.length === 0) return false;
    return shippingAddresses.every((a) => Object.keys(validate(a)).length === 0);
  }, [shippingAddresses, hydrated]);

  function handleChange(
    idx: number,
    field: keyof ShippingAddress,
    value: string
  ) {
    const nextAddresses = [...addresses];
    nextAddresses[idx] = { ...nextAddresses[idx], [field]: value };
    setShippingAddresses(nextAddresses);

    if (touchedMap[idx]?.[field]) {
      setErrorsMap((prev) => ({
        ...prev,
        [idx]: validate(nextAddresses[idx]),
      }));
    }
  }

  function handleBlur(idx: number, field: keyof ShippingAddress) {
    setTouchedMap((prev) => ({
      ...prev,
      [idx]: { ...(prev[idx] || {}), [field]: true },
    }));
    setErrorsMap((prev) => ({
      ...prev,
      [idx]: validate(addresses[idx]),
    }));
  }

  function addAddress() {
    setShippingAddresses([...addresses, { ...emptyAddress }]);
  }

  function removeAddress(idx: number) {
    if (addresses.length <= 1) return;
    const nextAddresses = addresses.filter((_, i) => i !== idx);
    setShippingAddresses(nextAddresses);

    setErrorsMap((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
    setTouchedMap((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Touch all fields in all addresses
    const allTouched: Record<number, Record<string, boolean>> = {};
    const allErrors: Record<number, FieldError> = {};
    let hasError = false;
    addresses.forEach((addr, idx) => {
      allTouched[idx] = {};
      (Object.keys(addr) as (keyof ShippingAddress)[]).forEach(
        (k) => (allTouched[idx][k] = true)
      );
      const errs = validate(addr);
      allErrors[idx] = errs;
      if (Object.keys(errs).length > 0) hasError = true;
    });

    setTouchedMap(allTouched);
    setErrorsMap(allErrors);
    if (hasError) return;

    onSubmit?.();
  }

  // ---------- Field config ----------
  const fields: {
    key: keyof ShippingAddress;
    label: string;
    type: string;
    placeholder: string;
    half?: boolean;
  }[] = [
    {
      key: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Harsh Sharma",
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      placeholder: "harsh@example.com",
    },
    {
      key: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "9876543210",
    },
    {
      key: "pinCode",
      label: "PIN Code",
      type: "text",
      placeholder: "110001",
      half: true,
    },
    {
      key: "city",
      label: "City",
      type: "text",
      placeholder: "New Delhi",
      half: true,
    },
    { key: "state", label: "State", type: "text", placeholder: "Delhi" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {addresses.map((addr, idx) => (
        <div
          key={idx}
          className="relative rounded-xl border border-gray-100 bg-white/50 p-5 sm:p-6 space-y-4 transition-all duration-200"
        >
          {/* Address header */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-xs font-bold">
                {idx + 1}
              </span>
              {idx === 0 ? "Primary Address" : `Address ${idx + 1}`}
            </h4>
            {addresses.length > 1 && (
              <button
                type="button"
                onClick={() => removeAddress(idx)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, type, placeholder, half }) => (
              <div key={key} className={half ? "" : "sm:col-span-2"}>
                <label
                  htmlFor={`${key}-${idx}`}
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5"
                >
                  {label} <span className="text-red-400">*</span>
                </label>
                <input
                  id={`${key}-${idx}`}
                  type={type}
                  value={addr[key]}
                  onChange={(e) => handleChange(idx, key, e.target.value)}
                  onBlur={() => handleBlur(idx, key)}
                  placeholder={placeholder}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 ${
                    errorsMap[idx]?.[key] && touchedMap[idx]?.[key]
                      ? "border-red-300 focus:ring-red-400/40 focus:border-red-400"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errorsMap[idx]?.[key] && touchedMap[idx]?.[key] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errorsMap[idx]?.[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Address button */}
      <button
        type="button"
        onClick={addAddress}
        className="w-full rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-300 py-3 text-sm font-semibold text-gray-400 hover:text-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Another Address
      </button>

      {/* Hidden submit button — form submission is triggered by StickyFooter's Next */}
      <button type="submit" id="address-form-submit" className="hidden" />

      {!isFormValid && (
        <p className="text-center text-xs text-gray-400">
          Please fill in all required fields to continue.
        </p>
      )}
    </form>
  );
}
