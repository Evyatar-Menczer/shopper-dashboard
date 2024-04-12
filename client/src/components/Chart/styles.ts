import styled from "styled-components"
import DropDown from "../DropDown/DropDown"

export const ChartContainer = styled.div<{ $gridArea?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  grid-area: ${({ $gridArea }) => $gridArea};
  background-color: white;
`
export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #ccc;
  width: 100%;
  background-color: white;
  height: 3.4375rem;
  font-size: 0.825rem;
`
export const HeaderText = styled.p`
  padding-left: 10px;
  font-weight: 600;
  max-width: 23.75rem;
`

export const ChartWrapper = styled.div`
  div:first-child {
    border-radius: 8px;
  }
`

export const DropDownStyled = styled(DropDown)`
  height: 40px;
  width: 200px;
`
