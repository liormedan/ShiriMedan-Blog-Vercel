"use client";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children }: PropsWithChildren) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
      <DialogPrimitive.Content className="fixed inset-0 m-auto h-fit w-[min(520px,92vw)] rounded-lg bg-white p-4 shadow-lg focus:outline-none">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = (props: PropsWithChildren) => (
  <DialogPrimitive.Title className="text-lg font-semibold mb-2">{props.children}</DialogPrimitive.Title>
);

export const DialogDescription = (props: PropsWithChildren) => (
  <DialogPrimitive.Description className="text-sm text-gray-600 mb-3">{props.children}</DialogPrimitive.Description>
);

export const DialogClose = DialogPrimitive.Close;

