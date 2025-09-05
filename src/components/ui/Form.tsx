import { TextareaHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';

export function Label({ children }: PropsWithChildren) {
  return <label className="block text-sm text-gray-600 mb-1">{children}</label>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ${props.className ?? ''}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full min-h-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ${props.className ?? ''}`} />;
}

export function Button({ children, ...rest }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button {...rest} className={`inline-flex items-center gap-1 rounded-md bg-gray-900 text-white px-3 py-2 text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${rest.className ?? ''}`}>
      {children}
    </button>
  );
}

