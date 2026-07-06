const analyticsClient = require("./googleAnalytics");

const getTopPages = async (dateRange = {}) => {
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
        name: "pagePath",
      },
    ],

    metrics: [
      {
        name: "screenPageViews",
      },
    ],

    orderBys: [
      {
        metric: {
          metricName: "screenPageViews",
        },
        desc: true,
      },
    ],

    limit: 10,
  });

  return response;
};

module.exports = getTopPages;
