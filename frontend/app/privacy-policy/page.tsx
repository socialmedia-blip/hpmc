import type { Metadata } from "next";
import LegalDocumentPage from "../components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Policy | HPMC",

  description:
    "Read the HPMC Privacy Policy to understand how Hindustan Plastics & Machine Corporation collects, uses, stores, and protects the personal information of website visitors, customers, vendors, agents, and job applicants.",

  alternates: {
    canonical: "https://hindustanplastics.com/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | HPMC",
    description:
      "Learn how Hindustan Plastics & Machine Corporation collects, uses, stores, and safeguards your personal information.",
    url: "https://hindustanplastics.com/privacy-policy",
    siteName: "HPMC",
    type: "website",
  },
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect information you submit through enquiry forms, newsletter subscriptions, vendor registration, agent registration, job applications, site visit requests, and other contact forms. This may include your name, company name, phone number, email address, location, product interest, uploaded documents, and message details.",
      "We may also collect limited technical information such as browser type, device information, pages visited, referring links, and approximate location through analytics tools and server logs.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use the information to respond to enquiries, provide quotations, process service or spare-part requests, manage business relationships, evaluate vendor or career submissions, improve our website, and communicate relevant company or product updates.",
      "We may use analytics information to understand website performance, improve user experience, and measure interest in our products and services.",
    ],
  },
  {
    title: "Sharing Of Information",
    body: [
      "We do not sell personal information. We may share information with trusted team members, service providers, logistics partners, professional advisers, or technology vendors where necessary to operate our business and respond to your request.",
      "We may disclose information when required by law, regulation, legal process, or to protect the rights, safety, and property of HPMC, our users, or others.",
    ],
  },
  {
    title: "Cookies And Analytics",
    body: [
      "Our website may use cookies, similar technologies, and third-party analytics services to understand traffic, improve performance, and personalize basic website functionality.",
      "You can control or disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and organizational measures to protect information against unauthorized access, misuse, loss, or alteration.",
      "No internet transmission or storage method is completely secure, so we cannot guarantee absolute security of information submitted online.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We retain information for as long as needed to respond to your enquiry, maintain business records, meet legal obligations, resolve disputes, and support legitimate business purposes.",
      "When information is no longer required, we may delete, archive, or anonymize it in accordance with our internal practices.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may request correction, update, or deletion of personal information shared with us, subject to applicable legal and business record requirements.",
      "You may unsubscribe from marketing or newsletter communications by using the unsubscribe option where available or by contacting us directly.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "For privacy-related questions, requests, or concerns, contact Hindustan Plastics & Machine Corporation at info@hindustanplastics.com or at 5, Category II, DSIDC Industrial Area Nangloi, Delhi-110041.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalDocumentPage
      eyebrow="HPMC Legal"
      title="Privacy Policy"
      intro="This Privacy Policy explains how Hindustan Plastics & Machine Corporation collects, uses, protects, and handles information shared through this website and our digital enquiry channels."
      lastUpdated="July 2, 2026"
      sections={sections}
    />
  );
}
