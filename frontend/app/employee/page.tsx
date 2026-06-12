"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Users,
  UserCheck,
  PhoneCall,
  Trophy,
  RefreshCw,
  TrendingDown,
  Clock3,
  ArrowUpRight,
  Target,
  Activity,
} from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  leadStatus?: string;
  createdAt: string;
}

export default function Dashboard() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
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
      setError(err instanceof Error ? err.message : "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;

    const won = leads.filter((l) => l.leadStatus === "won").length;

    return {
      total,
      new: leads.filter((l) => (l.leadStatus || "new") === "new").length,
      contacted: leads.filter((l) => l.leadStatus === "contacted").length,
      won,
      lost: leads.filter((l) => l.leadStatus === "lost").length,
      followup: leads.filter((l) => l.leadStatus === "follow-up").length,
      conversion: total ? ((won / total) * 100).toFixed(1) : "0",
    };
  }, [leads]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
        <p className="mt-5 text-sm text-[var(--text-secondary)]">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <section className="pb-24 md:pb-10">
      {/* HERO SECTION */}
      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-gradient-to-r
        from-[var(--primary)]/10
        via-[var(--card)]
        to-[var(--primary)]/5
        p-8
        mb-8
      "
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
              Employee Dashboard
            </p>

            <h1 className="text-4xl font-bold text-[var(--text-primary)]">
              Welcome Back, {employee?.name || "Employee"} 👋
            </h1>

            <p className="mt-3 text-[var(--text-secondary)]">
              Monitor your leads, conversions and customer interactions.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="
            flex items-center gap-2
            rounded-2xl
            bg-[var(--primary)]
            px-5 py-3
            text-white
            shadow-lg
            transition
            hover:scale-105
          "
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
        {" "}
        <StatCard
          title="Assigned Leads"
          value={stats.total}
          icon={<Users size={20} />}
        />{" "}
        <StatCard
          title="New Leads"
          value={stats.new}
          icon={<UserCheck size={20} />}
        />{" "}
        <StatCard
          title="Contacted"
          value={stats.contacted}
          icon={<PhoneCall size={20} />}
        />{" "}
        <StatCard
          title="Won Leads"
          value={stats.won}
          icon={<Trophy size={20} />}
        />{" "}
        <StatCard
          title="Lost Leads"
          value={stats.lost}
          icon={<TrendingDown size={20} />}
        />{" "}
        <StatCard
          title="Follow Ups"
          value={stats.followup}
          icon={<Clock3 size={20} />}
        />{" "}
      </div>

      {/* ANALYTICS */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Performance Overview
            </h3>

            <Target className="text-[var(--primary)]" size={20} />
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Lead Conversion</span>
                <span>{stats.conversion}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[var(--background-secondary)]">
                <div
                  className="h-full rounded-full bg-[var(--primary)]"
                  style={{
                    width: `${stats.conversion}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Contacted Leads</span>
                <span>{stats.contacted}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[var(--background-secondary)]">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${
                      stats.total ? (stats.contacted / stats.total) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Quick Insights
            </h3>

            <Activity className="text-[var(--primary)]" size={20} />
          </div>

          <div className="space-y-4">
            <Insight label="Total Leads" value={stats.total} />

            <Insight label="Won Deals" value={stats.won} />

            <Insight label="Pending Follow-ups" value={stats.followup} />

            <Insight label="Lost Opportunities" value={stats.lost} />
          </div>
        </div>
      </div>

      {/* RECENT LEADS */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Recent Assigned Leads
          </h3>

          <ArrowUpRight size={18} className="text-[var(--primary)]" />
        </div>

        {leads.length === 0 ? (
          <div className="p-10 text-center text-[var(--text-secondary)]">
            No assigned leads found.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead._id}
                className="
                  p-6
                  transition-all
                  hover:bg-[var(--background-secondary)]
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">
                      {lead.name}
                    </h4>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {lead.companyName}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                      <span>📞 {lead.phone}</span>
                      <span>✉️ {lead.email}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
                      {lead.leadStatus || "new"}
                    </span>

                    <p className="mt-2 text-xs text-[var(--text-secondary)]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-500">
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
      group
      rounded-3xl
      border
      border-[var(--border)]
      bg-[var(--card)]
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-2xl bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
          {icon}
        </div>
      </div>

      <h3 className="text-3xl font-bold text-[var(--text-primary)]">{value}</h3>

      <p className="mt-1 text-sm text-[var(--text-secondary)]">{title}</p>
    </div>
  );
}

function Insight({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[var(--background-secondary)] p-4">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>

      <span className="font-bold text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
