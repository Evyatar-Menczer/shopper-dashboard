import { DataItem, TableDataItem, TableMetric } from "./types"
export const totalMetricToColor: Record<string, string> = {
  totalRevenue: "#f265a3",
  totalUnitsSold: "#767aff",
  totalProductViews: "#f8a42c",
}
const defaultObject = {
  totalUnitsSold: 0,
  totalProductViews: 0,
  totalRevenue: 0,
  cvr: "0%",
}

export const processTableData = (
  rawData: DataItem[],
  selectedMetric: keyof Omit<DataItem, "category_name" | "date">,
  totalsData: Record<string, any>,
  timeFrameStart?: string,
  timeFrameEnd?: string
) => {
  const aggregatedData: Record<string, TableDataItem> = {}
  rawData.forEach((item) => {
    if (!aggregatedData[item.category_name]) {
      aggregatedData[item.category_name] = {
        category_name: item.category_name,
        ...defaultObject,
      }
    }
    const categoryData = aggregatedData[item.category_name]
    categoryData.totalUnitsSold += item.units_sold
    categoryData.totalProductViews += item.product_views
    categoryData.totalRevenue += item.revenue
  })

  calculateCVR(aggregatedData)
  const changeRates = calculateChangeRate(
    rawData,
    selectedMetric,
    timeFrameStart,
    timeFrameEnd
  )
  Object.entries(changeRates).forEach(([key, value]) => {
    aggregatedData[key].change_rate = value
  })
  return Object.values(aggregatedData)
}

const calculateCVR = (aggregatedData: Record<string, TableDataItem>) => {
  Object.values(aggregatedData).forEach((categoryData) => {
    categoryData.cvr = categoryData.totalProductViews
      ? `${(
          (categoryData.totalUnitsSold / categoryData.totalProductViews) *
          100
        ).toFixed(2)}%`
      : "0%"
  })
}
export const calculateChangeRate = (
  rawData: DataItem[],
  selectedMetric: keyof Omit<DataItem, "category_name" | "date">,
  timeFrameStart?: string,
  timeFrameEnd?: string
) => {
  const groupedData = rawData.reduce((acc, item: DataItem) => {
    if (!acc[item.category_name]) {
      acc[item.category_name] = []
    }
    acc[item.category_name].push(item)
    return acc
  }, {} as Record<string, DataItem[]>)

  const crToReturn: Record<string, string> = {}
  Object.entries(groupedData).forEach(([key, rawCategoryData]) => {
    const cr = calculateChangeRatePerCategory(
      rawCategoryData,
      selectedMetric,
      timeFrameStart,
      timeFrameEnd
    )
    crToReturn[key] = cr
  })
  return crToReturn
}

const calculateChangeRatePerCategory = (
  rawCategoryData: DataItem[],
  selectedMetric: keyof Omit<DataItem, "category_name" | "date">,
  timeFrameStart?: string,
  timeFrameEnd?: string
) => {
  let startDataItem = rawCategoryData.find(
    (item: DataItem) => item.date === timeFrameStart
  )
  let endDataItem = rawCategoryData.find(
    (item: DataItem) => item.date === timeFrameEnd
  )

  // if timeframe didnt specified, sort the array by date and get the first and last item
  if (!timeFrameStart || !timeFrameEnd) {
    rawCategoryData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    startDataItem = rawCategoryData[0]
    endDataItem = rawCategoryData[rawCategoryData.length - 1]
  }

  if (!startDataItem || !endDataItem) return "0%"

  const startValue = startDataItem[selectedMetric]
  const endValue = endDataItem[selectedMetric]
  return `${(((endValue - startValue) / startValue) * 100).toFixed(2)}%`
}

export const getAllTimeFrames = (rawData: DataItem[]) => {
  const uniqueDates = new Set(rawData.map((item) => item.date))
  return Array.from(uniqueDates).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )
}

export const getCvrCategories = (item: DataItem) => {
  return Object.keys(item).filter(
    (key) => key !== "date" && key !== "category_name"
  ) as TableMetric[]
}
