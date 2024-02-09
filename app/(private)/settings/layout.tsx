"use client"

import { useSession } from "@/contexts/Session";
import { Shield, User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linksClasses = "flex items-center gap-1 px-1.5 py-1 text-gray-800 hover:bg-gray-200 transition rounded data-[active=true]:bg-primary-100 data-[active=true]:text-primary-600"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const session = useSession()

  return (
    <div className="grid grid-cols-12 gap-5 my-5 mx-auto p-2 max-w-5xl">
      <header className="col-span-12 flex items-center gap-2.5">
        <User className="w-10 h-10 text-gray-600 bg-gray-200 rounded-full p-1.5" />

        {session?.user?.name ? (
          <h2 className="text-xl">{session?.user?.name}</h2>
        ) : (
          <div className="w-32 h-7 bg-gray-200 rounded animate-pulse" />
        )}
      </header>

      <aside className="col-span-12 md:col-span-3 md:border-r-2 md:border-r-neutral-200">
        <nav className="flex flex-col space-y-1 mr-2">
          <Link
            href="/settings/profile"
            className={linksClasses}
            data-active={pathname === "/settings/profile"}
          >
            <User weight="bold" />
            Profile
          </Link>

          <Link
            href="/settings/security"
            className={linksClasses}
            data-active={pathname === "/settings/security"}
          >
            <Shield weight="bold" />
            Security
          </Link>
        </nav>
      </aside>

      <main className="col-span-12 md:col-span-9 mb-5">
        {children}
      </main>
    </div>
  )
}