const analyticsClient = require("./googleAnalytics");

const getVisitorsChart = async (dateRange = {}) => {
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
        name: "date",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
    ],

    orderBys: [
      {
        dimension: {
          dimensionName: "date",
        },
      },
    ],
  });

  return response;
};

module.exports = getVisitorsChart;
