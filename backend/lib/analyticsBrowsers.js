const analyticsClient = require("./googleAnalytics");

const getBrowsers = async (dateRange = {}) => {
  const [response] = await analyticsClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,

    dateRanges: [
      {
        startDate: dateRange.startDate || "30daysAgo",
        endDate: dateRange.endDate || "today",
      },
    ],

    dimensions: [
      {
        name: "browser",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "screenPageViews",
      },
    ],

    orderBys: [
      {
        metric: {
          metricName: "activeUsers",
        },
        desc: true,
      },
    ],

    limit: 10,
  });

  return response;
};

module.exports = getBrowsers;
