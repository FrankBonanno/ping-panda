"use client";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

interface DashboardPageProps {
  title: string;
  children?: ReactNode;
  hideBackButton?: boolean;
  cta?: ReactNode;
}

const DashboardPage = ({ title, children, cta, hideBackButton }: DashboardPageProps) => {
  const router = useRouter();

  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="w-full p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="w-full flex flex-col items-start sm:items-center gap-6 sm:flex-row">
          <div className="flex items-center gap-8">
            {hideBackButton ? null : (
              <Button
                className="w-fit bg-white"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}

            <Heading>{title}</Heading>
          </div>

          {cta ? <div className="w-full">{cta}</div> : null}
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">{children}</div>
    </section>
  );
};

export default DashboardPage;
