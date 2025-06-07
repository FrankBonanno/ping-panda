import DashboardPage from "@/components/DashboardPage";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardPageContent from "./DashboardPageContent";
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createCheckoutSession } from "@/lib/stripe";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const MainDashboardPage = async ({ searchParams }: PageProps) => {
  const auth = await currentUser();

  if (!auth) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) return redirect("/welcome");

  const intent = searchParams.intent;

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    if (session.url) redirect(session.url);
  }

  const success = searchParams.success;

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}

      <DashboardPage
        title="Dashboard"
        hideBackButton
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <Plus className="size-4 mr-2" /> Add Category
            </Button>
          </CreateEventCategoryModal>
        }
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  );
};

export default MainDashboardPage;
