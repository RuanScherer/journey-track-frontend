import Logo from "@/assets/images/short_logo_light.svg";
import Image from "next/image";
import Link from "next/link";
import { UserControl } from "./UserControl";

export function AppMenu() {
  return (
    <div className="flex items-center w-full px-5 py-3.5 bg-secondary-900 text-neutral-100 shadow">
      <Link href="/home" className="mr-5 hover:brightness-90">
        <Image
          src={Logo}
          alt="Logo"
          width={35}
        />
      </Link>

      <nav className="text-sm font-medium flex-1">
        <ul className="flex items-center space-x-3">
          <li>
            <Link href="/home" className="px-2.5 py-1.5 hover:bg-neutral-50 hover:bg-opacity-15 hover:text-neutral-50 rounded">
              Projects
            </Link>
          </li>
        </ul>
      </nav>

      <UserControl />
    </div>
  )
}