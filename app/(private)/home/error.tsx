"use client"

import EmptyIllustration from "@/assets/images/empty.svg"
import Image from "next/image"

export default function HomeError() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 mt-10 text-center">
      <h1 className="text-3xl font-medium">Oops!</h1>

      <Image
        src={EmptyIllustration}
        alt="Person in a forest"
        className="w-full max-w-[400px]"
      />

      <p className="text-gray-500">
        We couldn't load your projects.
        <br />
        Please try again by refreshing the page.
      </p>
    </main>
  )
}