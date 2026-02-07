"use client";
import React from "react";
import WelcomeContainar from "./_components/WelcomeContainar";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";

function Dashboard() {
  return (
    <div>
      {/*<WelcomeContainar />*/}
      <h2 className="font-bold text-2xl my-3">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
