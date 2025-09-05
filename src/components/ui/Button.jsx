export function Button({ children, className = "", variant = "default", ...props }) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition shadow-sm focus:ring focus:ring-blue-300";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
