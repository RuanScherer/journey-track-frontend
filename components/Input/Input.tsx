"use client"

import { useFormContext } from "react-hook-form"

interface InputProps {
  name: string
  label: string
  type: string
  placeholder: string
  className?: string
  disabled?: boolean
}

export function Input(props: InputProps) {
  const { register, formState: { errors } } = useFormContext()

  return (
    <label htmlFor={props.name} className="text-sm text-gray-700">
      {props.label}
      <input
        {...register(props.name)}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={
          `rounded bg-gray-100 px-3 py-2 mt-0.5 w-full focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition disabled:cursor-not-allowed ${props.className}`
        }
      />
      {errors[props.name] && <span className="text-xs text-red-500">{errors[props.name]?.message as string}</span>}
    </label>
  )
}