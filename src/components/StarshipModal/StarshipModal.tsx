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
      <Field name="Name">{name}</Field>
      <Field name="Model">{model}</Field>
      <Field name="Starship Class">{starship_class}</Field>
      <Field name="Max Atmosphering speed">{max_atmosphering_speed}</Field>
      <Field name="Length">{length} m</Field>
      <Field name="Cost in credits">{cost_in_credits}</Field>
      <Field name="Cargo Capacity">{cargo_capacity}</Field>
      <Field name="Consumables">{consumables}</Field>
      <Field name="MGLT">{MGLT}</Field>
      <Field name="Hyperdrive Rating">{hyperdrive_rating}</Field>
      <Field name="Manufacture">{manufacturer}</Field>
      <Field name="Crew">{crew}</Field>
    </Modal>
  )
}

export default StarshipModal
