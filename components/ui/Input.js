"use client";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon: Icon,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-black mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50">
            <Icon size={20} />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 border ${
            error ? "border-black" : "border-black/10"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all bg-white text-black placeholder-black/60`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-black">{error}</p>}
    </div>
  );
}
