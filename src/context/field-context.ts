import { createContext } from 'react'
import { AddedFieldType } from '../components/pages/home-page'

type FieldContextType = {
  openFieldModal: () => void
  setCurrentFieldState: (curr: AddedFieldType) => void
  currentField: AddedFieldType | null
}

export const FieldContext = createContext<FieldContextType | null>(null)
