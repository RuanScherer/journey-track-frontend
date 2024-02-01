"use client"

import { useSession } from "@/contexts/Session"
import "@/styles/animations.css"
import { Gear, SignOut } from "@phosphor-icons/react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { useRef } from "react"

export function UserControl() {
  const iconRef = useRef<SVGSVGElement>(null)
  const session = useSession()

  if (!session?.user?.name) {
    // skeleton
    return (
      <div className="w-32 h-5 bg-neutral-50 bg-opacity-35 rounded-full animate-pulse" />
    )
  }

  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center gap-1.5 text-sm font-medium cursor-default px-2.5 py-1.5">
        {session?.user?.name}
      </span>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-1.5 text-sm font-medium cursor-pointer px-2.5 py-1.5 hover:bg-neutral-50 hover:bg-opacity-15 hover:text-neutral-50 rounded transition">
            <Gear
              className="w-5 h-5 data-[open=true]:rotate-180"
              data-open="false"
              ref={iconRef}
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white shadow rounded px-2 py-3 min-w-40 mx-5 animate-slide-down-fade">
            <DropdownMenu.Arrow fill="white" />

            <DropdownMenu.DropdownMenuGroup className="flex flex-col items-stretch">
              <DropdownMenu.Label className="px-3 text-xs font-medium text-neutral-500 mb-1">
                Account
              </DropdownMenu.Label>
              <DropdownMenu.Item asChild>
                <Link
                  href="/settings"
                  className="flex items-center px-3 py-1.5 text-sm rounded hover:bg-neutral-100"
                >
                  <Gear className="mr-1" weight="bold" />
                  Settings
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.DropdownMenuGroup>

            <DropdownMenu.Separator className="h-[1px] my-2 bg-neutral-200" />

            <DropdownMenu.Item asChild>
              <button
                className="flex items-center w-full px-3 py-1.5 text-left text-sm rounded hover:bg-neutral-100"
                onClick={() => session?.signOut()}
              >
                <SignOut className="mr-1" weight="bold" />
                Logout
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}