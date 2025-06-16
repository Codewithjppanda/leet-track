"use server";
import React, { useState } from "react";
import DashboardCalendarToggle from "@components/Essentials/DashboardCalendarToggle";
import { AddReminderModal } from "@components/Essentials/ReminderDialog";
import Reminders from "@components/Essentials/Reminders";
import ReminderTable from "@components/Essentials/ReminderTable";
import SearchFilter from "@components/Essentials/SearchFilter";
import WelcomeBanner from "@components/Essentials/WelcomeBanner";
import { getReminders } from "./dashboard-action";

export default async function Dashboard() {
const receivedData = await getReminders();
  const reminders = receivedData?.data || [];
   const [filteredReminders, setFilteredReminders] = useState(reminders);
if (receivedData?.serverError) {
return <>An error occurred while fetching reminders.</>;
}

return (
<main className="flex flex-col pt-2 mt-0">
<div className="flex items-center justify-between mb-8">
<WelcomeBanner />
<div className="flex flex-row gap-2 items-center">
{/* Modal for Adding a Reminder */}
<AddReminderModal />
{/* Calendar Toggle Button and Calendar */}
<DashboardCalendarToggle />
</div>
</div>

{/* Stats Cards + Calendar Toggle */}
<div className="flex flex-row items-start gap-4 mb-4">
{/* Stats Cards (Reminders) */}
<div className="flex flex-1 gap-4">
<Reminders reminders={receivedData?.data || []} />
</div>
</div>

{/* Search & Filter */}
<div className="mb-3.5">
<SearchFilter 
 reminders={reminders}
          onFilterChange={setFilteredReminders}
/>
</div>

{/* Reminders Table */}
<div className="mb-5">
<ReminderTable reminders={filteredReminders} />
</div>
</main>
);
}