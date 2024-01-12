import EmailSentIllustration from "@/assets/images/email_sent.svg";
import Image from "next/image";

export default function PasswordResetRequested() {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h1 className="text-3xl font-medium">Password reset requested!</h1>

      <Image
        src={EmailSentIllustration}
        alt="Opened envelope with letter"
        className="w-full max-w-[300px]"
      />

      <p className="text-gray-500">
        We sent you an email with a password reset link.
        <br />
        Please check your inbox and click on the link to continue and reset your password.
      </p>
    </main>
  )
}