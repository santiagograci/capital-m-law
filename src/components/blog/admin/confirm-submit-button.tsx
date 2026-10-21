"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

/** Submit button that asks for confirmation and disables while pending. */
export function ConfirmSubmitButton({
  message,
  ...props
}: ComponentProps<"button"> & { message: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending || props.disabled}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    />
  );
}
