import { Link } from "@/components/Link";
import { SignUpForm } from "./_components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <h1 className="text-xl font-medium text-center mb-4">
        Create an account
      </h1>

      <SignUpForm />

      <div className="flex items-center gap-2">
        <hr className="border-gray-300 my-5 w-full" />
        <span className="text-gray-400 text-xs">or</span>
        <hr className="border-gray-300 my-5 w-full" />
      </div>

      <Link href="/sign-in" className="text-sm text-center mx-auto">
        Sign in using your account
      </Link>
    </>
  )
}
