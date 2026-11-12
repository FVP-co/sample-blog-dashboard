import { Toaster } from "@/components/ui/toast";
import type { PropsWithChildren } from "react";

export default function MainLayout(props: PropsWithChildren) {
  return (
    <main>
      {props.children}
      <Toaster />
    </main>
  );
}
