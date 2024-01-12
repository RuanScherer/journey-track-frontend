import Logo from "@/assets/images/logo.svg";
import Image from "next/image";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <Image
        src={Logo}
        alt="Logo"
        width={180}
        className="mb-6"
      />

      <main className="flex flex-col items-stretch bg-white p-6 rounded-lg shadow-lg">
        {children}
      </main>
    </div>
  )
}
