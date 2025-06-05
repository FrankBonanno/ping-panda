import DashboardPage from "@/components/DashboardPage";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MainDashboardPage = async () => {
  const auth = await currentUser();

  if (!auth) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) redirect("/sign-in");

  return <DashboardPage title="Dashboard">dashboard page content</DashboardPage>;
};

export default MainDashboardPage;
