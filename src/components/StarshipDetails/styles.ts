import styled from 'styled-components'

export const StarshipDetailsWrapper = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`

export const StarshipDetailsButton = styled.button`
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  width: 100%;
  padding: 0.6rem;
  text-align: left;
  cursor: pointer;
`

export interface StarshipNameProps {
  small?: boolean
}

export const StarshipName = styled.div<StarshipNameProps>`
  font-size: ${props => (props.small ? '0.8rem' : '1rem')};
  color: ${props => (props.small ? '#ccc' : 'white')};
`
