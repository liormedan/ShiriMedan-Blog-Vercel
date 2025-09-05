"use client";
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: false;
};

export function Button({ className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={
        `inline-flex items-center gap-1 rounded-md bg-brand-primary text-white px-3 py-2 text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`
      }
    >
      {children}
    </button>
  );
}

export default Button;
