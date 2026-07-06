const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getDateRange = (query = {}) => {
  const startDate = String(query.startDate || "").trim();
  const endDate = String(query.endDate || "").trim();

  if (DATE_PATTERN.test(startDate) && DATE_PATTERN.test(endDate)) {
    return {
      startDate,
      endDate,
    };
  }

  return {
    startDate: "30daysAgo",
    endDate: "today",
  };
};

const getMongoDateRange = (dateRange) => {
  const end = new Date();
  const start = new Date();

  if (
    DATE_PATTERN.test(dateRange.startDate) &&
    DATE_PATTERN.test(dateRange.endDate)
  ) {
    const customStart = new Date(`${dateRange.startDate}T00:00:00.000Z`);
    const customEnd = new Date(`${dateRange.endDate}T23:59:59.999Z`);

    if (
      !Number.isNaN(customStart.getTime()) &&
      !Number.isNaN(customEnd.getTime())
    ) {
      return {
        start: customStart,
        end: customEnd,
      };
    }
  }

  start.setDate(end.getDate() - 30);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

module.exports = {
  getDateRange,
  getMongoDateRange,
};
