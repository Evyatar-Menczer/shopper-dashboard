import React, { FC } from "react"
import {
  Description,
  Header,
  Info,
  SummaryItemContainer,
  Value,
} from "./styles"

interface SummaryItemProps {
  header: string
  value: number | string
  description: string
  icon: JSX.Element
}

const SummaryItem: FC<SummaryItemProps> = ({
  header,
  value,
  description,
  icon,
}) => {
  return (
    <SummaryItemContainer>
      {icon}
      <Info>
        <Header>{header}</Header>
        <Value>{value}</Value>
        <Description>{description}</Description>
      </Info>
    </SummaryItemContainer>
  )
}

export default SummaryItem
