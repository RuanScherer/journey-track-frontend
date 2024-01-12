import { RequestPasswordResetForm } from "./_components/RequestPasswordResetForm";

export default function RequestPasswordReset() {
  return (
    <>
      <h1 className="text-xl font-medium text-center mb-2">
        Recovery your password
      </h1>

      <p className="text-center text-gray-800 mb-4">Enter your account email to receive a password reset link.</p>

      <RequestPasswordResetForm />
    </>
  )
}