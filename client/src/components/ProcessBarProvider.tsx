"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ProcessBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </div>
  );
}
