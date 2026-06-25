"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Eye,
  Globe,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  engagedSessions: number;
  engagementRate: number;
  bounceRate: number;
  averageSessionDuration: number;
  eventCount: number;
}

interface ChartPoint {
  date: string;
  users: number;
}

interface TopPage {
  page: string;
  views: number;
}

interface CityData {
  city: string;
  visitors: number;
}

interface CountryData {
  country: string;
  visitors: number;
}

interface SourceData {
  source: string;
  visitors: number;
}

interface DeviceData {
  device: string;
  visitors: number;
  sessions: number;
}

interface BrowserData {
  browser: string;
  visitors: number;
  pageViews: number;
}

export default function AnalyticsPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [sources, setSources] = useState<SourceData[]>([]);
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [browsers, setBrowsers] = useState<BrowserData[]>([]);

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    sessions: 0,
    pageViews: 0,
    engagedSessions: 0,
    engagementRate: 0,
    bounceRate: 0,
    averageSessionDuration: 0,
    eventCount: 0,
  });

  const fetchAnalytics = async () => {
    try {
      const [
        overviewRes,
        chartRes,
        pagesRes,
        citiesRes,
        sourcesRes,
        countriesRes,
        devicesRes,
        browsersRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/analytics/overview`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/visitors-chart`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/top-pages`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/cities`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/traffic-sources`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/countries`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/devices`, {
          cache: "no-store",
        }),
        fetch(`${API_BASE}/analytics/browsers`, {
          cache: "no-store",
        }),
      ]);

      const overview = await overviewRes.json();
      const chart = await chartRes.json();
      const pages = await pagesRes.json();
      const citiesData = await citiesRes.json();
      const sourcesData = await sourcesRes.json();
      const countriesData = await countriesRes.json();
      const devicesData = await devicesRes.json();
      const browsersData = await browsersRes.json();

      setAnalytics(overview);
      setChartData(Array.isArray(chart) ? chart : []);
      setTopPages(Array.isArray(pages) ? pages : []);
      setCities(Array.isArray(citiesData) ? citiesData : []);
      setSources(Array.isArray(sourcesData) ? sourcesData : []);
      setCountries(Array.isArray(countriesData) ? countriesData : []);
      setDevices(Array.isArray(devicesData) ? devicesData : []);
      setBrowsers(Array.isArray(browsersData) ? browsersData : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchAnalytics();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const topCity = cities.length > 0 ? cities[0] : { city: "N/A", visitors: 0 };
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatDuration = (seconds: number) => {
    const safeSeconds = Math.round(seconds || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return minutes > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  };

  const stats = [
    {
      label: "Total Users",
      value: analytics.totalUsers,
      icon: <Users size={18} />,
      tone: "blue",
    },
    {
      label: "Active Users",
      value: analytics.activeUsers,
      icon: <UserCheck size={18} />,
      tone: "green",
    },
    {
      label: "New Users",
      value: analytics.newUsers,
      icon: <UserPlus size={18} />,
      tone: "violet",
    },
    {
      label: "Sessions",
      value: analytics.sessions,
      icon: <Activity size={18} />,
      tone: "amber",
    },
    {
      label: "Page Views",
      value: analytics.pageViews,
      icon: <Eye size={18} />,
      tone: "emerald",
    },
    {
      label: "Top City",
      value: topCity.visitors,
      subLabel: topCity.city,
      icon: <Globe size={18} />,
      tone: "rose",
    },
    {
      label: "Top Source",
      value: sources[0]?.visitors || 0,
      subLabel: sources[0]?.source || "N/A",
      icon: <TrendingUp size={18} />,
      tone: "cyan",
    },
  ];

  const engagementStats = [
    {
      label: "Engaged Sessions",
      value: analytics.engagedSessions.toLocaleString(),
      icon: <Activity size={18} />,
      tone: "green",
    },
    {
      label: "Engagement Rate",
      value: formatPercent(analytics.engagementRate),
      icon: <TrendingUp size={18} />,
      tone: "blue",
    },
    {
      label: "Bounce Rate",
      value: formatPercent(analytics.bounceRate),
      icon: <Eye size={18} />,
      tone: "amber",
    },
    {
      label: "Avg Session",
      value: formatDuration(analytics.averageSessionDuration),
      icon: <UserCheck size={18} />,
      tone: "violet",
    },
    {
      label: "Events",
      value: analytics.eventCount.toLocaleString(),
      icon: <Activity size={18} />,
      tone: "cyan",
    },
  ];

  return (
    <div className="pb-24">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
          Website Insights
        </p>

        <h1 className="font-serif text-4xl text-[var(--text-primary)]">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Monitor visitor activity, website performance, traffic growth, and
          engagement metrics.
        </p>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-7">
        {stats.map((item) => (
          <Stat
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            tone={item.tone}
            loading={loading}
            subLabel={item.subLabel}
          />
        ))}
      </div>

      <div className="mb-6 rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 via-transparent to-transparent p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Performance Overview
        </h3>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Your website generated
          <span className="mx-1 font-semibold text-[var(--primary)]">
            {analytics.pageViews.toLocaleString()}
          </span>
          page views from
          <span className="mx-1 font-semibold text-[var(--primary)]">
            {analytics.totalUsers.toLocaleString()}
          </span>
          visitors in the selected period.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-5">
        {engagementStats.map((item) => (
          <MiniStat
            key={item.label}
            label={item.label}
            value={loading ? "..." : item.value}
            icon={item.icon}
            tone={item.tone}
          />
        ))}
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          {/* CHART */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Visitor Trend
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Daily visitors over the last 30 days
              </p>
            </div>

            <TrendingUp size={22} className="text-[var(--primary)]" />
          </div>
          {chartData.length > 0 ? (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#65BC4F"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[350px] items-center justify-center rounded-2xl border border-dashed border-[var(--border)]">
              <div className="text-center">
                <TrendingUp
                  size={40}
                  className="mx-auto mb-3 text-[var(--text-secondary)]"
                />

                <p className="font-medium text-[var(--text-primary)]">
                  No Visitor Data Available
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-5 text-xl font-semibold">Traffic Sources</h2>

          <div className="space-y-4">
            {sources.length > 0 ? (
              sources.slice(0, 8).map((item, index) => (
                <div key={index}>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium">{item.source}</span>

                    <span className="text-sm font-semibold">
                      {item.visitors}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[var(--primary)]"
                      style={{
                        width: `${Math.min(
                          (item.visitors / (sources[0]?.visitors || 1)) * 100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-[var(--text-secondary)]">
                No traffic source data available.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* TOP PAGES */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Top Pages
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Most visited pages across your website.
              </p>
            </div>

            <div className="rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
              <Globe size={20} />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full">
              <thead className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Page
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Views
                  </th>
                </tr>
              </thead>

              <tbody>
                {topPages.length > 0 ? (
                  topPages.map((page, index) => (
                    <tr
                      key={index}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="px-5 py-4 font-medium">{page.page}</td>

                      <td className="px-5 py-4">
                        {page.views.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-5 py-16 text-center text-[var(--text-secondary)]"
                    >
                      No page analytics available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Top Cities</h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Visitors by location
              </p>
            </div>

            <Globe size={22} className="text-[var(--primary)]" />
          </div>

          <div className="space-y-3">
            {cities.length > 0 ? (
              cities.slice(0, 10).map((city, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-[var(--border)] p-4"
                >
                  <span className="font-medium">{city.city}</span>

                  <span className="font-semibold text-[var(--primary)]">
                    {city.visitors}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-[var(--text-secondary)]">
                No city analytics available.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <RankList
          title="Top Countries"
          subtitle="Visitors by country"
          items={countries.slice(0, 10).map((item) => ({
            label: item.country,
            value: item.visitors,
          }))}
          emptyText="No country analytics available."
        />

        <RankList
          title="Device Breakdown"
          subtitle="Users and sessions by device"
          items={devices.slice(0, 10).map((item) => ({
            label: item.device,
            value: item.visitors,
            subValue: `${item.sessions.toLocaleString()} sessions`,
          }))}
          emptyText="No device analytics available."
        />

        <RankList
          title="Top Browsers"
          subtitle="Users and page views by browser"
          items={browsers.slice(0, 10).map((item) => ({
            label: item.browser,
            value: item.visitors,
            subValue: `${item.pageViews.toLocaleString()} views`,
          }))}
          emptyText="No browser analytics available."
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  tone,
  loading,
  subLabel,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: string;
  loading: boolean;
  subLabel?: string;
}) {
  const tones: Record<string, string> = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    green: "border-green-500/20 bg-green-500/10 text-green-600",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-600",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    rose: "border-rose-500/20 bg-rose-500/10 text-rose-600",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-600",
  };

  return (
    <div
      className={`group rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${tones[tone]}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="rounded-2xl bg-white/70 p-3">{icon}</div>

        <span className="text-[11px] uppercase "> {label}</span>
      </div>

      <h3 className="mt-2 text-4xl font-bold">
        {loading ? "..." : value.toLocaleString()}
      </h3>

      {subLabel && <p className="mt-2 text-sm font-medium">{subLabel}</p>}
    </div>
  );
}

function MiniStat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: string;
}) {
  const tones: Record<string, string> = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    green: "border-green-500/20 bg-green-500/10 text-green-600",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-600",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-600",
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[2px]">{label}</span>
        <div className="rounded-xl bg-white/70 p-2">{icon}</div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function RankList({
  title,
  subtitle,
  items,
  emptyText,
}: {
  title: string;
  subtitle: string;
  items: Array<{
    label: string;
    value: number;
    subValue?: string;
  }>;
  emptyText: string;
}) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>
        <Globe size={22} className="text-[var(--primary)]" />
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {item.label}
                  </p>
                  {item.subValue && (
                    <p className="text-xs text-[var(--text-secondary)]">
                      {item.subValue}
                    </p>
                  )}
                </div>
                <span className="font-semibold text-[var(--primary)]">
                  {item.value.toLocaleString()}
                </span>
              </div>

              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-[var(--primary)]"
                  style={{
                    width: `${Math.min((item.value / maxValue) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-[var(--text-secondary)]">
            {emptyText}
          </div>
        )}
      </div>
    </div>
  );
}
