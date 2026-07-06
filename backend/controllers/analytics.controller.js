const getOverview = require("../lib/analyticsOverview");
const getVisitorsChart = require("../lib/analyticsVisitorsChart");
const getTopPages = require("../lib/analyticsTopPages");
const getCities = require("../lib/analyticsCities");
const getTrafficSources = require("../lib/analyticsTrafficSources");
const getCountries = require("../lib/analyticsCountries");
const getDevices = require("../lib/analyticsDevices");
const getBrowsers = require("../lib/analyticsBrowsers");
const getNewVsReturning = require("../lib/analyticsNewVsReturning");
const getRealtime = require("../lib/analyticsRealtime");
const {
  getDateRange,
  getMongoDateRange,
} = require("../lib/analyticsDateRange");
const Lead = require("../models/lead.model");

const getConversionRate = (leads, users) => {
  if (!users) return 0;
  return Number(((leads / users) * 100).toFixed(2));
};

exports.overview = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getOverview(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json({
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
    }

    const metrics = data.rows[0].metricValues;

    res.json({
      totalUsers: Number(metrics[0]?.value || 0),
      activeUsers: Number(metrics[1]?.value || 0),
      newUsers: Number(metrics[2]?.value || 0),
      sessions: Number(metrics[3]?.value || 0),
      pageViews: Number(metrics[4]?.value || 0),
      engagedSessions: Number(metrics[5]?.value || 0),
      engagementRate: Number(metrics[6]?.value || 0),
      bounceRate: Number(metrics[7]?.value || 0),
      averageSessionDuration: Number(metrics[8]?.value || 0),
      eventCount: Number(metrics[9]?.value || 0),
    });
  } catch (err) {
    console.error("Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
    });
  }
};

exports.countryVisitors = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getCountries(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const countries = data.rows.map((row) => ({
      country: row.dimensionValues[0]?.value || "Unknown",
      visitors: Number(row.metricValues[0]?.value || 0),
    }));

    res.json(countries);
  } catch (err) {
    console.error("Country Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch country analytics",
    });
  }
};

exports.deviceBreakdown = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getDevices(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const devices = data.rows.map((row) => ({
      device: row.dimensionValues[0]?.value || "Unknown",
      visitors: Number(row.metricValues[0]?.value || 0),
      sessions: Number(row.metricValues[1]?.value || 0),
    }));

    res.json(devices);
  } catch (err) {
    console.error("Device Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch device analytics",
    });
  }
};

exports.browserBreakdown = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getBrowsers(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const browsers = data.rows.map((row) => ({
      browser: row.dimensionValues[0]?.value || "Unknown",
      visitors: Number(row.metricValues[0]?.value || 0),
      pageViews: Number(row.metricValues[1]?.value || 0),
    }));

    res.json(browsers);
  } catch (err) {
    console.error("Browser Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch browser analytics",
    });
  }
};

exports.visitorsChart = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getVisitorsChart(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const chartData = data.rows.map((row) => ({
      date: row.dimensionValues[0].value,
      users: Number(row.metricValues[0].value),
    }));

    res.json(chartData);
  } catch (err) {
    console.error("Visitors Chart Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch visitors chart",
    });
  }
};

exports.topPages = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getTopPages(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const pages = data.rows.map((row) => ({
      page: row.dimensionValues[0]?.value || "/",
      views: Number(row.metricValues[0]?.value || 0),
    }));

    res.json(pages);
  } catch (err) {
    console.error("Top Pages Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch top pages",
    });
  }
};

exports.cityVisitors = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getCities(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const cities = data.rows.map((row) => ({
      city: row.dimensionValues[0]?.value || "Unknown",
      visitors: Number(row.metricValues[0]?.value || 0),
    }));

    res.json(cities);
  } catch (err) {
    console.error("City Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch city analytics",
    });
  }
};

exports.trafficSources = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getTrafficSources(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const sources = data.rows.map((row) => ({
      source: row.dimensionValues[0]?.value || "Unknown",
      visitors: Number(row.metricValues[0]?.value || 0),
    }));

    res.json(sources);
  } catch (err) {
    console.error("Traffic Sources Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch traffic sources",
    });
  }
};

exports.newVsReturning = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const data = await getNewVsReturning(dateRange);

    if (!data.rows || data.rows.length === 0) {
      return res.json([]);
    }

    const visitors = data.rows.map((row) => {
      const rawType = row.dimensionValues[0]?.value || "Unknown";

      return {
        type:
          rawType.toLowerCase() === "new"
            ? "New visitors"
            : rawType.toLowerCase() === "returning"
              ? "Returning visitors"
              : rawType,
        visitors: Number(row.metricValues[0]?.value || 0),
      };
    });

    res.json(visitors);
  } catch (err) {
    console.error("New vs Returning Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch new vs returning visitors",
    });
  }
};

exports.realtime = async (req, res) => {
  try {
    const data = await getRealtime();

    if (!data.rows || data.rows.length === 0) {
      return res.json({
        activeUsers: 0,
        countries: [],
      });
    }

    const countries = data.rows.map((row) => ({
      country: row.dimensionValues[0]?.value || "Unknown",
      activeUsers: Number(row.metricValues[0]?.value || 0),
    }));

    const activeUsers = countries.reduce(
      (total, country) => total + country.activeUsers,
      0,
    );

    res.json({
      activeUsers,
      countries,
    });
  } catch (err) {
    console.error("Realtime Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch realtime analytics",
    });
  }
};

exports.conversions = async (req, res) => {
  try {
    const dateRange = getDateRange(req.query);
    const { start, end } = getMongoDateRange(dateRange);
    const leadFilter = {
      createdAt: {
        $gte: start,
        $lte: end,
      },
    };

    const [overviewData, totalLeads, verifiedLeads, sourceBreakdown] =
      await Promise.all([
        getOverview(dateRange),
        Lead.countDocuments(leadFilter),
        Lead.countDocuments({
          ...leadFilter,
          verified: true,
        }),
        Lead.aggregate([
          {
            $match: leadFilter,
          },
          {
            $group: {
              _id: {
                $ifNull: ["$source", "Website"],
              },
              leads: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              leads: -1,
            },
          },
          {
            $limit: 10,
          },
        ]),
      ]);

    const metrics = overviewData.rows?.[0]?.metricValues || [];
    const totalUsers = Number(metrics[0]?.value || 0);
    const activeUsers = Number(metrics[1]?.value || 0);
    const sessions = Number(metrics[3]?.value || 0);
    const pageViews = Number(metrics[4]?.value || 0);

    res.json({
      totalLeads,
      verifiedLeads,
      totalUsers,
      activeUsers,
      sessions,
      pageViews,
      userConversionRate: getConversionRate(totalLeads, totalUsers),
      activeUserConversionRate: getConversionRate(totalLeads, activeUsers),
      sessionConversionRate: getConversionRate(totalLeads, sessions),
      leadsPerThousandViews: pageViews
        ? Number(((totalLeads / pageViews) * 1000).toFixed(2))
        : 0,
      sourceBreakdown: sourceBreakdown.map((item) => ({
        source: item._id || "Website",
        leads: item.leads,
      })),
    });
  } catch (err) {
    console.error("Conversion Analytics Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch conversion analytics",
    });
  }
};
