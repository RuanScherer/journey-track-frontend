"use client"

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const { back } = useRouter()

  return (
    <button
      onClick={back}
      className="flex items-center gap-1 p-1 w-fit rounded text-sm cursor-pointer hover:bg-gray-200 transition"
    >
      <ArrowLeft weight="bold" />
      Back
    </button>
  )
}
