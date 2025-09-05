"use client";
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { PropsWithChildren } from 'react';

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export function DropdownMenuContent({ children }: PropsWithChildren) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content align="end" className="z-50 min-w-40 rounded-md border border-gray-200 bg-white p-1 text-sm shadow-lg">
        {children}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  );
}

export function DropdownMenuItem({ children, onSelect }: PropsWithChildren<{ onSelect?: () => void }>) {
  return (
    <DropdownPrimitive.Item onSelect={onSelect} className="cursor-pointer rounded px-2 py-1 outline-none hover:bg-gray-50 focus:bg-gray-50">
      {children}
    </DropdownPrimitive.Item>
  );
}

export const DropdownMenuSeparator = () => <div className="my-1 h-px bg-gray-200" />;

