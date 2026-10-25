import type { PropsWithChildren } from "react";

export default function MainLayout(props: PropsWithChildren) {
  return <main className="p-10">{props.children}</main>;
}