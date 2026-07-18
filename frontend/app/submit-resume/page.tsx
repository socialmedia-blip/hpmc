import { Metadata } from "next";
import { Suspense } from "react";
import ResumeForm from "../components/ResumeForm";

export const metadata: Metadata = {
  title: "Submit Resume | Apply for Jobs at HPMC",

  description:
    "Submit your resume to HPMC and apply for career opportunities in plastic extrusion machinery. Explore engineering, manufacturing, sales, service, and technical roles with one of India's trusted extrusion machine manufacturers.",

  alternates: {
    canonical: "https://hindustanplastics.com/submit-resume",
  },

  openGraph: {
    title: "Submit Resume | Apply for Jobs at HPMC",
    description:
      "Apply for exciting career opportunities at HPMC by submitting your resume online.",
    url: "https://hindustanplastics.com/submit-resume",
    siteName: "HPMC",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeForm />
    </Suspense>
  );
}
