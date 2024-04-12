import styled from "styled-components"
import DropDown from "../DropDown/DropDown"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"

export const Container = styled.div<{ $gridArea?: string }>`
  width: 100%;
  grid-area: ${({ $gridArea }) => $gridArea};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
export const DataTableHeader = styled.div`
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

export const DropDownStyled = styled(DropDown)`
  height: 40px;
  width: 100px;
  margin-left: 20px;
  margin-top: 4px;
`

export const DropDownCategoriesStyled = styled(DropDown)`
  height: 40px;
  width: 125px;
  margin-left: 20px;
  margin-top: 4px;
`

export const TimeFrames = styled.div`
  display: flex;
  align-items: center;
`

export const CvrDDContainer = styled.div`
  display: flex;
  align-items: center;
`
export const Text = styled.div`
  padding-left: 10px;
  font-weight: 600;
`
export const TableHeadStyled = styled(TableHead)`
  background-color: #ededed;
  th {
    font-weight: 600;
    text-align: center;
  }
`
export const TableRowStyled = styled(TableRow)`
  margin-bottom: 5px;
  td:not(:first-child) {
    text-align: right;
  }

  td:first-child {
    text-align: center;
  }
`
export const TableCellStyled = styled(TableCell)<{
  $width?: number
  $color?: string
}>`
  background: linear-gradient(
    to left,
    ${(props) => `${props.$color} ${props.$width}%`},
    #ffffff ${(props) => props.$width}% 100%
  );
`
