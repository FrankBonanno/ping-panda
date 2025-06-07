import DashboardPage from "@/components/DashboardPage";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AccountSettingsPageContent from "./AccountSettingsPageContent";

const AccountSettingsPage = async () => {
  const auth = await currentUser();

  if (!auth) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) redirect("/sign-in");

  return (
    <DashboardPage title="Account Settings">
      <AccountSettingsPageContent discordId={user.discordId ?? ""} />
    </DashboardPage>
  );
};

export default AccountSettingsPage;
