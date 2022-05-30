import { createContext, useContext } from 'react'
import { AddedFieldType } from '../components/ui/home-page/form-builder'

type FieldContextType = {
  openFieldModal: () => void
  closeFieldModal: () => void
  setCurrentFieldState: (curr: AddedFieldType) => void
  currentFieldState: AddedFieldType | null
  reorderAddedFieldIndex: (dragIndex: number, hoverIndex: number) => void
}

export const FieldContext = createContext<FieldContextType | null>(null)

export const useFieldContext = () => useContext(FieldContext)!
