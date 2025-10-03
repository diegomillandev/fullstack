import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-y-4">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-bold"
        >
          <div className="bg-primary  text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <BadgeDollarSign className="w-[18px] h-[18px]" />
          </div>
          FinTrack.
        </Link>
        {children}
      </div>
    </div>
  );
}
