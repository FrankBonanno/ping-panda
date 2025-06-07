import DashboardPage from "@/components/DashboardPage";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardPageContent from "./DashboardPageContent";
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MainDashboardPage = async () => {
  const auth = await currentUser();

  if (!auth) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) redirect("/sign-in");

  return (
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
  );
};

export default MainDashboardPage;
