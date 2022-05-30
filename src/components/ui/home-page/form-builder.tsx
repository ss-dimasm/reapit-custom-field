import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import { BodyText, FlexContainer, useModal } from '@reapit/elements'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Actions, { ActionsTypeProps } from '../draggable/actions/actions'
import TextField, { TextFieldProps } from '../draggable/text-field/text-field'
import DroppableBox from '../droppable/box/box'
import FieldModalContent from '../field-modal/field-modal'

import { FieldContext } from '../../../context/field-context'

export type AddedFieldType = {
  id: string
  options: {
    name: string
    fieldType: ActionsTypeProps['fieldType'] & TextFieldProps['fieldType']
    type: ActionsTypeProps['id'] & TextFieldProps['id']
    icon: JSX.Element
    category: ActionsTypeProps['category'] & TextFieldProps['category']
  }
}

type FormBuilderProps = {}

export type ForwardRefFormBuilderProps = {
  isChange: boolean
  addedFieldState: AddedFieldType[]
}

const FormBuilder = forwardRef<ForwardRefFormBuilderProps, FormBuilderProps>((_, ref) => {
  const [addedFieldState, setAddedFieldState] = useState<AddedFieldType[]>([])
  const [currentFieldState, setCurrentFieldState] = useState<AddedFieldType | null>(null)

  const { Modal: FieldModal, openModal: openFieldModal, closeModal: closeFieldModal } = useModal('modal-root')

  const onFieldModalSubmit = useCallback((curr: AddedFieldType) => {
    setAddedFieldState((prev) => {
      const modifiedFieldIndex = prev.findIndex((val) => val.id === curr.id)
      if (prev[modifiedFieldIndex]) {
        prev[modifiedFieldIndex] = curr
      }
      return [...prev]
    })
    setCurrentFieldState(null)
    closeFieldModal()
  }, [])

  const reorderAddedFieldIndex = useCallback((dragIndex: number, hoverIndex: number) => {
    setAddedFieldState((prev: AddedFieldType[]) => {
      const tempState = prev[hoverIndex]
      prev[hoverIndex] = prev[dragIndex]
      prev[dragIndex] = tempState
      return [...prev]
    })
  }, [])

  useImperativeHandle(ref, () => ({
    isChange: addedFieldState.length !== 0,
    addedFieldState,
  }))

  console.log(addedFieldState)
  return (
    <div>
      <FieldContext.Provider
        value={{ openFieldModal, setCurrentFieldState, currentFieldState, closeFieldModal, reorderAddedFieldIndex }}
      >
        <DndProvider backend={HTML5Backend}>
          <FlexContainer isFlexJustifyBetween>
            <div style={{ width: '-webkit-fill-available' }}>
              <DroppableBox addedField={addedFieldState} setAddedField={setAddedFieldState} />
            </div>
            <div style={{ minWidth: '250px' }}>
              <div>
                <BodyText>Fields</BodyText>
                {FIELDS.map((field) => (
                  <TextField key={field.id} {...field} />
                ))}
              </div>
              <div className="el-mt8">
                <BodyText>Buttons</BodyText>
                {ACTIONS.map((field) => (
                  <Actions key={field.id} {...field} />
                ))}
              </div>
              <div className="el-mt8">
                <BodyText>Layout</BodyText>
              </div>
            </div>
          </FlexContainer>
          <FieldModal>
            <FieldModalContent {...currentFieldState!} onSubmitForm={onFieldModalSubmit} />
          </FieldModal>
        </DndProvider>
      </FieldContext.Provider>
    </div>
  )
})

export default FormBuilder

const FIELDS: TextFieldProps[] = [
  {
    id: 'short-field',
    name: 'Short field',
    fieldType: 'text',
    category: 'field',
  },
  {
    id: 'long-field',
    name: 'Long Field',
    fieldType: 'text',
    category: 'field',
  },
  {
    id: 'number-field',
    name: 'Number Field',
    fieldType: 'number',
    category: 'field',
  },
  {
    id: 'checkbox-field',
    name: 'Checkbox Field',
    fieldType: 'checkbox',
    category: 'field',
  },
  {
    id: 'date-field',
    name: 'Date Field',
    fieldType: 'date',
    category: 'field',
  },
  {
    id: 'time-field',
    name: 'Time Field',
    fieldType: 'time',
    category: 'field',
  },
]

const ACTIONS: ActionsTypeProps[] = [
  {
    id: 'submit-action',
    name: 'Submit Button',
    fieldType: 'button',
    category: 'action',
  },
]
