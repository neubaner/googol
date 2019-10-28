import React from 'react'
import { Starship } from '../../api'
import {
  StarshipDetailsWrapper,
  StarshipName,
  StarshipDetailsButton,
} from './styles'

export interface StarshipDetailsProps {
  starship: Starship
  onClick?: () => void
}

const StarshipDetails = ({ starship, onClick }: StarshipDetailsProps) => {
  return (
    <StarshipDetailsWrapper>
      <StarshipDetailsButton onClick={onClick}>
        <StarshipName>{starship.name}</StarshipName>
        <StarshipName small>{starship.model}</StarshipName>
      </StarshipDetailsButton>
    </StarshipDetailsWrapper>
  )
}

export default StarshipDetails
