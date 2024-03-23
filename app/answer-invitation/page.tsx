"use server";

import NotFoundIllustration from "@/assets/images/not_found.svg";
import WinnersIllustration from "@/assets/images/winners.svg";
import { backendServerSideClient } from "@/config/api/backend";
import { EInvitationStatus } from "@/shared/dto/invites/EInvitationStatus";
import { ShowInvitationByProjectAndTokenResponseDTO } from "@/shared/dto/invites/ShowInvitationByProjectAndTokenResponseDTO";
import { headers } from "next/headers";
import Image from "next/image";
import { AcceptInvitationButton } from "./_components/AcceptInvitationButton";

async function getInvitation() {
  try {
    const reqUrl = new URL(headers().get("x-url")!)
    const projectId = reqUrl.searchParams.get("projectId")
    const token = reqUrl.searchParams.get("token")

    if (!projectId || !token) return null

    const response = await backendServerSideClient.get<ShowInvitationByProjectAndTokenResponseDTO>(
      `/v1/projects/${projectId}/invites/${token}`
    )
    return response.data
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function Answer() {
  const invitation = await getInvitation()

  if (!invitation) {
    return (
      <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h1 className="text-3xl font-medium">Oops!</h1>

        <Image
          src={NotFoundIllustration}
          alt="Ovni abducting a person while other person is watching"
          className="w-full max-w-[300px]"
        />

        <p className="text-gray-500">
          We couldn't find your invitation.
          <br />
          Please try again later.
        </p>
      </main>
    )
  }

  if (invitation.status !== EInvitationStatus.PENDING) {
    return (
      <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h1 className="text-3xl font-medium">Heeey!</h1>

        <Image
          src={NotFoundIllustration}
          alt="Ovni abducting a person while other person is watching"
          className="w-full max-w-[300px]"
        />

        <p className="text-gray-500">
          It seems that you have already answered this invitation.
        </p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h1 className="text-3xl font-medium">You're almost there!</h1>

      <Image
        src={WinnersIllustration}
        alt="A man and a woman celebrating"
        className="w-full max-w-[300px]"
      />

      <p className="text-gray-500">
        People are waiting for you, {invitation.user.name}!
        <br />
        Click the button below to accept the invitation and join {invitation.project.name}.
      </p>

      <AcceptInvitationButton />
    </main>
  )
}
