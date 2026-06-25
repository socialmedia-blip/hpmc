const analyticsClient = require("./googleAnalytics");

const getDevices = async () => {
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
