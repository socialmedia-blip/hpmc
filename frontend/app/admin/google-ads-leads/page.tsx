"use client";

import { ExternalLink, Mail, Phone, Search, Trash2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type GoogleAdsLead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  message: string;
  product: string;
  landingPage: string;
  source?: string;
  createdAt: string;
};

export default function GoogleAdsLeadsPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const [leads, setLeads] = useState<GoogleAdsLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const loadLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/landing-leads`, {
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Unable to load leads.");
      setLeads(result.data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load Google Ads leads.");
    } finally {
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    void loadLeads();
  }, [apiBase]);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const filteredLeads = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((lead) =>
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.companyName,
        lead.product,
        lead.landingPage,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term)),
    );
  }, [leads, query]);

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this Google Ads lead?")) return;
    try {
      const response = await fetch(`${apiBase}/landing-leads/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Unable to delete lead.");
      setLeads((current) => current.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error(error);
      alert("Unable to delete this lead.");
    }
  };

  return (
    <div className="pb-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
            Lead generation
          </p>
          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Google Ads Leads
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Verified enquiries submitted through the landing pages.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">
          <Users size={18} className="text-[var(--primary)]" /> {leads.length}{" "}
          total leads
        </div>
      </div>

      <div className="mb-6 relative max-w-xl">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email, company, product..."
          className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] px-6 py-16 text-center text-[var(--text-secondary)]">
          No Google Ads leads found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="bg-[var(--background-secondary)] text-left text-sm">
                <tr>
                  {[
                    "Lead",
                    "Contact",
                    "Product",
                    "Message",
                    "Submitted",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="px-5 py-4 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-[var(--border)] align-top hover:bg-[var(--background-secondary)]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[var(--text-primary)]">
                        {lead.name}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {lead.companyName || "No company provided"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <a
                        className="flex items-center gap-2 hover:text-[var(--primary)]"
                        href={`mailto:${lead.email}`}
                      >
                        <Mail size={15} />
                        {lead.email}
                      </a>
                      <a
                        className="mt-2 flex items-center gap-2 hover:text-[var(--primary)]"
                        href={`tel:${lead.phone}`}
                      >
                        <Phone size={15} />
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <p className="font-medium text-[var(--text-primary)]">
                        {lead.product}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <ExternalLink size={13} />
                        {lead.landingPage}
                      </p>
                    </td>
                    <td className="max-w-sm whitespace-pre-wrap px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
                      {lead.message}
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => void deleteLead(lead._id)}
                        title="Delete lead"
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
