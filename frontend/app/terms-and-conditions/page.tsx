import type { Metadata } from "next";
import LegalDocumentPage from "../components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | HPMC",

  description:
    "Read the Terms & Conditions of Hindustan Plastics & Machine Corporation (HPMC) governing the use of our website, products, services, and business interactions.",

  alternates: {
    canonical: "https://hindustanplastics.com/terms-and-conditions",
  },

  openGraph: {
    title: "Terms & Conditions | HPMC",
    description:
      "Read the Terms & Conditions of Hindustan Plastics & Machine Corporation (HPMC) governing the use of our website, products, services, and business interactions.",
    url: "https://hindustanplastics.com/terms-and-conditions",
    siteName: "HPMC",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Terms & Conditions | HPMC",
    description:
      "Read the Terms & Conditions of Hindustan Plastics & Machine Corporation (HPMC).",
  },
};

const sections = [
  {
    title: "Acceptance Of Terms",
    body: [
      "By accessing or using this website, you agree to these Terms & Conditions. If you do not agree with these terms, please discontinue use of the website.",
      "Hindustan Plastics & Machine Corporation may update these terms from time to time. Continued use of the website after updates means you accept the revised terms.",
    ],
  },
  {
    title: "Website Information",
    body: [
      "The content on this website is provided for general business, product, and informational purposes. Product images, specifications, features, output capacities, and descriptions may vary depending on design updates, customization, raw material, operating conditions, and project requirements.",
      "Information on the website should not be treated as a final technical commitment, quotation, or contractual offer unless confirmed in writing by HPMC.",
    ],
  },
  {
    title: "Enquiries And Quotations",
    body: [
      "When you submit an enquiry, request a quotation, register as a vendor or agent, or apply for a career opportunity, you agree to provide accurate and current information.",
      "All quotations, commercial terms, delivery schedules, warranties, and after-sales commitments are subject to separate written confirmation, purchase documents, and mutually agreed terms.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "All website content, including text, images, videos, logos, product names, layouts, graphics, and downloadable materials, is owned by or licensed to HPMC unless otherwise stated.",
      "You may not copy, reproduce, modify, distribute, publish, or commercially use website content without prior written permission from HPMC.",
    ],
  },
  {
    title: "Permitted Use",
    body: [
      "You agree to use this website only for lawful purposes and in a way that does not damage, disable, overload, or interfere with the website, its security, or other users.",
      "You must not attempt unauthorized access to website systems, submit malicious code, scrape content at scale, or misuse forms and communication channels.",
    ],
  },
  {
    title: "Third-Party Links",
    body: [
      "The website may include links to third-party websites, platforms, or services. These links are provided for convenience and do not imply endorsement or control by HPMC.",
      "HPMC is not responsible for the content, policies, availability, or practices of third-party websites.",
    ],
  },
  {
    title: "Limitation Of Liability",
    body: [
      "HPMC makes reasonable efforts to keep website information accurate and available, but we do not guarantee that the website will be error-free, uninterrupted, or always current.",
      "To the maximum extent permitted by applicable law, HPMC will not be liable for losses arising from website use, reliance on website information, technical interruptions, or third-party services.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These Terms & Conditions are governed by the laws of India. Any disputes relating to the website or these terms will be subject to the jurisdiction of competent courts in Delhi, India, unless otherwise agreed in writing.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "For questions about these Terms & Conditions, contact Hindustan Plastics & Machine Corporation at info@hindustanplastics.com or at 5, Category II, DSIDC Industrial Area Nangloi, Delhi-110041.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <LegalDocumentPage
      eyebrow="HPMC Legal"
      title="Terms & Conditions"
      intro="These Terms & Conditions explain the rules for using the HPMC website, submitting enquiries, and relying on information published through our digital channels."
      lastUpdated="July 2, 2026"
      sections={sections}
    />
  );
}
