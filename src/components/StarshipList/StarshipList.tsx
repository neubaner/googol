import React from 'react'
import { Starship } from '../../api'
import { StarshipListWrapper } from './styles'
import StarshipDetails from '../StarshipDetails/StarshipDetails'

export interface StarshipListProps {
  starships: Starship[]
  onClick?: (index: number) => void
}

const StarshipList = ({ starships, onClick }: StarshipListProps) => {
  return (
    <StarshipListWrapper>
      {starships.map((x, index) => (
        <StarshipDetails
          onClick={() => onClick && onClick(index)}
          key={x.url}
          starship={x}
        />
      ))}
    </StarshipListWrapper>
  )
}

export default StarshipList
