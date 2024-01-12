import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function Link(props: LinkProps) {
  return (
    <NextLink
      {...props}
      className={`${props.className} text-primary-400 underline underline-offset-2 hover:text-primary-500`}
    />
  )
}