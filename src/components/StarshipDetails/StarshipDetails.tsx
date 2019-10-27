import React from 'react'
import { Starship } from '../../api'
import { StarshipDetailsWrapper } from './styles'

export interface StarshipDetailsProps {
  starship: Starship
}

const StarshipDetails = ({ starship }: StarshipDetailsProps) => {
  return <StarshipDetailsWrapper>{starship.name}</StarshipDetailsWrapper>
}

export default StarshipDetails
