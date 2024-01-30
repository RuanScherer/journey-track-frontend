import { AppMenu } from "@/components/AppMenu"

export default function PrivateAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppMenu />
      {children}
    </>
  )
}