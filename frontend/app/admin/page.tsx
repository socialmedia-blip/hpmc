"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPinned,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  products?: string[];
  marked?: boolean;
  verified?: boolean;
  createdAt: string;
}

interface DashboardData {
  leads: Lead[];
  clients: number;
  subscribers: number;
  siteVisits: number;
  agents: number;
  vendors: number;
}

const EMPTY_DATA: DashboardData = {
  leads: [],
  clients: 0,
  subscribers: 0,
  siteVisits: 0,
  agents: 0,
  vendors: 0,
};

function getCollection(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data;
  }

  return [];
}

function getCount(payload: unknown) {
  if (Array.isArray(payload)) return payload.length;

  if (payload && typeof payload === "object") {
    if ("count" in payload && typeof payload.count === "number") {
      return payload.count;
    }

    if ("data" in payload && Array.isArray(payload.data)) {
      return payload.data.length;
    }
  }

  return 0;
}

async function fetchJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  const payload = await response.json();

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : "Failed to load dashboard data";
    throw new Error(message);
  }

  return payload;
}

async function requestDashboard(apiBase: string | undefined) {
  const endpoints = [
    "lead",
    "client",
    "subscribers",
    "sitevisit",
    "agent",
    "vendor",
  ] as const;

  const results = await Promise.allSettled(
    endpoints.map((endpoint) => fetchJson(`${apiBase}/${endpoint}`)),
  );

  const successfulRequests = results.filter(
    (result) => result.status === "fulfilled",
  ).length;

  if (successfulRequests === 0) {
    throw new Error("Unable to connect to the dashboard services");
  }

  const valueAt = (index: number) => {
    const result = results[index];
    return result.status === "fulfilled" ? result.value : null;
  };

  return {
    data: {
      leads: getCollection(valueAt(0)) as Lead[],
      clients: getCount(valueAt(1)),
      subscribers: getCount(valueAt(2)),
      siteVisits: getCount(valueAt(3)),
      agents: getCount(valueAt(4)),
      vendors: getCount(valueAt(5)),
    },
    hasPartialFailure: successfulRequests < endpoints.length,
  };
}

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>(EMPTY_DATA);
  const [chartDays, setChartDays] = useState<7 | 30>(7);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [partialWarning, setPartialWarning] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    let cancelled = false;

    requestDashboard(API_BASE)
      .then(({ data, hasPartialFailure }) => {
        if (!cancelled) {
          setDashboard(data);
          setPartialWarning(hasPartialFailure);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  const refreshDashboard = async () => {
    try {
      setRefreshing(true);
      setError("");
      const { data, hasPartialFailure } = await requestDashboard(API_BASE);
      setDashboard(data);
      setPartialWarning(hasPartialFailure);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const leadStats = useMemo(() => {
    const now = new Date();
    const today = dateKey(now);
    const month = now.getMonth();
    const year = now.getFullYear();

    return {
      total: dashboard.leads.length,
      pending: dashboard.leads.filter((lead) => !lead.marked).length,
      completed: dashboard.leads.filter((lead) => lead.marked).length,
      verified: dashboard.leads.filter((lead) => lead.verified).length,
      today: dashboard.leads.filter(
        (lead) => dateKey(new Date(lead.createdAt)) === today,
      ).length,
      thisMonth: dashboard.leads.filter((lead) => {
        const createdAt = new Date(lead.createdAt);
        return (
          createdAt.getMonth() === month && createdAt.getFullYear() === year
        );
      }).length,
    };
  }, [dashboard.leads]);

  const chartData = useMemo(() => {
    const counts = new Map<string, number>();

    dashboard.leads.forEach((lead) => {
      const key = dateKey(new Date(lead.createdAt));
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    return Array.from({ length: chartDays }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (chartDays - 1 - index));

      return {
        key: dateKey(date),
        label: date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        }),
        value: counts.get(dateKey(date)) || 0,
      };
    });
  }, [dashboard.leads, chartDays]);

  const topProducts = useMemo(() => {
    const products = new Map<string, number>();

    dashboard.leads.forEach((lead) => {
      lead.products?.forEach((product) => {
        const name = product.trim();
        if (name) products.set(name, (products.get(name) || 0) + 1);
      });
    });

    return [...products.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [dashboard.leads]);

  const recentLeads = useMemo(
    () =>
      [...dashboard.leads]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5),
    [dashboard.leads],
  );

  const completionRate = leadStats.total
    ? Math.round((leadStats.completed / leadStats.total) * 100)
    : 0;
  const verificationRate = leadStats.total
    ? Math.round((leadStats.verified / leadStats.total) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="mb-4 h-11 w-11 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
        <p className="text-[var(--text-secondary)]">Preparing dashboard...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
            Admin Panel
          </p>
          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Monitor enquiries, audience growth, and recent activity.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshDashboard}
          disabled={refreshing}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--background-secondary)] disabled:opacity-60"
        >
          <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={refreshDashboard}
            className="text-sm font-semibold text-red-600"
          >
            Try again
          </button>
        </div>
      )}

      {partialWarning && !error && (
        <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-700">
          Some dashboard services did not respond. Available data is shown
          below.
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 md:gap-4">
        <StatCard
          title="Total Leads"
          value={leadStats.total}
          subtitle={`${leadStats.today} today`}
          icon={<Users size={19} />}
          color="blue"
          href="/admin/lead"
        />
        <StatCard
          title="Site Visits"
          value={dashboard.siteVisits}
          subtitle="All requests"
          icon={<MapPinned size={19} />}
          color="violet"
          href="/admin/site-visit"
        />
        <StatCard
          title="Subscribers"
          value={dashboard.subscribers}
          subtitle="Email audience"
          icon={<Mail size={19} />}
          color="green"
          href="/admin/subscribers"
        />
        <StatCard
          title="Agents"
          value={dashboard.agents}
          subtitle="Applications"
          icon={<BriefcaseBusiness size={19} />}
          color="orange"
          href="/admin/agents"
        />
        <StatCard
          title="Vendors"
          value={dashboard.vendors}
          subtitle="Registrations"
          icon={<UserRoundCheck size={19} />}
          color="red"
          href="/admin/vendors"
        />
        <StatCard
          title="Clients"
          value={dashboard.clients}
          subtitle="Published clients"
          icon={<ShieldCheck size={19} />}
          color="cyan"
          href="/admin/clients"
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <MiniStat
          label="Leads This Month"
          value={leadStats.thisMonth}
          icon={<CalendarDays size={18} />}
        />
        <MiniStat
          label="Pending Leads"
          value={leadStats.pending}
          icon={<Clock3 size={18} />}
          accent="text-yellow-600"
        />
        <MiniStat
          label="Completed Leads"
          value={leadStats.completed}
          icon={<CheckCircle2 size={18} />}
          accent="text-green-600"
        />
        <MiniStat
          label="Verified Leads"
          value={leadStats.verified}
          icon={<ShieldCheck size={18} />}
          accent="text-violet-600"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp size={19} className="text-[var(--primary)]" />
                <h2 className="font-semibold text-[var(--text-primary)]">
                  Lead Trend
                </h2>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                New leads received over the selected period
              </p>
            </div>

            <div className="flex rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-1">
              {[7, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setChartDays(days as 7 | 30)}
                  className={`h-8 rounded-lg px-3 text-xs font-semibold transition ${
                    chartDays === days
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          <LeadChart data={chartData} />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <h2 className="font-semibold text-[var(--text-primary)]">
            Lead Health
          </h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Current processing and verification progress
          </p>

          <div className="mt-7 space-y-7">
            <ProgressMetric
              label="Completion Rate"
              value={completionRate}
              count={`${leadStats.completed} of ${leadStats.total}`}
              color="bg-green-500"
            />
            <ProgressMetric
              label="Verification Rate"
              value={verificationRate}
              count={`${leadStats.verified} of ${leadStats.total}`}
              color="bg-violet-500"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              Needs Attention
            </p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-3xl font-bold text-yellow-600">
                  {leadStats.pending}
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  pending leads
                </p>
              </div>
              <Link
                href="/admin/lead"
                className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)]"
              >
                Review <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 md:px-6">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                Recent Leads
              </h2>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Latest enquiries received
              </p>
            </div>
            <Link
              href="/admin/lead"
              className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)]"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--background-secondary)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] md:px-6">
                      Lead
                    </th>
                    <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] sm:table-cell">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] md:px-5">
                      Status
                    </th>
                    <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] md:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-t border-[var(--border)] transition hover:bg-[var(--background-secondary)]"
                    >
                      <td className="px-4 py-4 md:px-6">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {lead.name}
                        </p>
                        <p className="mt-1 max-w-[220px] truncate text-xs text-[var(--text-secondary)]">
                          {lead.email}
                        </p>
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-[var(--text-primary)] sm:table-cell">
                        {lead.companyName || "Not provided"}
                      </td>
                      <td className="px-4 py-4 md:px-5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            lead.marked
                              ? "bg-green-500/10 text-green-600"
                              : "bg-yellow-500/10 text-yellow-600"
                          }`}
                        >
                          {lead.marked ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-4 text-xs text-[var(--text-secondary)] md:table-cell">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-sm text-[var(--text-secondary)]">
              No leads available yet.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
          <h2 className="font-semibold text-[var(--text-primary)]">
            Top Product Interest
          </h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Most requested products across all leads
          </p>

          {topProducts.length > 0 ? (
            <div className="mt-6 space-y-5">
              {topProducts.map((product, index) => {
                const maxCount = topProducts[0]?.count || 1;
                const width = Math.max((product.count / maxCount) * 100, 8);

                return (
                  <div key={product.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-xs font-bold text-[var(--primary)]">
                          {index + 1}
                        </span>
                        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {product.name}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[var(--text-secondary)]">
                        {product.count}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--background-secondary)]">
                      <div
                        className="h-full rounded-full bg-[var(--primary)]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-[var(--background-secondary)] p-8 text-center text-sm text-[var(--text-secondary)]">
              Product interest will appear when leads select products.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LeadChart({
  data,
}: {
  data: Array<{ key: string; label: string; value: number }>;
}) {
  const width = 760;
  const height = 260;
  const left = 38;
  const right = 18;
  const top = 20;
  const bottom = 42;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const yMax = Math.max(Math.ceil(maxValue / 5) * 5, 5);
  const stepX = data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;
  const points = data.map((item, index) => ({
    ...item,
    x: left + index * stepX,
    y: top + chartHeight - (item.value / yMax) * chartHeight,
  }));
  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `${left},${top + chartHeight} ${linePoints} ${
    left + chartWidth
  },${top + chartHeight}`;
  const labelInterval = data.length <= 7 ? 1 : 5;

  return (
    <div>
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto min-h-[220px] w-full"
          role="img"
          aria-label="Lead trend chart"
        >
          <defs>
            <linearGradient id="leadArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.02"
              />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((line) => {
            const y = top + (chartHeight / 4) * line;
            const value = Math.round(yMax - (yMax / 4) * line);

            return (
              <g key={line}>
                <line
                  x1={left}
                  x2={left + chartWidth}
                  y1={y}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="4 5"
                />
                <text
                  x={left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {value}
                </text>
              </g>
            );
          })}

          <polygon points={areaPoints} fill="url(#leadArea)" />
          <polyline
            points={linePoints}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <g key={point.key}>
              <circle
                cx={point.x}
                cy={point.y}
                r={data.length <= 7 ? 4 : 2.5}
                fill="var(--card)"
                stroke="var(--primary)"
                strokeWidth="2.5"
              >
                <title>
                  {point.label}: {point.value} leads
                </title>
              </circle>
              {(index % labelInterval === 0 || index === points.length - 1) && (
                <text
                  x={point.x}
                  y={height - 14}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {point.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--text-secondary)]">
        <span>
          {data.reduce((sum, item) => sum + item.value, 0)} total leads
        </span>
        <span>
          Peak: {Math.max(...data.map((item) => item.value), 0)} per day
        </span>
      </div>
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  count,
  color,
}: {
  label: string;
  value: number;
  count: string;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {label}
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{count}</p>
        </div>
        <span className="text-lg font-bold text-[var(--text-primary)]">
          {value}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--background-secondary)]">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  icon,
  accent = "text-[var(--primary)]",
}: {
  label: string;
  value: number;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--background-secondary)] ${accent}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-[var(--text-secondary)]">{label}</p>
        <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  href,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: ReactNode;
  color: "blue" | "violet" | "green" | "orange" | "red" | "cyan";
  href: string;
}) {
  const styles = {
    blue: {
      card: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
      icon: "bg-blue-500/10 text-blue-600",
      value: "text-blue-600",
    },
    violet: {
      card: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
      icon: "bg-violet-500/10 text-violet-600",
      value: "text-violet-600",
    },
    green: {
      card: "from-green-500/10 to-green-600/5 border-green-500/20",
      icon: "bg-green-500/10 text-green-600",
      value: "text-green-600",
    },
    orange: {
      card: "from-orange-500/10 to-orange-600/5 border-orange-500/20",
      icon: "bg-orange-500/10 text-orange-600",
      value: "text-orange-600",
    },
    red: {
      card: "from-red-500/10 to-red-600/5 border-red-500/20",
      icon: "bg-red-500/10 text-red-600",
      value: "text-red-600",
    },
    cyan: {
      card: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20",
      icon: "bg-cyan-500/10 text-cyan-600",
      value: "text-cyan-600",
    },
  }[color];

  return (
    <Link
      href={href}
      className={`group rounded-2xl border bg-gradient-to-br p-4 transition hover:-translate-y-0.5 hover:shadow-lg ${styles.card}`}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}
        >
          {icon}
        </div>
        <ArrowRight
          size={15}
          className="text-[var(--text-secondary)] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </div>
      <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        {title}
      </p>
      <p className={`mt-2 text-3xl font-bold ${styles.value}`}>{value}</p>
      <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
        {subtitle}
      </p>
    </Link>
  );
}
