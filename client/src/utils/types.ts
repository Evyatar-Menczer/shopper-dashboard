export type DataItem = {
  date: string
  units_sold: number
  product_views: number
  revenue: number
  category_name: string
}

export type TableDataItem = {
  category_name: string
  totalUnitsSold: number
  totalProductViews: number
  totalRevenue: number
  cvr: string
  change_rate?: string
}

export type SummaryItemType = {
  header: string
  value: number | string
  description: string
  icon: JSX.Element
}

export type SummaryData = {
  totalUnitsSold: number
  totalProductViews: number
  totalRevenue: number
  topSellingProduct: TableDataItem
}

export type TableMetric = "product_views" | "units_sold" | "revenue"

export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
