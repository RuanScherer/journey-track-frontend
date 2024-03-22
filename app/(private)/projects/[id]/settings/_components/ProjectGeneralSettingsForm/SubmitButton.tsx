"use client"

import { CircleNotch } from "@phosphor-icons/react"
import { useFormStatus } from "react-dom"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="w-fit text-sm text-neutral-50 bg-primary-400 rounded px-3 py-2 mt-2 hover:bg-primary-500 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <CircleNotch className="self-end animate-spin w-5 h-5 text-gray-400" weight="bold" />
      ) : (
        "Save changes"
      )}
    </button>
  )
}