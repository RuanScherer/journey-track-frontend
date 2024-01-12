"use server";

import NotFoundIllustration from "@/assets/images/not_found.svg";
import WinnersIllustration from "@/assets/images/winners.svg";
import { Link } from "@/components/Link";
import { backendServerSideClient } from "@/config/api/backend";
import { AxiosError } from "axios";
import { headers } from "next/headers";
import Image from "next/image";

async function verifyAccount() {
  try {
    const reqUrl = new URL(headers().get("x-url")!)
    const userId = reqUrl.searchParams.get("userId")
    const token = reqUrl.searchParams.get("token")

    if (!userId || !token) return false

    await backendServerSideClient.patch(`/v1/users/${userId}/verify/${token}`)
    return true
  } catch (e) {
    if (e instanceof AxiosError) {
      const errorCode = e.response?.data.code
      if (errorCode === "user_already_verified") {
        return true
      }
    }
    console.error(e)
    return false
  }
}

export default async function VerifyAccount() {
  const success = await verifyAccount()

  if (success) {
    return (
      <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h1 className="text-3xl font-medium">All done!</h1>

        <Image
          src={WinnersIllustration}
          alt="A man and a woman celebrating"
          className="w-full max-w-[300px]"
        />

        <p className="text-gray-500">
          Your account has been verified.
          <br />
          You can now{' '}
          <Link href="/sign-in">sign in</Link>
          {' '}and start using your account.
        </p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h1 className="text-3xl font-medium">Oops!</h1>

      <Image
        src={NotFoundIllustration}
        alt="Ovni abducting a person while other person is watching"
        className="w-full max-w-[300px]"
      />

      <p className="text-gray-500">
        We couldn't verify your account.
        <br />
        Please try again later.
      </p>
    </main>
  )
}
