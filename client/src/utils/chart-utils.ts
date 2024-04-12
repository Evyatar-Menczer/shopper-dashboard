import { titleToSnakeCase } from "./utils"

export const aggregateDataByMetric = (rawData: any[], metric: string) => {
  if (!metric) return
  const aggregatedData = rawData.reduce((acc, item) => {
    const date = item.date
    acc[date] = (acc[date] || 0) + item[titleToSnakeCase(metric)]
    return acc
  }, {})

  const data = Object.entries(aggregatedData).map(([date, value]) => [
    new Date(date).getTime(),
    value,
  ])
  return {
    name: metric,
    data,
  }
}
