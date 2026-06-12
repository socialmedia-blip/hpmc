"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Search,
  RefreshCw,
  Users,
  Trophy,
  PhoneCall,
  Clock3,
  TrendingDown,
  Filter,
  Building2,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface Lead {
  _id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  products?: string[];
  message?: string;
  leadStatus?: string;
  verified?: boolean;
  marked?: boolean;
  createdAt: string;
}

export default function MyLeadsPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  const employee =
    typeof window !== "undefined"
      ? JSON.parse(Cookies.get("employee") || "{}")
      : {};

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("employeeToken");

      const res = await fetch(`${API_BASE}/employee/my-leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setLeads(data.leads || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchesStatus =
        statusFilter === "all"
          ? true
          : (lead.leadStatus || "new") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const stats = useMemo(() => {
    const total = leads.length;

    return {
      total,
      won: leads.filter((l) => l.leadStatus === "won").length,
      contacted: leads.filter((l) => l.leadStatus === "contacted").length,
      followup: leads.filter((l) => l.leadStatus === "follow-up").length,
      lost: leads.filter((l) => l.leadStatus === "lost").length,
    };
  }, [leads]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "won":
        return "bg-green-500/10 text-green-500";

      case "lost":
        return "bg-red-500/10 text-red-500";

      case "contacted":
        return "bg-blue-500/10 text-blue-500";

      case "follow-up":
        return "bg-yellow-500/10 text-yellow-500";

      case "qualified":
        return "bg-purple-500/10 text-purple-500";

      default:
        return "bg-[var(--primary)]/10 text-[var(--primary)]";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
      </div>
    );
  }

  return (
    <section className="pb-24 md:pb-10">
      {/* HERO */}
      <div
        className="
        mb-8
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-gradient-to-r
        from-[var(--primary)]/10
        via-[var(--card)]
        to-[var(--primary)]/5
        p-8
      "
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
              Lead Management
            </p>

            <h1 className="text-4xl font-bold">My Leads 👨‍💼</h1>

            <p className="mt-2 text-[var(--text-secondary)]">
              Manage assigned leads, follow-ups and conversions.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-[var(--primary)]
              px-5
              py-3
              text-white
              hover:scale-105
              transition
            "
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Contacted"
          value={stats.contacted}
          icon={<PhoneCall size={20} />}
        />

        <StatCard
          title="Follow Up"
          value={stats.followup}
          icon={<Clock3 size={20} />}
        />

        <StatCard title="Won" value={stats.won} icon={<Trophy size={20} />} />

        <StatCard
          title="Lost"
          value={stats.lost}
          icon={<TrendingDown size={20} />}
        />
      </div>

      {/* FILTERS */}
      <div
        className="
        mt-8
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-5
      "
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              rounded-2xl
              border
              border-[var(--border)]
              bg-transparent
              py-3
              pl-11
              pr-4
              outline-none
            "
            />
          </div>

          <div className="relative">
            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
              w-full
              rounded-2xl
              border
              border-[var(--border)]
              bg-transparent
              py-3
              pl-11
              pr-4
              outline-none
            "
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow Up</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>
      </div>

      {/* LEADS */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredLeads.map((lead) => (
          <Link key={lead._id} href={`/employee/my-leads/${lead._id}`}>
            <div
              className="
      group
      cursor-pointer
      rounded-3xl
      border
      border-[var(--border)]
      bg-[var(--card)]
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      hover:border-[var(--primary)]/30
    "
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{lead.name}</h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Building2 size={15} />
                    {lead.companyName}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      lead.leadStatus || "new",
                    )}`}
                  >
                    {lead.leadStatus || "new"}
                  </span>

                  {lead.verified && (
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] text-green-500">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={15} />
                  {lead.phone}
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail size={15} />
                  {lead.email}
                </div>
              </div>

              {lead.products && lead.products.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {lead.products.map((product, index) => (
                    <span
                      key={index}
                      className="
                    rounded-full
                    bg-[var(--primary)]/10
                    px-3
                    py-1
                    text-xs
                    text-[var(--primary)]
                  "
                    >
                      {product}
                    </span>
                  ))}
                </div>
              )}

              {lead.message && (
                <div className="mt-5 rounded-2xl bg-[var(--background-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                  {lead.message.length > 120
                    ? `${lead.message.slice(0, 120)}...`
                    : lead.message}
                </div>
              )}

              {/* QUICK ACTIONS */}
              <div className="mt-5 flex gap-2">
                <a
                  href={`tel:${lead.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="
      flex-1
      rounded-xl
      border
      border-green-500/20
      bg-green-500/10
      px-3
      py-2
      text-center
      text-sm
      font-medium
      text-green-500
      transition
      hover:bg-green-500/20
    "
                >
                  📞 Call
                </a>

                <a
                  href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="
      flex-1
      rounded-xl
      border
      border-emerald-500/20
      bg-emerald-500/10
      px-3
      py-2
      text-center
      text-sm
      font-medium
      text-emerald-500
      transition
      hover:bg-emerald-500/20
    "
                >
                  💬 WhatsApp
                </a>

                <a
                  href={`mailto:${lead.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="
      flex-1
      rounded-xl
      border
      border-blue-500/20
      bg-blue-500/10
      px-3
      py-2
      text-center
      text-sm
      font-medium
      text-blue-500
      transition
      hover:bg-blue-500/20
    "
                >
                  ✉ Email
                </a>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <span className="text-xs text-[var(--text-secondary)]">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>

                <span className="text-sm font-medium text-[var(--primary)]">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div
          className="
          mt-10
          rounded-3xl
          border
          border-dashed
          border-[var(--border)]
          p-14
          text-center
        "
        >
          <Users
            size={50}
            className="mx-auto mb-4 text-[var(--text-secondary)]"
          />

          <h3 className="text-xl font-semibold">No Leads Found</h3>

          <p className="mt-2 text-[var(--text-secondary)]">
            Try changing search or filters.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl bg-red-500/10 p-4 text-red-500">
          {error}
        </div>
      )}
    </section>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-[var(--border)]
      bg-[var(--card)]
      p-6
      transition-all
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <div className="mb-4 flex justify-between">
        <div className="rounded-2xl bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
          {icon}
        </div>
      </div>

      <h3 className="text-3xl font-bold">{value}</h3>

      <p className="mt-1 text-sm text-[var(--text-secondary)]">{title}</p>
    </div>
  );
}
