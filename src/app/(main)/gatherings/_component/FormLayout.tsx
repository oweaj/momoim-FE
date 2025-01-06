import BackButton from "@/app/_component/BackButton";
import { ReactNode } from "react";

export default function FormLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="mx-auto flex w-[708px] flex-col gap-12 rounded-lg pb-10 transition-all max-md:w-full">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <BackButton />
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
