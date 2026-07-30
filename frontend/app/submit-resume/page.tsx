import { Metadata } from "next";
import { Suspense } from "react";
import ResumeForm from "../components/ResumeForm";

export const metadata: Metadata = {
  title: "Submit Resume | Careers at HPMC",

  description:
    "Submit your resume to HPMC and explore rewarding career opportunities in engineering, manufacturing, and corporate roles.",

  alternates: {
    canonical: "https://hindustanplastics.com/submit-resume",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeForm />
    </Suspense>
  );
}
