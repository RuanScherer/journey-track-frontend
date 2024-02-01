"use client"

import { RequestPasswordResetButton } from "./_components/RequestPasswordResetButton";

export default function SecuritySettings() {
  return (
    <div className="flex flex-col items-stretch">
      <h1 className="text-2xl font-medium">Security</h1>

      <section className="mt-5">
        <h2 className="text-xl">Password</h2>
        <p className="mt-1 text-sm text-gray-600">You can request a password reset link to be sent to your email address.</p>

        <RequestPasswordResetButton />
      </section>
    </div>
  )
}