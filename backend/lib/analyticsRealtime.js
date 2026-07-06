const analyticsClient = require("./googleAnalytics");

const getRealtime = async () => {
  const [response] = await analyticsClient.runRealtimeReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,

    dimensions: [
      {
        name: "country",
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

    limit: 10,
  });

  return response;
};

module.exports = getRealtime;
