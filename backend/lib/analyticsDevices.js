const analyticsClient = require("./googleAnalytics");

const getDevices = async (dateRange = {}) => {
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
        name: "deviceCategory",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "sessions",
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

module.exports = getDevices;
