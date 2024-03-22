"use client"

import { InputHTMLAttributes } from "react"

interface RawInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
}

export function Raw({ label, errorMessage, className, ...rest }: RawInputProps) {
  return (
    <label htmlFor={rest.id} className="text-sm text-gray-700">
      {label}
      <input
        {...rest}
        className={
          `rounded bg-gray-100 px-3 py-2 mt-0.5 w-full focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition disabled:cursor-not-allowed ${className}`
        }
        spellCheck="false"
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </label>
  )
}