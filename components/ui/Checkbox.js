"use client";

export default function Checkbox({ label, name, checked, onChange }) {
  return (
    <div className="flex items-start gap-2">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label htmlFor={name} className="text-sm text-gray-600 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
