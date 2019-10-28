import styled from 'styled-components'

export const FieldWrapper = styled.div`
  color: white;

  & + & {
    margin-top: 1rem;
  }
`

export const FieldName = styled.div`
  color: #aaa;
  font-size: 0.8rem;
`
export const FieldValue = styled.div`
  font-size: 1.1rem;
`

export const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.6rem;
  color: white;
  cursor: pointer;
`
