import EmailSentIllustration from "@/assets/images/email_sent.svg";
import Image from "next/image";

export default function VerifyAccountAdvice() {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h1 className="text-3xl font-medium">Almost there!</h1>

      <Image
        src={EmailSentIllustration}
        alt="Opened envelope with letter"
        className="w-full max-w-[300px]"
      />

      <p className="text-gray-500">
        Before you can start using your account, you need to verify your email address.
        <br />
        Please check your inbox and click on the link we sent you to verify your account.
      </p>
    </main>
  )
}