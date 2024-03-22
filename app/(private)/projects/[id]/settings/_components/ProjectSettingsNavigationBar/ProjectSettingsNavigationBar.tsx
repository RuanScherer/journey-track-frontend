"use client"

import { CirclesFour, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linksClasses = "flex items-center gap-1 px-1.5 py-1 text-gray-800 hover:bg-gray-200 transition rounded data-[active=true]:bg-primary-100 data-[active=true]:text-primary-600"

export function ProjectSettingsNavigationBar({ projectId }: { projectId: string }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1 mr-2">
      <Link
        href={`/projects/${projectId}/settings/general`}
        replace
        className={linksClasses}
        data-active={pathname === `/projects/${projectId}/settings/general`}
      >
        <CirclesFour weight="bold" />
        General
      </Link>

      <Link
        href={`/projects/${projectId}/settings/members`}
        replace
        className={linksClasses}
        data-active={pathname === `/projects/${projectId}/settings/members`}
      >
        <Users weight="bold" />
        Members
      </Link>
    </nav>
  )
}
