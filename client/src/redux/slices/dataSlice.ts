import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TableDataItem } from "../../utils/types"

export type DataState = {
  metrics: string[]
  tableData: TableDataItem[]
  totalsData: Record<string, any>
}

const initialState: DataState = {
  metrics: [],
  tableData: [],
  totalsData: {},
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload
    },
    setTableData: (state, action: PayloadAction<TableDataItem[]>) => {
      state.tableData = action.payload
    },
    setTotalsData: (state, action: PayloadAction<Record<string, any>>) => {
      state.totalsData = action.payload
    },
  },
})

export const { setMetrics, setTableData, setTotalsData } = dataSlice.actions

export const dataReducer = dataSlice.reducer
