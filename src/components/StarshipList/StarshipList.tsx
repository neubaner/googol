import React from 'react'
import { Starship } from '../../api'
import { StarshipListWrapper } from './styles'
import StarshipDetails from '../StarshipDetails/StarshipDetails'

export interface StarshipListProps {
  starships: Starship[]
}

const StarshipList = ({ starships }: StarshipListProps) => {
  return (
    <StarshipListWrapper>
      {starships.map(x => (
        <StarshipDetails key={x.url} starship={x} />
      ))}
    </StarshipListWrapper>
  )
}

export default StarshipList
