import React from 'react';
export function Button({ children, onClick, className = "", variant = "default" }) {
  const base = "px-4 py-2 rounded text-white";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
