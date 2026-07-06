const analyticsClient = require("./googleAnalytics");

const getNewVsReturning = async (dateRange = {}) => {
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
        name: "newVsReturning",
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
  });

  return response;
};

module.exports = getNewVsReturning;
