"use client"

import { useSession } from "@/contexts/Session";
import { Gear } from "@phosphor-icons/react";
import Link from "next/link";

interface ProjectSettingsLinkProps {
  project: {
    id: string
    owner_id: string
  }
}

export function ProjectSettingsLink({ project }: ProjectSettingsLinkProps) {
  const session = useSession()

  if (!session?.user?.id || session?.user?.id !== project.owner_id) return null

  return (
    <Link
      href={`/projects/${project.id}/settings`}
      className="flex items-center gap-1 p-1.5 text-gray-700 text-sm font-medium cursor-pointer rounded bg-gray-200 hover:bg-gray-300 transition"
    >
      <Gear size={16} weight="bold" />
      Settings
    </Link>
  )
}