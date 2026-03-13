"use client";

import { useState, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";

interface FieldError {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

export default function AddressForm() {
  const router = useRouter();
  const { setShippingAddress } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  // Compute whether the form is valid (used to disable the submit button)
  const isFormValid = useMemo(() => {
    return Object.keys(validate(form)).length === 0;
  }, [form]);

  function handleChange(field: keyof ShippingAddress, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  }

  function handleBlur(field: keyof ShippingAddress) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    (Object.keys(form) as (keyof ShippingAddress)[]).forEach(
      (k) => (allTouched[k] = true)
    );
    setTouched(allTouched);

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setShippingAddress(form);
    router.push("/payment");
  }

  // ---------- Field config ----------
  const fields: {
    key: keyof ShippingAddress;
    label: string;
    type: string;
    placeholder: string;
    half?: boolean;
  }[] = [
    { key: "fullName", label: "Full Name", type: "text", placeholder: "Harsh Sharma" },
    { key: "email", label: "Email Address", type: "email", placeholder: "harsh@example.com" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210" },
    { key: "pinCode", label: "PIN Code", type: "text", placeholder: "110001", half: true },
    { key: "city", label: "City", type: "text", placeholder: "New Delhi", half: true },
    { key: "state", label: "State", type: "text", placeholder: "Delhi" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, type, placeholder, half }) => (
          <div key={key} className={half ? "" : "sm:col-span-2"}>
            <label
              htmlFor={key}
              className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5"
            >
              {label} <span className="text-red-400">*</span>
            </label>
            <input
              id={key}
              type={type}
              value={form[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              onBlur={() => handleBlur(key)}
              placeholder={placeholder}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 ${
                errors[key] && touched[key]
                  ? "border-red-300 focus:ring-red-400/40 focus:border-red-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors[key] && touched[key] && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors[key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer ${
          isFormValid
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-600"
            : "bg-gray-300 shadow-none cursor-not-allowed"
        }`}
      >
        Continue to Payment →
      </button>

      {!isFormValid && (
        <p className="text-center text-xs text-gray-400">
          Please fill in all required fields to continue.
        </p>
      )}
    </form>
  );
}
