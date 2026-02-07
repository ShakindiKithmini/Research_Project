import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { use } from "react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionListContainar from "./QuestionListContainar";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services/superbaseClient";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);

    // Validate formData before making the API request
    if (!formData || Object.keys(formData).length === 0) {
      console.error("formData is missing or incomplete:", formData);
      toast("Please provide all required fields before generating questions.");
      setLoading(false);
      return;
    }

    try {
      console.log(
        "Sending API request with formData:",
        JSON.stringify(formData, null, 2),
      );
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      console.log("API Response:", JSON.stringify(result.data, null, 2));

      if (!result.data || Object.keys(result.data).length === 0) {
        console.error("API response is empty or invalid:", result.data);
        toast("The server returned an empty response. Please try again later.");
        setLoading(false);
        return;
      }

      const Content = result.data?.content;
      if (!Content) {
        console.error("API response does not contain 'content':", result.data);
        toast("Invalid response from the server. Please contact support.");
        setLoading(false);
        return;
      }

      try {
        // Log the raw content for debugging
        console.log("Raw Content:", Content);

        // Enhanced cleaning logic to handle unexpected text or formatting
        let cleanedContent = Content.replace(/```json|```/g, "").trim();
        cleanedContent = cleanedContent
          .replace(/^[^\{]*/, "")
          .replace(/[^\}]*$/, "");
        console.log("Enhanced Cleaned Content:", cleanedContent);

        if (!cleanedContent.startsWith("{") || !cleanedContent.endsWith("}")) {
          console.error("Cleaned content is not valid JSON:", cleanedContent);
          throw new Error("Response content is not valid JSON");
        }

        const parsedQuestions = JSON.parse(cleanedContent)?.interview_questions;
        console.log("Parsed Questions:", parsedQuestions);

        if (!parsedQuestions || parsedQuestions.length === 0) {
          console.error(
            "Parsed questions are empty or invalid:",
            parsedQuestions,
          );
          toast("No questions were generated. Please try again.");
          setLoading(false);
          return;
        }

        setQuestionList(parsedQuestions);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        toast(
          "Invalid response format from the server. Please contact support.",
        );
      }

      setLoading(false);
    } catch (e) {
      console.error("Error generating question list:", e);
      toast("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          QuestionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    setSaveLoading(false);

    console.log(data, error);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI model crafting personalized questions based on the job
              position.
            </p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
        <div>
          <QuestionListContainar questionList={questionList} />
        </div>
      )}

      <div className="flex justify-end mt-10 ">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2Icon className="animate-spin" />}Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
