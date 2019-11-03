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
      {starships.map((starship, index) => (
        <StarshipDetails
          onClick={() => onClick && onClick(index)}
          key={starship.url}
          starship={starship}
        />
      ))}
    </StarshipListWrapper>
  )
}

export default StarshipList
