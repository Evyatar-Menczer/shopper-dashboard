import { FC, useEffect, useState } from "react"
import {
  StyledMonetizationOnIcon,
  StyledSellIcon,
  StyledVisibilityIcon,
  StyledEmojiEventsIcon,
  SummaryContainer,
} from "./styles"
import { useAppDispatch, useDataState } from "../../redux"

import SummaryItem from "../SummaryItem/SummaryItem"
import { SummaryData, SummaryItemType, TableDataItem } from "../../utils/types"
import { formatNumberWithSuffix } from "../../utils/utils"
import { setTotalsData } from "../../redux/slices/dataSlice"
interface SummaryProps {
  gridArea: string
}

const Summary: FC<SummaryProps> = ({ gridArea }) => {
  const { tableData } = useDataState()
  const [summmaryItems, setSummaryItems] = useState<SummaryItemType[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!tableData) return
    const proccesedData = getSummaryData(tableData)
    dispatch(setTotalsData(proccesedData))

    const sumamryItems = prepareSummaryItems(proccesedData)
    setSummaryItems(sumamryItems)
  }, [tableData])

  const prepareSummaryItems = (data: SummaryData) => {
    const {
      totalUnitsSold,
      totalProductViews,
      totalRevenue,
      topSellingProduct,
    } = data
    const summaryItems: SummaryItemType[] = [
      {
        header: "Units Sold",
        value: formatNumberWithSuffix(totalUnitsSold),
        description: "Total",
        icon: <StyledSellIcon />,
      },
      {
        header: "Product Views",
        value: formatNumberWithSuffix(totalProductViews),
        description: "Total",
        icon: <StyledVisibilityIcon />,
      },
      {
        header: "Revenue",
        value: formatNumberWithSuffix(totalRevenue),
        description: "Total",
        icon: <StyledMonetizationOnIcon />,
      },
      {
        header: "Top Selling Product",
        value: formatNumberWithSuffix(topSellingProduct.totalUnitsSold),
        description: topSellingProduct.category_name,
        icon: <StyledEmojiEventsIcon />,
      },
    ]
    return summaryItems
  }

  const getSummaryData = (data: TableDataItem[]): SummaryData => {
    const totalUnitsSold = data.reduce(
      (acc, item) => acc + item.totalUnitsSold,
      0
    )
    const totalProductViews = data.reduce(
      (acc, item) => acc + item.totalProductViews,
      0
    )
    const totalRevenue = data.reduce((acc, item) => acc + item.totalRevenue, 0)
    const topSellingProduct = data.reduce(
      (acc, item) => {
        if (item.totalUnitsSold > acc.totalUnitsSold) {
          return item
        }
        return acc
      },
      { totalUnitsSold: 0 } as TableDataItem
    )

    return {
      totalUnitsSold,
      totalProductViews,
      totalRevenue,
      topSellingProduct,
    }
  }

  return (
    <SummaryContainer $gridArea={gridArea}>
      {summmaryItems.map((item, index) => (
        <SummaryItem
          key={index}
          icon={item.icon}
          header={item.header}
          description={item.description}
          value={item.value}
        />
      ))}
    </SummaryContainer>
  )
}

export default Summary
