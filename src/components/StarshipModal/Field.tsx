import React from 'react'
import { FieldWrapper, FieldName, FieldValue } from './styles'

export interface FieldProps {
  name: string
  children: React.ReactNode
}

const Field = ({ name, children }: FieldProps) => (
  <FieldWrapper>
    <FieldName>{name}</FieldName>
    <FieldValue>{children}</FieldValue>
  </FieldWrapper>
)

export default Field
