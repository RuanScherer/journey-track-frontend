import NotFoundIllustration from "@/assets/images/not_found.svg";
import { Link } from "@/components/Link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h1 className="text-3xl font-medium">Oops!</h1>

      <Image
        src={NotFoundIllustration}
        alt="Ovni abducting a person while other person is watching"
        className="w-full max-w-[300px]"
      />

      <p className="text-gray-500">
        It looks like the page you're looking for does not exist.
        <br />
        What about starting again from{' '}
        <Link href="/home">
          home page
        </Link>
        ?
      </p>
    </main>
  )
}