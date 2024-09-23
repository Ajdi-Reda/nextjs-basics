"use client";
import { useFormStatus } from "react-dom";

export default function SubmitMealFormButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "submitting..." : "Share meal"}
    </button>
  );
}
