import { FC, useEffect, useRef, useState } from "react"
import {
  ArrowIcon,
  Checkbox,
  Container,
  DropdownBody,
  DropDownContainer,
  DropdownHeader,
  DropDownItem,
  MetricName,
} from "./styles"

interface DropdownProps {
  options: string[]
  onChange: (value: any) => void
  value: string
  className?: string
  placeholder?: string
  multiSelect?: boolean
}

const Dropdown: FC<DropdownProps> = ({
  options,
  onChange,
  value,
  className,
  placeholder = "Select",
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const handleClick = (option: string) => {
    const value = option
    onChange(value)
    if (!multiSelect) {
      setIsOpen(false)
    }
  }
  return (
    <Container className={className} ref={dropdownRef}>
      <DropDownContainer>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
          {value ? value : placeholder}
          <ArrowIcon $isOpen={isOpen} />
        </DropdownHeader>
        <DropdownBody $isOpen={isOpen}>
          {options.map((option) => {
            const isSelected = value.includes(option)
            return (
              <DropDownItem
                $isSelected={isSelected}
                onClick={() => handleClick(option)}
                key={option}
              >
                {!!multiSelect && (
                  <Checkbox type="checkbox" checked={isSelected} readOnly />
                )}
                <MetricName>{option}</MetricName>
              </DropDownItem>
            )
          })}
        </DropdownBody>
      </DropDownContainer>
    </Container>
  )
}

export default Dropdown
