import styled, { css } from "styled-components"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import SellIcon from "@mui/icons-material/Sell"
import VisibilityIcon from "@mui/icons-material/Visibility"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
export const SummaryContainer = styled.div<{ $gridArea?: string }>`
  grid-area: ${({ $gridArea }) => $gridArea};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 15px 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 830px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-row-gap: 1.2rem;
    height: auto;
  }
`

export const CommonStyle = css`
  color: white;
  padding: 10px;
  border-radius: 50%;
`
export const StyledSellIcon = styled(SellIcon)`
  ${CommonStyle}
  background-color: #767aff;
`
export const StyledVisibilityIcon = styled(VisibilityIcon)`
  ${CommonStyle}
  background-color: #f8a42c;
`
export const StyledMonetizationOnIcon = styled(MonetizationOnIcon)`
  ${CommonStyle}
  background-color: #f265a3;
`
export const StyledEmojiEventsIcon = styled(EmojiEventsIcon)`
  ${CommonStyle}
  background-color: #27cc8d;
`
