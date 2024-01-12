import { Link } from "@/components/Link";
import { SignInForm } from "./_components/SignInForm";

export default function SignIn() {
  return (
    <>
      <h1 className="text-xl font-medium text-center mb-4">
        Sign in using your account
      </h1>

      <SignInForm />

      <div className="flex items-center gap-2">
        <hr className="border-gray-300 my-5 w-full" />
        <span className="text-gray-400 text-xs">or</span>
        <hr className="border-gray-300 my-5 w-full" />
      </div>

      <Link href="/sign-up" className="text-sm text-center mx-auto">
        Create an account
      </Link>
    </>
  )
}
