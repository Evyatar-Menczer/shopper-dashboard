import styled, { css } from "styled-components"
export const Container = styled.div`
  position: relative;
  z-index: 100;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`

export const DropDownContainer = styled.div`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #0b3d91;
  background-color: white;
  position: absolute;
  z-index: 100;
  top: 5px;
  right: 10px;
  padding-right: 3px;
`

export const DropdownHeader = styled.div<{ $isOpen: boolean }>`
  width: 95%;
  border-radius: 6px;
  background-color: white;
  position: relative;
  display: flex;
  min-height: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  font-size: 0.8rem;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`

export const DropdownBody = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  background-color: white;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          border-top: 1px solid #0b3d91;
          max-height: 10.5rem;
          height: fit-content;
          overflow: auto;
          border-radius: 0px 0px 6px 6px;
        `
      : css`
          max-height: 0 !important;
        `}
`

export const ArrowIcon = styled.i<{ $isOpen: boolean }>`
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  border-right: 3px solid #0b3d91;
  border-bottom: 3px solid #0b3d91;
  width: 6px;
  height: 6px;
  transform: rotate(-45deg);
  margin-right: 4px;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(45deg);
    `}
`

export const DropDownItem = styled.div<{ $isSelected: boolean }>`
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`

export const MetricName = styled.span`
  margin-left: 0.5rem;
`
export const Checkbox = styled.input`
  margin-top: 3px;
  position: relative !important;
  appearance: none;
  max-width: 15px;
  width: 100%;
  height: 15px;
  border: 1px solid #ccc;
  transition: border-color 0.2s ease;
  border-radius: 4px;

  &:checked:after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: -27%;
    left: 4%;
    width: 6px;
    height: 11px;
    border-width: 0 3px 3px 0;
    border-style: solid;
    transform-origin: bottom left;
    transform: rotate(45deg);
    border-bottom-color: black;
    border-right-color: black;
  }
`
