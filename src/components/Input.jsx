import React, { useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        ref={ref}
        type={type}
        className={`px-3 py-2 border border-gray-300 rounded-md ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
