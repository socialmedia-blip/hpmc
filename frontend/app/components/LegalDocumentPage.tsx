import Footer from "./Footer";
import FloatingContact from "./FloatingButton";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalDocumentPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalDocumentPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: LegalDocumentPageProps) {
  return (
    <div className="bg-[var(--background)]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#0B1220] pt-36 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(101,188,79,0.24),transparent_36%),linear-gradient(135deg,rgba(11,18,32,0.98),rgba(3,17,31,0.96))]" />
          <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
            <p className="text-[#65BC4F] text-xs md:text-sm font-semibold uppercase tracking-[4px]">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-[34px] sm:text-[44px] md:text-[56px] lg:text-[68px] leading-[1.04] font-bold text-white">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg leading-8 text-white/72">
              {intro}
            </p>
            <p className="mt-7 inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-semibold text-white/80">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-5 lg:px-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_20px_60px_rgba(11,18,32,0.06)] sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                        {section.title}
                      </h2>
                      <div className="mt-4 space-y-4">
                        {section.body.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="leading-8 text-[var(--text-secondary)]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
      <FloatingContact />
      <Footer />
    </div>
  );
}
