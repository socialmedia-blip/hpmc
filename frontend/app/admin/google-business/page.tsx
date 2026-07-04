"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BarChart3,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Eye,
  Globe,
  LineChart,
  Link2,
  MapPin,
  MessageSquareText,
  RefreshCw,
  Search,
  Share2,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

type Business = {
  place_id: string;
  name: string;
  address: string;
  rating: number;
  user_rating_count: number;
  types?: string[];
  website_uri?: string;
  google_maps_uri?: string;
  phone_number?: string;
  lat?: number;
  lng?: number;
};

type Review = {
  rating: number;
  text: string;
  author: string;
  authorPhoto?: string;
  timeDescription?: string;
  publishTime?: string;
};

type ReviewStats = {
  average_rating: number;
  total_reviews: number;
  target_rating: number;
  reviews_for_target: number;
  distribution: Record<string, number>;
  reviews: Review[];
  cached_at?: string;
};

type Competitor = {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri?: string;
  searchRank?: number;
};

type CompetitorStats = {
  competitors: Competitor[];
  search_rank: number;
  total_in_area: number;
  radius: number;
  cached_at?: string;
};

type PerformanceStats = {
  score: {
    total_score: number;
    rating_score: number;
    volume_score: number;
    completeness_score: number;
    competitive_score: number;
  };
  rank: number;
  total_in_area: number;
  keywords: string[];
  business_name: string;
  rating: number;
  user_rating_count: number;
  has_website: boolean;
  has_phone: boolean;
};

type SentimentStats = {
  overall_sentiment: string;
  positive_percentage: number;
  neutral_percentage: number;
  negative_percentage: number;
  summary: string;
  strengths: string[];
  complaints: string[];
  common_themes: string[];
};

type ApiResponse<T> = T & {
  success?: boolean;
  message?: string;
};

const tabs = [
  { key: "reviews", label: "Review Statistics", icon: <Star size={16} /> },
  { key: "ranking", label: "Ranking & Competitors", icon: <Users size={16} /> },
  {
    key: "performance",
    label: "Google Performance",
    icon: <TrendingUp size={16} />,
  },
  { key: "insights", label: "Profile Insights", icon: <BarChart3 size={16} /> },
  {
    key: "sentiment",
    label: "Sentiment Analysis",
    icon: <MessageSquareText size={16} />,
  },
  { key: "embed", label: "Embedding Reviews", icon: <Code2 size={16} /> },
  { key: "website", label: "Google Website", icon: <Globe size={16} /> },
];

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "Request failed");
  }

  return payload as T;
}

export default function GoogleBusinessPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [connectedBusiness, setConnectedBusiness] = useState<Business | null>(
    null,
  );
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [competitorStats, setCompetitorStats] =
    useState<CompetitorStats | null>(null);
  const [performanceStats, setPerformanceStats] =
    useState<PerformanceStats | null>(null);
  const [sentimentStats, setSentimentStats] = useState<SentimentStats | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("reviews");
  const [showApiKeyHelp, setShowApiKeyHelp] = useState(false);

  const baseUrl = useMemo(() => `${API_BASE}/google-business`, [API_BASE]);

  const loadDashboardData = useCallback(
    async (refreshReviews = false, refreshCompetitors = false) => {
      const reviewUrl = `${baseUrl}/review-stats${
        refreshReviews ? "?refresh=true" : ""
      }`;
      const competitorUrl = `${baseUrl}/competitors${
        refreshCompetitors ? "?refresh=true" : ""
      }`;

      const [reviews, competitors, performance, sentiment] = await Promise.all([
        requestJson<ReviewStats>(reviewUrl),
        requestJson<CompetitorStats>(competitorUrl),
        requestJson<PerformanceStats>(`${baseUrl}/performance`),
        requestJson<{ sentiment: SentimentStats }>(`${baseUrl}/sentiment`),
      ]);

      setReviewStats(reviews);
      setCompetitorStats(competitors);
      setPerformanceStats(performance);
      setSentimentStats(sentiment.sentiment);
    },
    [baseUrl],
  );

  const loadStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const status = await requestJson<{
        configured: boolean;
        has_api_key: boolean;
        business: Business | null;
      }>(`${baseUrl}/status`);

      if (!status.has_api_key) {
        setError("Backend .env me GOOGLE_PLACES_API_KEY configure karo.");
      }

      setConnectedBusiness(status.business);

      if (status.business) {
        await loadDashboardData();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load GMB data");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, loadDashboardData]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const searchBusinesses = async () => {
    try {
      const term = query.trim();
      if (!term) {
        setError("Business name enter karo.");
        return;
      }

      setSearching(true);
      setSearched(true);
      setError("");

      const data = await requestJson<{ places: Business[] }>(
        `${baseUrl}/search`,
        {
          method: "POST",
          body: JSON.stringify({ query: term }),
        },
      );

      setResults(data.places || []);
    } catch (err) {
      setResults([]);
      setError(err instanceof Error ? err.message : "Business search failed");
    } finally {
      setSearching(false);
    }
  };

  const connectBusiness = async () => {
    if (!selectedBusiness) return;

    try {
      setRefreshing(true);
      setError("");

      const data = await requestJson<{ business: Business }>(
        `${baseUrl}/select`,
        {
          method: "POST",
          body: JSON.stringify({ place_id: selectedBusiness.place_id }),
        },
      );

      setConnectedBusiness(data.business);
      setSelectedBusiness(null);
      setActiveTab("reviews");
      await loadDashboardData(true, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Business connect failed");
    } finally {
      setRefreshing(false);
    }
  };

  const disconnectBusiness = async () => {
    try {
      setRefreshing(true);
      setError("");
      await requestJson(`${baseUrl}/business`, { method: "DELETE" });
      setConnectedBusiness(null);
      setReviewStats(null);
      setCompetitorStats(null);
      setPerformanceStats(null);
      setSentimentStats(null);
      setResults([]);
      setSearched(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Disconnect failed");
    } finally {
      setRefreshing(false);
    }
  };

  const refreshConnectedData = async () => {
    try {
      setRefreshing(true);
      setError("");
      await loadDashboardData(true, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refresh failed");
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="mb-4 h-11 w-11 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
        <p className="text-[var(--text-secondary)]">
          Loading Google Business data...
        </p>
      </div>
    );
  }

  if (!connectedBusiness) {
    return (
      <section className="pb-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <MapPin size={30} />
          </div>

          <p className="mb-2 text-xs uppercase tracking-[4px] text-[var(--primary)]">
            Google Places Profile
          </p>
          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Connect Google Business Listing
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[var(--text-secondary)]">
            Search your public Google listing, verify the details, and connect
            it to show real rating, review, competitor, and profile data without
            OAuth.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--primary)] text-white">
              <Check size={17} />
            </div>
            <div className="h-px w-14 bg-[var(--primary)]" />
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
              2
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Search size={20} className="text-[var(--primary)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Search Your Business
            </h2>
          </div>

          {error && <Alert message={error} />}

          <div className="mb-5 rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  First time setup
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Add a Google Places API key to the backend .env file before
                  searching business listings.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowApiKeyHelp((value) => !value)}
                className="h-10 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-primary)]"
              >
                {showApiKeyHelp ? "Hide " : "Get API key"}
              </button>
            </div>

            {showApiKeyHelp && <ApiKeyInstructions />}
          </div>

          <div className="flex gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void searchBusinesses();
              }}
              placeholder="Search business name"
              className="h-12 flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 text-sm outline-none transition focus:border-[var(--primary)]"
            />
            <button
              type="button"
              onClick={() => void searchBusinesses()}
              disabled={searching}
              className="grid h-12 w-14 place-items-center rounded-lg bg-[var(--primary)] text-white disabled:opacity-60"
              aria-label="Search business"
            >
              {searching ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>

          {searched && (
            <div className="mt-4 space-y-3">
              {results.length ? (
                results.map((business) => (
                  <BusinessResult
                    key={business.place_id}
                    business={business}
                    onSelect={() => setSelectedBusiness(business)}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--text-secondary)]">
                  {searching
                    ? "Searching Google Places..."
                    : "No business found. Try a more specific name or city."}
                </div>
              )}
            </div>
          )}
        </div>

        {selectedBusiness && (
          <ConfirmModal
            business={selectedBusiness}
            loading={refreshing}
            onClose={() => setSelectedBusiness(null)}
            onConfirm={() => void connectBusiness()}
          />
        )}
      </section>
    );
  }

  return (
    <section className="pb-24">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <MapPin size={26} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                {connectedBusiness.name}
              </h1>
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)]"
                aria-label="Share profile"
              >
                <Share2 size={16} />
              </button>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-[var(--text-secondary)]">
              {connectedBusiness.address}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <RatingLine
                rating={connectedBusiness.rating}
                reviews={connectedBusiness.user_rating_count}
              />
              {connectedBusiness.website_uri && (
                <ExternalTextLink href={connectedBusiness.website_uri}>
                  Website
                </ExternalTextLink>
              )}
              {connectedBusiness.google_maps_uri && (
                <ExternalTextLink href={connectedBusiness.google_maps_uri}>
                  Maps
                </ExternalTextLink>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void refreshConnectedData()}
            disabled={refreshing}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--card)] disabled:opacity-60"
            aria-label="Refresh Google Business data"
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={() => void disconnectBusiness()}
            disabled={refreshing}
            className="grid h-10 w-10 place-items-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 disabled:opacity-60"
            aria-label="Disconnect business"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {error && <Alert message={error} />}

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Average Rating"
          value={(
            reviewStats?.average_rating || connectedBusiness.rating
          ).toFixed(1)}
          suffix="/5"
          icon={<Star size={18} />}
          tone="text-amber-500"
        />
        <MetricCard
          label="Total Reviews"
          value={String(
            reviewStats?.total_reviews || connectedBusiness.user_rating_count,
          )}
          icon={<BarChart3 size={18} />}
          tone="text-blue-600"
        />
        <MetricCard
          label="Target Rating"
          value={(reviewStats?.target_rating || 4.9).toFixed(1)}
          suffix="/5"
          icon={<Target size={18} />}
          tone="text-green-600"
        />
        <MetricCard
          label="Reviews to reach 4.9"
          value={String(reviewStats?.reviews_for_target || 0)}
          suffix="5-star reviews"
          icon={<TrendingUp size={18} />}
          tone="text-violet-600"
        />
      </div>

      {activeTab === "reviews" && <ReviewStatistics stats={reviewStats} />}
      {activeTab === "ranking" && (
        <RankingPanel stats={competitorStats} business={connectedBusiness} />
      )}
      {activeTab === "performance" && (
        <PerformancePanel stats={performanceStats} />
      )}
      {activeTab === "insights" && (
        <InsightsPanel
          business={connectedBusiness}
          stats={performanceStats}
          reviewStats={reviewStats}
        />
      )}
      {activeTab === "sentiment" && <SentimentPanel stats={sentimentStats} />}
      {activeTab === "embed" && (
        <EmbedPanel review={reviewStats?.reviews?.[0]} />
      )}
      {activeTab === "website" && <WebsitePanel business={connectedBusiness} />}
    </section>
  );
}

function Alert({ message }: { message: string }) {
  return (
    <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
      {message}
    </div>
  );
}

function BusinessResult({
  business,
  onSelect,
}: {
  business: Business;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] p-4 text-left transition hover:border-[var(--primary)]"
    >
      <div className="flex min-w-0 gap-3">
        <MapPin size={20} className="mt-1 shrink-0 text-[var(--primary)]" />
        <div className="min-w-0">
          <p className="font-semibold text-[var(--text-primary)]">
            {business.name}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {business.address}
          </p>
          <RatingLine
            rating={business.rating}
            reviews={business.user_rating_count}
          />
        </div>
      </div>
      <ChevronRight
        size={18}
        className="shrink-0 text-[var(--text-secondary)]"
      />
    </button>
  );
}

function ConfirmModal({
  business,
  loading,
  onClose,
  onConfirm,
}: {
  business: Business;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="w-full max-w-xl rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Confirm Business Selection
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Please verify the public listing details before connecting.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg hover:bg-[var(--muted)]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6 flex gap-3 rounded-lg bg-[var(--background-secondary)] p-4">
          <MapPin size={20} className="mt-1 shrink-0 text-[var(--primary)]" />
          <div>
            <p className="font-semibold text-[var(--text-primary)]">
              {business.name}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {business.address}
            </p>
            <RatingLine
              rating={business.rating}
              reviews={business.user_rating_count}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-11 rounded-lg border border-[var(--border)] px-5 text-sm font-medium disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? (
              <RefreshCw size={17} className="animate-spin" />
            ) : (
              <Check size={17} />
            )}
            Confirm & Connect
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingLine({
  rating,
  reviews: reviewCount,
}: {
  rating: number;
  reviews: number;
}) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-1 font-semibold text-amber-600">
        <Star size={14} fill="currentColor" />
        {(rating || 0).toFixed(1)}
      </span>
      <span className="text-[var(--text-secondary)]">
        {(reviewCount || 0).toLocaleString()} reviews
      </span>
    </div>
  );
}

function ExternalTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[var(--primary)]"
    >
      {children} <ExternalLink size={13} />
    </a>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  icon,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <div className={`mb-3 flex items-center gap-2 text-sm ${tone}`}>
        {icon}
        <span className="text-[var(--text-secondary)]">{label}</span>
      </div>
      <div className="flex items-end gap-1">
        <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
        {suffix && (
          <p className="pb-1 text-sm text-[var(--text-secondary)]">{suffix}</p>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        {icon}
      </div>
      {children}
    </div>
  );
}

function ReviewStatistics({ stats }: { stats: ReviewStats | null }) {
  if (!stats) return <EmptyPanel text="Review statistics are loading." />;

  const total = Math.max(
    1,
    Object.values(stats.distribution || {}).reduce(
      (sum, count) => sum + Number(count || 0),
      0,
    ),
  );

  return (
    <div className="space-y-6">
      <Panel title="Rating Distribution" icon={<RefreshCw size={18} />}>
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="space-y-5">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = Number(stats.distribution[String(rating)] || 0);
              return (
                <DistributionRow
                  key={rating}
                  rating={rating}
                  count={count}
                  percent={(count / total) * 100}
                  variant="solid"
                />
              );
            })}
          </div>
          <div className="space-y-5">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = Number(stats.distribution[String(rating)] || 0);
              return (
                <DistributionRow
                  key={rating}
                  rating={rating}
                  count={count}
                  percent={(count / total) * 100}
                  variant="line"
                />
              );
            })}
          </div>
        </div>
      </Panel>

      {stats.reviews.length > 0 && (
        <Panel
          title="Recent Public Reviews"
          icon={
            <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-sm">
              <Eye size={15} />
              Places API sample
            </span>
          }
        >
          <div className="space-y-3">
            {stats.reviews.map((review, index) => (
              <ReviewCard
                key={`${review.author}-${review.publishTime}-${index}`}
                review={review}
              />
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

function ApiKeyInstructions() {
  return (
    <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
      <p className="font-semibold text-[var(--text-primary)]">
        How to get a Google Places API key
      </p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
        <li>
          Open Google Cloud Console:{" "}
          <a
            href="https://console.cloud.google.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--primary)]"
          >
            console.cloud.google.com
          </a>
        </li>
        <li>Select an existing project or create a new project.</li>
        <li>Go to APIs & Services &gt; Library.</li>
        <li>Search for Places API and enable it.</li>
        <li>Go to APIs & Services &gt; Credentials.</li>
        <li>Click Create Credentials &gt; API key.</li>
        <li>Copy the key and add it to the backend .env file.</li>
      </ol>
      <pre className="mt-4 overflow-auto rounded-lg bg-[var(--background-secondary)] p-3 text-sm text-[var(--text-primary)]">
        GOOGLE_PLACES_API_KEY=your_google_places_api_key
      </pre>
      <p className="mt-3 text-xs leading-5 text-[var(--text-secondary)]">
        For production, restrict the key to the Places API and add a backend
        server IP restriction where possible.
      </p>
    </div>
  );
}

function DistributionRow({
  rating,
  count,
  percent,
  variant,
}: {
  rating: number;
  count: number;
  percent: number;
  variant: "solid" | "line";
}) {
  const colors: Record<number, string> = {
    5: "bg-green-500",
    4: "bg-lime-500",
    3: "bg-amber-500",
    2: "bg-orange-500",
    1: "bg-red-500",
  };

  return (
    <div className="grid grid-cols-[48px_1fr_62px] items-center gap-3 text-sm">
      <span className="font-medium text-[var(--text-primary)]">
        {rating} star
      </span>
      <div className="h-3 overflow-hidden rounded-full bg-[var(--muted)]">
        <div
          className={`h-full rounded-full ${
            variant === "solid" ? colors[rating] : "bg-[var(--primary)]"
          }`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <span className="text-right text-[var(--text-secondary)]">
        {variant === "solid" ? count : `${percent.toFixed(1)}%`}
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-lg bg-[var(--background-secondary)] p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
          {review.author?.slice(0, 1) || "G"}
        </div>
        <p className="font-semibold text-[var(--text-primary)]">
          {review.author || "Google User"}
        </p>
        <span className="flex text-amber-500">
          {Array.from({ length: Math.max(0, review.rating || 0) }).map(
            (_, index) => (
              <Star key={index} size={14} fill="currentColor" />
            ),
          )}
        </span>
        <span className="text-xs text-[var(--text-secondary)]">
          {review.timeDescription || review.publishTime || "Recent"}
        </span>
      </div>
      <p className="pl-0 text-sm leading-6 text-[var(--text-secondary)] md:pl-11">
        {review.text || "No review text available."}
      </p>
    </div>
  );
}

function RankingPanel({
  stats,
  business,
}: {
  stats: CompetitorStats | null;
  business: Business;
}) {
  if (!stats) return <EmptyPanel text="Competitor data is loading." />;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Panel title="Local Ranking Snapshot" icon={<Users size={18} />}>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricTile
            label="Estimated Rank"
            value={`#${stats.search_rank || 1}`}
          />
          <MetricTile
            label="Businesses Found"
            value={String(stats.total_in_area)}
          />
          <MetricTile
            label="Radius"
            value={`${Math.round(stats.radius / 1000)} km`}
          />
        </div>
        <div className="mt-5 rounded-lg border border-[var(--border)] p-4">
          <p className="font-semibold text-[var(--text-primary)]">
            {business.name}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Rank is estimated using public Places competitor data sorted by
            rating and review volume.
          </p>
        </div>
      </Panel>

      <Panel title="Competitors" icon={<LineChart size={18} />}>
        <div className="space-y-3">
          {stats.competitors.length ? (
            stats.competitors.slice(0, 8).map((competitor, index) => (
              <a
                key={competitor.placeId}
                href={competitor.googleMapsUri || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg bg-[var(--background-secondary)] p-4"
              >
                <div>
                  <p className="font-medium">{competitor.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {(competitor.rating || 0).toFixed(1)} rating ·{" "}
                    {(competitor.userRatingCount || 0).toLocaleString()} reviews
                  </p>
                </div>
                <span className="text-sm font-semibold text-[var(--primary)]">
                  #{index + 1}
                </span>
              </a>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--text-secondary)]">
              No nearby competitors returned by Places API.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}

function PerformancePanel({ stats }: { stats: PerformanceStats | null }) {
  if (!stats) return <EmptyPanel text="Performance data is loading." />;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <MetricCard
        label="Profile Score"
        value={`${stats.score.total_score}`}
        suffix="/100"
        icon={<BarChart3 size={18} />}
        tone="text-blue-600"
      />
      <MetricCard
        label="Review Volume Score"
        value={String(stats.score.volume_score)}
        suffix="/25"
        icon={<MessageSquareText size={18} />}
        tone="text-green-600"
      />
      <MetricCard
        label="Completeness Score"
        value={String(stats.score.completeness_score)}
        suffix="/20"
        icon={<MapPin size={18} />}
        tone="text-violet-600"
      />
      <div className="md:col-span-3">
        <Panel title="Public Data Performance" icon={<TrendingUp size={18} />}>
          <div className="grid gap-4 md:grid-cols-4">
            <MetricTile
              label="Rating Score"
              value={`${stats.score.rating_score}/30`}
            />
            <MetricTile
              label="Competitive Score"
              value={`${stats.score.competitive_score}/25`}
            />
            <MetricTile
              label="Website"
              value={stats.has_website ? "Available" : "Missing"}
            />
            <MetricTile
              label="Phone"
              value={stats.has_phone ? "Available" : "Missing"}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function InsightsPanel({
  business,
  stats,
  reviewStats,
}: {
  business: Business;
  stats: PerformanceStats | null;
  reviewStats: ReviewStats | null;
}) {
  return (
    <Panel title="Profile Insights" icon={<BarChart3 size={18} />}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          label="Primary category"
          value={business.types?.[0]?.replace(/_/g, " ") || "Not available"}
        />
        <MetricTile
          label="Top keyword"
          value={stats?.keywords?.[0] || business.types?.[0] || "Not available"}
        />
        <MetricTile
          label="Review sample"
          value={`${reviewStats?.reviews?.length || 0} public reviews`}
        />
        <MetricTile
          label="Maps status"
          value={business.google_maps_uri ? "Linked" : "Missing"}
        />
      </div>
    </Panel>
  );
}

function SentimentPanel({ stats }: { stats: SentimentStats | null }) {
  if (!stats) return <EmptyPanel text="Sentiment data is loading." />;

  return (
    <Panel title="Sentiment Analysis" icon={<MessageSquareText size={18} />}>
      <div className="grid gap-5 lg:grid-cols-3">
        <SentimentTile
          label="Positive"
          value={stats.positive_percentage}
          color="bg-green-500"
        />
        <SentimentTile
          label="Neutral"
          value={stats.neutral_percentage}
          color="bg-amber-500"
        />
        <SentimentTile
          label="Needs Attention"
          value={stats.negative_percentage}
          color="bg-red-500"
        />
      </div>
      <div className="mt-5 rounded-lg border border-[var(--border)] p-5">
        <p className="font-semibold capitalize">
          Overall sentiment: {stats.overall_sentiment}
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {stats.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stats.common_themes.map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function SentimentTile({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-[var(--background-secondary)] p-5">
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}%</p>
      <div className="mt-4 h-2 rounded-full bg-[var(--muted)]">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function EmbedPanel({ review }: { review?: Review }) {
  return (
    <Panel title="Embedding Reviews" icon={<Code2 size={18} />}>
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">
            Use this public review widget placeholder on website pages. It can
            be connected to this backend endpoint for live cached Places API
            review data.
          </p>
          <pre className="mt-4 overflow-auto rounded-lg bg-[var(--background-secondary)] p-4 text-sm text-[var(--text-primary)]">
            {`<div id="google-reviews"></div>
<script src="/google-reviews-widget.js"></script>`}
          </pre>
        </div>
        <div className="rounded-lg border border-[var(--border)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Star size={16} fill="currentColor" className="text-amber-500" />
            <p className="font-semibold">Review Widget</p>
          </div>
          {review ? (
            <ReviewCard review={review} />
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">
              No public review sample available.
            </p>
          )}
        </div>
      </div>
    </Panel>
  );
}

function WebsitePanel({ business }: { business: Business }) {
  return (
    <Panel title="Google Website Links" icon={<Globe size={18} />}>
      <div className="grid gap-4 md:grid-cols-2">
        {business.website_uri && (
          <LinkCard href={business.website_uri} icon={<Globe size={18} />}>
            Website
          </LinkCard>
        )}
        {business.google_maps_uri && (
          <LinkCard href={business.google_maps_uri} icon={<Link2 size={18} />}>
            Google Maps Listing
          </LinkCard>
        )}
        {business.phone_number && (
          <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-5">
            <span className="inline-flex items-center gap-3">
              <MapPin size={18} />
              Phone
            </span>
            <span className="font-medium">{business.phone_number}</span>
          </div>
        )}
      </div>
    </Panel>
  );
}

function LinkCard({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-lg border border-[var(--border)] p-5 transition hover:border-[var(--primary)]"
    >
      <span className="inline-flex items-center gap-3">
        {icon}
        {children}
      </span>
      <ExternalLink size={17} />
    </a>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] p-5">
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      <p className="mt-2 text-xl font-bold capitalize text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}

function EmptyPanel({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] p-10 text-center text-sm text-[var(--text-secondary)]">
      {text}
    </div>
  );
}
