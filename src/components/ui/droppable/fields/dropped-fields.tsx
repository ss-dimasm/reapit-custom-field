import React, { useCallback, useContext } from 'react'

import { Button, FlexContainer, Icon, Input, InputGroup, Label } from '@reapit/elements'
import { FieldContext } from '../../../../context/field-context'
import { AddedFieldType } from '../../../pages/home-page'

type DroppedFieldsProps = {} & AddedFieldType

const DroppedFields: React.FC<DroppedFieldsProps> = (props) => {
  const {
    id,
    options: { name, fieldType, icon, category },
  } = props

  const context = useContext(FieldContext)

  const setContextModal = useCallback(() => {
    context?.openFieldModal()
    context?.setCurrentFieldState(props)
  }, [])

  const renderFields = (category: AddedFieldType['options']['category']) => {
    if (category === 'field') {
      // relative width here
      return (
        <>
          <div style={{ position: 'relative', width: '98%' }}>
            <div
              style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#ffffff00', zIndex: 10 }}
            />
            <InputGroup>
              <Input id={id} type={fieldType} />
              {icon}
              <Label htmlFor={id}>{name}</Label>
            </InputGroup>
          </div>
        </>
      )
    }

    // category === action
    return <Button type={fieldType}>{name}</Button>
  }

  // make draggable
  return (
    <FlexContainer style={{ position: 'relative' }}>
      {renderFields(category)}
      <div style={{ position: 'absolute', top: '50%', right: '0' }}>
        <Icon icon="moreSystem" onClick={setContextModal} />
      </div>
    </FlexContainer>
  )
}

export default DroppedFields
