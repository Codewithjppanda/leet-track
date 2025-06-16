"use server";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailNotifications from "@components/Essentials/EmailNotification";
import PushNotification from "@components/Essentials/PushNotification";
import { Bell } from "lucide-react";
import { getSettings } from "./settings-action";

export default async function SettingsPage() {
  const receivedData = await getSettings();

  if (receivedData?.serverError || !receivedData?.data) {
    return <>An error occurred while fetching settings.</>;
  }

  return (
    <main className="flex flex-col items-start pt-2 mt-0">
      <div className="w-full px-4 sm:px-8 ">
        <div className="items-center justify-between mb-6 mt-0">
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <h5 className={`${roboto.className} text-xs text-slate-400`}>
            Manage your account settings and preferences.
          </h5>
        </div>
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="flex space-x-2 bg-muted p-1 rounded-lg w-fit">
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
            <EmailNotifications userData={receivedData.data} />
            <PushNotification userData={receivedData.data} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
