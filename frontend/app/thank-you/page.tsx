import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, Mail, Clock, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Thank You | HPMC - Enquiry Received",
  description:
    "Your enquiry has been successfully submitted. Our team will be in touch shortly.",
};

export default function ThankYouPage() {
  return (
    <>
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-18372765916/sQTpCM29pOMcENzR6LhE',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
            {/* Header with Green Accent */}
            <div className="bg-gradient-to-r from-[#65BC4F] to-[#4fa23a] px-6 sm:px-8 py-12 text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  <CheckCircle2 className="h-16 w-16 relative" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Thank You!
              </h1>
              <p className="text-white/90 text-lg">
                Your enquiry has been successfully submitted
              </p>
            </div>

            {/* Main Content */}
            <div className="px-6 sm:px-8 py-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  What happens next?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                  We've received your enquiry and our team has been notified.
                  We'll review your requirements carefully and get back to you
                  with a personalized solution.
                </p>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-4 mb-10">
                <TimelineStep
                  icon={<Mail className="h-5 w-5" />}
                  title="Confirmation Email"
                  description="Check your inbox for a confirmation email within the next few minutes"
                  step={1}
                />
                <TimelineStep
                  icon={<Clock className="h-5 w-5" />}
                  title="Review & Analysis"
                  description="Our specialists will analyze your requirements (typically within 24-48 hours)"
                  step={2}
                />
                <TimelineStep
                  icon={<PhoneCall className="h-5 w-5" />}
                  title="Personal Consultation"
                  description="We'll reach out with tailored solutions and answer any questions you may have"
                  step={3}
                />
              </div>

              {/* CTA Buttons */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#65BC4F] hover:bg-[#4fa23a] text-white font-semibold transition duration-300 shadow-md hover:shadow-lg"
                >
                  Back to Home
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-[#65BC4F] text-[#65BC4F] hover:bg-[#65BC4F]/5 font-semibold transition duration-300"
                >
                  Learn About HPMC
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
                <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
                  Need immediate assistance?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a
                    href="tel:+91-95605 96392"
                    className="text-[#65BC4F] hover:text-[#4fa23a] font-semibold transition flex items-center gap-2"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call us
                  </a>
                  <a
                    href="mailto:info@hindustanplastics.com"
                    className="text-[#65BC4F] hover:text-[#4fa23a] font-semibold transition flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
            Thank you for choosing HPMC for your extrusion needs
          </p>
        </div>
      </div>
    </>
  );
}

function TimelineStep({
  icon,
  title,
  description,
  step,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 flex items-start pt-1">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#65BC4F]/10 border-2 border-[#65BC4F] text-[#65BC4F] font-bold">
          {step}
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-start gap-2">
          <span className="text-[#65BC4F] mt-0.5">{icon}</span>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
