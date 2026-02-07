import {
  Calendar,
  LayoutDashboard,
  Settings,
  List,
  Code2Icon,
  User2Icon,
  BriefcaseBusinessIcon,
  Puzzle,
  UserCircle2Icon,
} from "lucide-react";

export const SideBarOptions = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    name: "Scheduled Interviews",
    icon: Calendar,
    path: "/scheduled-interviews",
  },
  { name: "All Interview", icon: List, path: "/all-interview" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export const Interviewtypes = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: UserCircle2Icon,
  },
];

export const QUESTION_PROMPT =
  'You are an expert interview question generator. Generate a list of interview questions based on the following job description, position, interview type, and duration. Ensure the questions are relevant to the job role and cover various aspects such as technical skills, behavioral traits, and problem-solving abilities. Format the output as a JSON array of questions.\n\nJob Position: {jobPosition}\nJob Description: {jobDescription}\nInterview Type: {type}\nDuration: {duration} Your Task: Analyze the job description to identify key responsibilities, required skills, and expected experience. Generate list of questions depends on the interview duration. Adjust the number and depth of the questions to match the inteview duration. Ensure the question match the tone and structure of a real-life {{type}} interview. Format your response in JSON format with array list of questions. format: interview_questions: [ {question: ", type: "Technical/Behavioral/Experience/Problem Solving/Leadership"},{...} ] The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobPosition}} role.';
