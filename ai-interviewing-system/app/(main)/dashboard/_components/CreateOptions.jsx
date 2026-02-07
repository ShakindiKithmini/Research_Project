import React from "react";
import { Video, Phone } from "lucide-react";
import Link from "next/link";

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link href="/dashboard/create-interview">
        <div className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer">
          <Video className="p-3 text-primary bg-blue-50 rounded-lg w-12 h-12"></Video>
          <h2 className="font-bold">Create New Interview</h2>
          <p className="text-gray-500">
            Create AI interviews and schedule with candidates
          </p>
        </div>
      </Link>
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <Phone className="p-3 text-primary bg-blue-50 rounded-lg w-12 h-12"></Phone>
        <h2 className="font-bold">Create Phone Screening Call</h2>
        <p className="text-gray-500">
          Schedule phone screening calls with candidates
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
