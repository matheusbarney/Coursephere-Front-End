import { DashboardMain } from '../components/DashboardMain';
import React from "react";
export function DashboardTemplate({}) {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <DashboardMain     />
      </div>;
}
  