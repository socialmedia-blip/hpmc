const analyticsClient = require("./googleAnalytics");

const getBrowsers = async () => {
  const [response] = await analyticsClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,

    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
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
