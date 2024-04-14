import { FC, useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import {
  Container,
  CvrDDContainer,
  DataTableHeader,
  DropDownCategoriesStyled,
  DropDownStyled,
  TableHeadStyled,
  TableRowStyled,
  TableCellStyled,
  Text,
  TimeFrames,
} from "./styles"
import {
  processTableData,
  getAllTimeFrames,
  getCvrCategories,
  calculateChangeRate,
  totalMetricToColor,
} from "../../utils/table-utils"
import {
  camelToTitleCase,
  formatNumberWithSuffix,
  snakeToTitleCase,
} from "../../utils/utils"
import { DataItem, TableDataItem, TableMetric } from "../../utils/types"
import { useAppDispatch, useDataState } from "../../redux"
import { setTableData } from "../../redux/slices/dataSlice"

interface TableProps {
  dbData: DataItem[]
  gridArea?: string
}

const DataTable: FC<TableProps> = ({ gridArea, dbData }) => {
  const [timeFrames, setTimeFrames] = useState<string[]>([])
  const [startFrame, setStartFrame] = useState<string>("")
  const [endFrame, setEndFrame] = useState<string>("")
  const [cvrMetric, setCvrMetric] = useState<TableMetric>("product_views")
  const [categories, setCategories] = useState<string[]>([])

  const { tableData, totalsData } = useDataState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!dbData.length) return
    const tableData = processTableData(dbData, cvrMetric, totalsData)
    dispatch(setTableData(tableData))

    const timeFrames = getAllTimeFrames(dbData)
    setTimeFrames(timeFrames)

    const categories = getCvrCategories(dbData[0])
    setCategories(categories)
  }, [dbData])

  useEffect(() => {
    if (!startFrame || !endFrame) return
    if (startFrame > endFrame) {
      return
    }
    const changeRates = calculateChangeRate(
      dbData,
      cvrMetric,
      startFrame,
      endFrame
    )
    const newData = tableData.map((item) => ({
      ...item,
    }))
    Object.entries(changeRates).forEach(([key, value]) => {
      const item = newData.find((item) => item.category_name === key)
      if (item) item.change_rate = value
    })

    dispatch(setTableData(newData))
  }, [startFrame, endFrame, cvrMetric])

  return (
    <Container $gridArea={gridArea}>
      <DataTableHeader>
        <CvrDDContainer>
          <Text>Change Rate by</Text>
          <DropDownCategoriesStyled
            options={categories}
            value={cvrMetric}
            onChange={(metric: TableMetric) => setCvrMetric(metric)}
          />
        </CvrDDContainer>
        <TimeFrames>
          <Text>from</Text>
          <DropDownStyled
            options={timeFrames}
            value={startFrame}
            placeholder="Select date"
            onChange={(timeFrame: string) => setStartFrame(timeFrame)}
          />
          <Text>to</Text>
          <DropDownStyled
            options={timeFrames}
            value={endFrame}
            placeholder="Select date"
            onChange={(timeFrame: string) => setEndFrame(timeFrame)}
          />
        </TimeFrames>
      </DataTableHeader>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHeadStyled>
            <TableRowStyled>
              {!!tableData.length &&
                Object.keys(tableData[0]).map((key) => (
                  <TableCell key={key}>
                    {/_/g.test(key)
                      ? snakeToTitleCase(key)
                      : camelToTitleCase(key)}
                  </TableCell>
                ))}
            </TableRowStyled>
          </TableHeadStyled>
          <TableBody>
            {!!tableData.length &&
              tableData.map((item: TableDataItem) => (
                <TableRowStyled key={item.category_name}>
                  {Object.entries(item).map(([key, val]) => {
                    return typeof val === "number" &&
                      Object.values(totalsData)[0] > 0 ? (
                      <TableCellStyled
                        key={val}
                        $color={totalMetricToColor[key]}
                        $width={Number(
                          ((val / totalsData[key]) * 100).toFixed(0)
                        )}
                      >
                        {formatNumberWithSuffix(val)}
                      </TableCellStyled>
                    ) : (
                      <TableCell key={val}>{val}</TableCell>
                    )
                  })}
                </TableRowStyled>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default DataTable
