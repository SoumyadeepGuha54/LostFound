"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
}) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-black text-white hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-white border border-black text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border border-black text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
    social:
      "bg-white border border-black text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        variant === "primary" ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        )
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
}
