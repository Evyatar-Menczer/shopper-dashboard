import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "chart table";
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;

  @media (max-width: 1120px) {
    grid-template-areas:
      "header"
      "chart"
      "table";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 1fr;
  }
`
