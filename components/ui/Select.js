"use client";

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder,
  className,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-black mb-2"
        >
          {label} {required && <span className="text-black">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`appearance-none w-full px-4 py-3 border ${
            error ? "border-black" : "border-black/10"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all bg-white ${value ? "text-black" : "text-black/60"} pr-10 ${className ?? ""}`}
        >
          <option value="" disabled className="text-black/60">
            {placeholder ?? (label ? `Select ${label}` : "Select")}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50">
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M1 1l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-black">{error}</p>}
    </div>
  );
}
