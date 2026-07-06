const analyticsClient = require("./googleAnalytics");

const getTrafficSources = async (dateRange = {}) => {
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
        name: "sessionSourceMedium",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
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

    limit: 20,
  });

  return response;
};

module.exports = getTrafficSources;
