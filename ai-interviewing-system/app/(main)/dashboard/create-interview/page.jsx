"use client";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormContainar from "./_components/FormContainar";
import React from "react";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log("FormData", formData);
  };
  const onGoToNext = () => {
    console.log("Current Step:", step);
    console.log("FormData before validation:", formData);
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      toast("Please fill all the fields");
      return;
    }
    setStep(step + 1);
    console.log("Step after increment:", step + 1);
  };
  return (
    <div className="px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-4" />
      {step == 1 ? (
        <FormContainar
          onHandleInputChange={onHandleInputChange}
          GoToNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionList formData={formData} />
      ) : null}
    </div>
  );
}

export default CreateInterview;
