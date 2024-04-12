import { FC, useEffect, useRef, useState } from "react"
import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import {
  ChartContainer,
  ChartHeader,
  ChartWrapper,
  DropDownStyled,
  HeaderText,
} from "./styles"
import { metricOptions, titleToSnakeCase } from "../../utils/utils"
import { aggregateDataByMetric } from "../../utils/chart-utils"
import { DataItem } from "../../utils/types"
import { getDataByCategory } from "../../api/sql"

const defaultOptions: Highcharts.Options = {
  title: { text: "" },
  xAxis: {
    type: "datetime",
    title: { text: "Date" },
  },
  yAxis: {
    title: { text: "Total" },
  },
  series: [],
}

interface ChartProps extends HighchartsReact.Props {
  gridArea?: string
}

const Chart: FC<ChartProps> = (props) => {
  const { gridArea } = props
  const [metrics, setMetric] = useState<string[]>([metricOptions[0]])
  const [chartOptions, setChartOptions] =
    useState<Highcharts.Options>(defaultOptions)
  const [dbData, setDbData] = useState<DataItem[]>([])
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  useEffect(() => {
    const fetchData = async () => {
      const metricNames = metrics.map((metric) => titleToSnakeCase(metric))
      const { data } = await getDataByCategory(metricNames)
      setDbData(data)
    }
    fetchData()
  }, [metrics])

  useEffect(() => {
    const { metricAdded, metricRemoved } = checkAddOrRemove()
    if (dbData.length && metricAdded) {
      const newSeriesAdd = getSereiesData(metricAdded)
      setChartOptions({ ...chartOptions, series: newSeriesAdd })
    } else if (metricRemoved) {
      const newSeriesRemove =
        chartOptions.series?.filter((s) => s.name !== metricRemoved.name) || []
      setChartOptions({
        ...chartOptions,
        series: newSeriesRemove,
      })
    }
  }, [dbData])

  const headerText = metrics.length
    ? `Trends of ${metrics[0]} ${
        metrics.length > 1 ? `and ${metrics[1]}` : ""
      } overtime`
    : "No metrics selected"

  const checkAddOrRemove = () => {
    const metricAdded = metrics.find(
      (metric) => !chartOptions.series?.some((item) => item.name === metric)
    )
    const metricRemoved = chartOptions.series?.find(
      (item) => !metrics.includes(item.name as string)
    )
    return { metricAdded, metricRemoved }
  }

  const getSereiesData = (metricAdded: string) => {
    const processedData = aggregateDataByMetric(dbData, metricAdded)
    if (!processedData) return
    const { name, data } = processedData
    const newSeries = chartOptions.series ? [...chartOptions.series] : []
    newSeries.length > 1 && newSeries.shift()
    newSeries.push({ type: "line", data, name })
    return newSeries
  }

  const handleMetricClick = (newMetric: string) => {
    const index = metrics.indexOf(newMetric)
    if (index > -1) {
      metrics.splice(index, 1)
    } else {
      if (metrics.length === 2) {
        metrics.shift()
      }
      metrics.push(newMetric)
    }
    setMetric([...metrics])
  }

  return (
    <ChartContainer $gridArea={gridArea}>
      <ChartHeader>
        <HeaderText>{headerText}</HeaderText>
        <DropDownStyled
          options={metricOptions}
          value={metrics.join(", ")}
          placeholder="Select metric"
          onChange={(newMetric) => handleMetricClick(newMetric)}
          multiSelect={true}
        />
      </ChartHeader>
      <ChartWrapper>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartComponentRef}
          {...props}
        />
      </ChartWrapper>
    </ChartContainer>
  )
}

export default Chart
