import { useFormContext } from "react-hook-form"

interface InputProps {
  name: string
  label: string
  type: string
  placeholder: string
}

export function Input(props: InputProps) {
  const { register, formState: { errors } } = useFormContext()

  return (
    <label htmlFor={props.name} className="text-sm text-gray-700">
      {props.label}
      <input
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className="rounded bg-gray-100 px-3 py-2 mt-0.5 w-full focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
        {...register(props.name)}
      />
      {errors[props.name] && <span className="text-xs text-red-500">{errors[props.name]?.message as string}</span>}
    </label>
  )
}