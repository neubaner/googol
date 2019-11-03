import React from 'react'
import Modal from 'react-modal'
import { Starship } from '../../api'
import Field from './Field'
import { CloseButton } from './styles'

export interface StarshipModalProps {
  starship: Starship
  isOpen: boolean
  onModalClose?: () => void
}

const StarshipModal = ({
  starship,
  isOpen,
  onModalClose,
}: StarshipModalProps) => {
  const {
    name,
    model,
    cargo_capacity,
    length,
    consumables,
    cost_in_credits,
    MGLT,
    hyperdrive_rating,
    manufacturer,
    crew,
    max_atmosphering_speed,
    starship_class,
  } = starship

  const fields = [
    { label: 'Name', value: name },
    { label: 'Model', value: model },
    { label: 'Starship Class', value: starship_class },
    { label: 'Max Atmosphering speed', value: max_atmosphering_speed },
    { label: 'Length', value: length },
    { label: 'Cost in credits', value: cost_in_credits },
    { label: 'Cargo Capacity', value: cargo_capacity },
    { label: 'Consumables', value: consumables },
    { label: 'MGLT', value: MGLT },
    { label: 'Hyperdrive Rating', value: hyperdrive_rating },
    { label: 'Manufacture', value: manufacturer },
    { label: 'Crew', value: crew },
  ]

  return (
    <Modal
      style={{
        content: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'black',
          left: '50%',
          transform: 'translate(-50%)',
        },
        overlay: {
          display: 'flex',
        },
      }}
      onRequestClose={onModalClose}
      isOpen={isOpen}
    >
      <CloseButton onClick={onModalClose}>X</CloseButton>
      {fields.map(({ label, value }) => (
        <Field key={label} name={label}>
          {value}
        </Field>
      ))}
    </Modal>
  )
}

export default StarshipModal
