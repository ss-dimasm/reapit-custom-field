import React, { FC, useCallback, useState } from 'react'
import { Title, PageContainer, FlexContainer, BodyText, useModal } from '@reapit/elements'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DroppableBox from '../ui/droppable/box/box'
import TextField, { TextFieldProps } from '../ui/draggable/text-field/text-field'
import { ActionsTypeProps } from '../ui/draggable'
import Actions from '../ui/draggable/actions/actions'
import { FieldContext } from '../../context/field-context'
import FieldModalContent from '../ui/field-modal/field-modal'

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

export const HomePage: FC = () => {
  const [addedField, setAddedField] = useState<AddedFieldType[]>([]) //TODO: convert to multi dimension array

  // selected field that appear inside edit mode (modal)
  const [currentField, setCurrentField] = useState<AddedFieldType | null>(null)

  // modal
  const { Modal: FieldModal, openModal: openFieldModal } = useModal('modal-root')

  // TODO:
  // make setter fn for current field
  // then edit the current field in addedField
  const onFieldModalSubmit = useCallback(
    (curr: AddedFieldType) => {
      const filter = addedField.findIndex((v) => v.id === curr.id)
      setCurrentField((prev) => {
        prev[filter] = curr
        return prev
      })
      // setAddedField((prev) => [...prev, ...filter])
      // console.log(filter)
      // console.log('here', id)
    },
    [addedField],
  )

  return (
    <PageContainer>
      <FieldContext.Provider value={{ openFieldModal, setCurrentFieldState: setCurrentField, currentField }}>
        <Title>Form Builder</Title>
        <DndProvider backend={HTML5Backend}>
          <FlexContainer isFlexJustifyBetween>
            <div style={{ width: '-webkit-fill-available' }}>
              <DroppableBox addedField={addedField} setAddedField={setAddedField} />
            </div>
            <div style={{ minWidth: '400px' }}>
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
            <FieldModalContent {...currentField!} onSubmitForm={onFieldModalSubmit} />
          </FieldModal>
        </DndProvider>
      </FieldContext.Provider>
    </PageContainer>
  )
}

export default HomePage

// TODO: Long term, move to specific
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
